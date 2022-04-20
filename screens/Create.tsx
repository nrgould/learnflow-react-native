import React, { useState } from 'react';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import PageHeaderDropdown from '../components/molecules/PageHeaderDropdown';
import CreateCourse from '../components/organisms/create/createCourse';
import CreateVideo from '../components/organisms/create/createVideo';

const MENUS = ['Create Course', 'Create Video', 'Create Question'];

export default function Create() {
	const [currentMenu, setCurrentMenu] = useState(MENUS[1]);

	let screen = <CreateVideo />;

	if (currentMenu === MENUS[0]) {
		screen = <CreateCourse />;
	} else if (currentMenu === MENUS[2]) {
		screen = <CreateCourse />;
	}

	return (
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			<PageHeaderDropdown
				menus={MENUS}
				setMenu={setCurrentMenu}
				currentMenu={currentMenu}
			/>
			{screen}
		</RestyledSafeAreaView>
	);
}
