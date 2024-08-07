import React, { useState } from 'react';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import PageHeaderDropdown from '../components/molecules/PageHeaderDropdown';
import CreateCourse from '../components/organisms/create/CreateCourse';
import CreateVideo from '../components/organisms/create/CreateVideo';
import { useAppSelector } from '../hooks/reduxHooks';

const MENUS = ['Create Course', 'Create Video', 'Create Question'];

export default function Create() {
	const [currentMenu, setCurrentMenu] = useState(MENUS[1]);
	const status = useAppSelector((state) => state.post.status);

	console.log(status);

	// let screen = <CreateVideo />;

	// if (currentMenu === MENUS[0]) {
	// 	screen = <CreateCourse />;
	// } else if (currentMenu === MENUS[2]) {
	// 	screen = <CreateCourse />;
	// }

	return <CreateVideo />;
}
