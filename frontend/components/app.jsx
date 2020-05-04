import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import UserFormModalContainer from './form_modal/user_form_modal_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import GlobalAudioPlayerContainer from './global_audio_player/global_audio_player_container';

// Placeholder
import Discover from './discover';
import SongUpload from './song_upload/song_upload';
import CurrentUserSongsIndexContainer from './current_user_songs_index/current_user_songs_index_container';
import SongShowContainer from './song_show/song_show_container';
import LogoutPage from './logout_page';

const App = () => (
	<div id='app'>
		<NavBarContainer />
		<div id='app-body'>
			<Switch>
				<AuthRoute exact path='/logout' component={LogoutPage} />
				<Route exact path='/discover' component={Discover} />
				<ProtectedRoute exact path='/upload' component={SongUpload} />
				<Route path='/:profile_url/:song_url' component={SongShowContainer} />
				<Route path='/:profile_url' component={CurrentUserSongsIndexContainer} />
			</Switch>
		</div>
		<UserFormModalContainer />
		<GlobalAudioPlayerContainer />
	</div>
);

export default App;