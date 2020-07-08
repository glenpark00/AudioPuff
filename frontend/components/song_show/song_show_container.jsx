import { connect } from 'react-redux';
import { fetchSongFromUrl } from '../../actions/songs_actions';
import { enableModalDisplay } from '../../actions/ui_actions';
import SongShow from './song_show';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  audio: state.audio.currentSong ? state.audio : { currentSong: {}, songIds: state.audio.songIds, playing: false },
  currentUserUrl: state.session.currentUser.profileUrl,
  song: state.entities.songs[`${ownProps.match.params.profileUrl}${ownProps.match.params.songUrl.split('').filter(c => c !== '_').join('')}`],
  user: state.entities.users[ownProps.match.params.profileUrl]
})

const mapDispatchToProps = dispatch => ({
  fetchSongFromUrl: (songUrl, profileUrl) => dispatch(fetchSongFromUrl(songUrl, profileUrl)),
  enableModalDisplay: data => dispatch(enableModalDisplay(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongShow));