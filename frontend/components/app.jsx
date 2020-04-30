import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import UserFormModalContainer from './form_modal/user_form_modal_container';
import { Route } from 'react-router-dom';

// Placeholder
import Discover from './discover';
import SongUploadFormContainer from './song_upload_form_container';

const App = () => (
	<div>
		<NavBarContainer />
		<UserFormModalContainer />
		<Route exact path='/discover' component={ Discover }/>
		<Route exact path='/upload' component={ SongUploadFormContainer }/>
	</div>
);

export default App;