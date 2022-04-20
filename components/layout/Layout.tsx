import { View, Text } from 'react-native';
import React from 'react';
import RestyledSafeAreaView from '../atoms/RestyledSafeAreaView';

interface Props {
	children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (RestyledSafeAreaView
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			{children}
		</RestyledSafeAreaView>
	);
}
