import Box from "../../atoms/Box";
import Text from "../../atoms/Text";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";

import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */
export default function CreateVideo() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState<any>(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState<any>(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState<any>(false);

  const [galleryItems, setGalleryItems] = useState<any>([]);

  const [cameraRef, setCameraRef] = useState<any>(null);
  const [cameraType, setCameraType] = useState<any>(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState<any>(Camera.Constants.FlashMode.off);

  const [isCameraReady, setIsCameraReady] = useState<any>(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 180,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          navigation.navigate("SavePost", {
            source,
            sourceThumb,
          });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.cancelled) {
      let sourceThumb = await generateThumbnail(result.uri);
      navigation.navigate("SavePost", {
        screen: "SavePost",
        source: result.uri,
        sourceThumb,
      });
    }
  };

  const generateThumbnail = async (source: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
      return null;
    }
  };

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <Box backgroundColor='background'></Box>;
  }

  return (
    <Box flex={1} backgroundColor='background'>
      {isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={{
            flex: 1,
            backgroundColor: "black",
            aspectRatio: 9 / 16,
          }}
          ratio={"16:9"}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}

      <Box top={60} right={0} marginHorizontal='l' position='absolute'>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginBottom: 25,
          }}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <Feather name='refresh-ccw' size={24} color={"white"} />
          <Text
            style={{
              color: "white",
              fontSize: 12,
              marginTop: 5,
            }}
          >
            Flip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            marginBottom: 25,
          }}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <Feather name='zap' size={24} color={"white"} />
          <Text
            style={{
              color: "white",
              fontSize: 12,
              marginTop: 5,
            }}
          >
            Flash
          </Text>
        </TouchableOpacity>
      </Box>

      <Box alignItems='center' position='absolute' bottom={0} flexDirection='row' marginBottom='l'>
        <Box flex={1} />
        <Box flex={1} marginHorizontal='l'>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
            style={{
              borderWidth: 8,
              borderColor: "#ff404087",
              backgroundColor: "#ff4040",
              borderRadius: 100,
              height: 80,
              width: 80,
              alignSelf: "center",
            }}
          />
        </Box>
        <Box style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => pickFromGallery()}
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 10,
              overflow: "hidden",
              width: 50,
              height: 50,
            }}
          >
            {galleryItems[0] == undefined ? (
              <></>
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={{ uri: galleryItems[0].uri }}
              />
            )}
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
