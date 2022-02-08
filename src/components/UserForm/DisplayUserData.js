import React, { useContext } from 'react';
import { AppContext } from './context';

const DisplayUserData = () => {
	const { validateUser } = useContext(AppContext);
   

	return (
		<div>
			<h3>Submitted Users Data</h3>
			 {JSON.stringify(validateUser)}
		</div>
	);
};

export default DisplayUserData;