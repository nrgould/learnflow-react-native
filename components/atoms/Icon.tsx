import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props extends React.ComponentProps<typeof Ionicons> {}

export default function Icon({ ...props }: Props) {
	return <Ionicons {...props} />;
}
