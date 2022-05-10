import {
  createRestyleComponent,
  spacing,
  SpacingProps,
  backgroundColor,
  LayoutProps,
  BackgroundColorProps,
  BorderProps,
  border,
  layout,
} from "@shopify/restyle";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Theme from "../../theme/theme";

type Props = SpacingProps<typeof Theme> &
  LayoutProps<typeof Theme> &
  BorderProps<typeof Theme> &
  BackgroundColorProps<typeof Theme>;

const RestyledScrollView = createRestyleComponent<
  Props & React.ComponentProps<typeof ScrollView>,
  typeof Theme
>([spacing, backgroundColor, border, layout], ScrollView);

export default RestyledScrollView;
