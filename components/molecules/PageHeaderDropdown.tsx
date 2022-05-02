import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Box from '../atoms/Box';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const { height, width } = Dimensions.get('window');

interface Props {
	menus: string[];
	setMenu: React.Dispatch<React.SetStateAction<string>>;
	currentMenu: string;
}

export default function PageHeaderDropdown({
	menus,
	setMenu,
	currentMenu,
}: Props) {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenu = useCallback((menu) => {
		setMenu(menu);
		setMenuOpen(false);
	}, []);

	return (
		<>
			{menuOpen && (
				<Box
					backgroundColor='primaryCardBackground'
					borderRadius='m'
					position='absolute'
					top={100}
					left={20}>
					{menus.map((menu, index) => {
						return (
							<TouchableOpacity
								key={index}
								onPress={() => handleMenu(menu)}>
								<Box
									borderBottomColor='border'
									flexDirection='row'
									alignItems='center'
									justifyContent='space-between'
									zIndex={100}
									borderBottomWidth={
										index === menus.length - 1 ? 0 : 1
									}>
									<Text
										marginVertical='m'
										marginHorizontal='s'
										marginRight='l'
										fontFamily='sora-medium'>
										{menu}
									</Text>
									<Icon
										name={
											menu === 'Create Course'
												? 'school'
												: menu === 'Create Video'
												? 'videocam'
												: 'checkbox'
										}
										color='activeIcon'
										size={22}
										style={{ marginRight: 12 }}
									/>
								</Box>
							</TouchableOpacity>
						);
					})}
				</Box>
			)}
			<Box
				width='100%'
				position='absolute'
				top={0}
				flexDirection='row'
				backgroundColor='background'
				alignItems='center'
				justifyContent='flex-start'>
				<TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
					<Box
						flexDirection='row'
						alignItems='center'
						marginHorizontal='l'>
						<Text variant='header' fontSize={28}>
							{currentMenu}
						</Text>
						<Icon
							name={
								menuOpen
									? 'chevron-up-outline'
									: 'chevron-down-outline'
							}
							color='activeIcon'
							size={28}
							style={{ marginRight: 12 }}
						/>
					</Box>
				</TouchableOpacity>
			</Box>
			{menuOpen && (
				<TouchableOpacity onPress={() => setMenuOpen(false)}>
					<Box zIndex={50} height={height} width={width} />
				</TouchableOpacity>
			)}
		</>
	);
}
