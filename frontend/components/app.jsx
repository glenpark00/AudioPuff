import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import UserFormModalContainer from './form_modal/user_form_modal_container';
import { Route } from 'react-router-dom';
import GlobalAudioPlayerContainer from './global_audio_player_container';

// Placeholder
import Discover from './discover';
import SongUpload from './song_upload/song_upload';
import CurrentUserSongsIndexContainer from '../components/current_user_songs_index_container'

const App = () => (
	<div id='app'>
		<NavBarContainer />
		<UserFormModalContainer />
		<Route exact path='/discover' component={Discover} />
		<Route exact path='/upload' component={SongUpload} />
		<Route exact path='/:profile_url' component={CurrentUserSongsIndexContainer} />
		<GlobalAudioPlayerContainer />
	</div>
);

export default App;