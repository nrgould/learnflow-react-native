import { View, Text } from 'react-native';
import React from 'react';
import RestyledSafeAreaView from '../atoms/RestyledSafeAreaView';

interface Props {
	children?: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
	return (
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			{children}
		</RestyledSafeAreaView>
	);
}
