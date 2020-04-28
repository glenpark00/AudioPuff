import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import UserFormModalContainer from './form_modal/user_form_modal_container';
import { Route } from 'react-router-dom';

// Placeholder
import Discover from './discover';
import Upload from './upload';

const App = () => (
	<div>
		<NavBarContainer />
		<UserFormModalContainer />
		<Route exact path='/discover' component={ Discover }/>
		<Route exact path='/upload' component={ Upload }/>
	</div>
);

export default App;