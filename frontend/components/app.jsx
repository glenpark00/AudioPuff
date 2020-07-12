import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import Modal from './modal/modal';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import GlobalAudioPlayerContainer from './global_audio_player/global_audio_player_container';
import DiscoverContainer from './discover/discover_container';
import Stream from './stream';
import CurrentLibrary from './library/current_library';
import SongUpload from './song_upload/song_upload';
import UserUrlShow from './user_url_show';
import SearchResults from './search/search_results';

const App = () => (
	<div id='app'>
		<Modal />
		<NavBarContainer />
		<div id='app-body'>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/discover' />
				</Route>
				<Route exact path='/discover' component={DiscoverContainer} />
				<Route exact path='/stream' component={Stream} />
				<Route path='/you' component={CurrentLibrary} />
				<ProtectedRoute exact path='/upload' component={SongUpload} />
				<Route path='/search/:fragment' component={SearchResults} />
				<Route path='/:profileUrl' component={UserUrlShow} />
			</Switch>
		</div>
		<GlobalAudioPlayerContainer />
	</div>
);

export default App;