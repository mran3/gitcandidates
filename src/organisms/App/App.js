import React, { useState, useEffect } from 'react';
import { Block, Row, Col } from 'jsxstyle';
import UserDetails from '../../atoms/UserDetails/UserDetails'
import UserForm from '../../molecules/UserForm/UserForm';
import S4NHeader from '../../molecules/S4NHeader/S4NHeader';
import GitLookup from '../../molecules/GitLookup/GitLookup';

/**
* Main component
*/
function App(props) {

	const [wasUserAdded, setWasUserAdded] = useState(false);
	const mqs = {
		sm: 'screen and (max-width: 640px)',
		lg: 'screen and (min-width: 1280px)',
	}

	function showMessage() {
		setWasUserAdded(true);
	}


	return (
		<Block>
			<S4NHeader />

			<Row
				mediaQueries={mqs}
			>
				<Block
					padding="3rem">
					<Row>
						<UserForm showMessage={showMessage} />
					</Row>
					<Row>
						{wasUserAdded && <UserDetails />}
					</Row>
				</Block>

				<Block
					margin="3rem">
					<GitLookup />
				</Block>
			</Row>

		</Block>
	);
}

export default App;
