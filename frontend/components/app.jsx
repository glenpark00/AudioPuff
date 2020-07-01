import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import UserFormModalContainer from './form_modal/user_form_modal_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import GlobalAudioPlayerContainer from './global_audio_player/global_audio_player_container';
import DiscoverContainer from './discover/discover_container';
import SongUpload from './song_upload/song_upload';
import UserProfilePageContainer from './user_profile_page/user_profile_page_container'
import SongShowContainer from './song_show/song_show_container';
import SearchResultsContainer from './search/search_results_container';

// Placeholder
import LogoutPage from './logout_page';

const App = () => (
	<div id='app'>
		<UserFormModalContainer />
		<NavBarContainer />
		<div id='app-body'>
			<Switch>
				<AuthRoute exact path='/logout' component={LogoutPage} />
				<Route exact path='/' component={DiscoverContainer} />
				<ProtectedRoute exact path='/upload' component={SongUpload} />
				<Route path='/search/:fragment' component={SearchResultsContainer} />
				<Route path='/:profileUrl/:songUrl' component={SongShowContainer} />
				<Route path='/:profileUrl' component={UserProfilePageContainer} />
			</Switch>
		</div>
		<GlobalAudioPlayerContainer />
	</div>
);

export default App;