import { connect } from 'react-redux';
import { fetchSongFromUrl } from '../../actions/songs_actions';
import { enableModalDisplay } from '../../actions/ui_actions';
import SongShow from './song_show';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const song = state.entities.songs[`${ownProps.profileUrl}${ownProps.match.params.songUrl.split('').filter(c => c !== '_').join('')}`];

  return {
    audio: state.audio.currentSong ? state.audio : { currentSong: {}, songIds: state.audio.songIds, playing: false },
    currentUserUrl: state.session.currentUser ? state.session.currentUser.profileUrl : '',
    song,
    user: state.entities.users[ownProps.profileUrl],
    likers: song ? song.likers.map(liker => state.entities.users[liker]) : []
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSongFromUrl: (songUrl, profileUrl) => dispatch(fetchSongFromUrl(songUrl, profileUrl)),
  enableModalDisplay: data => dispatch(enableModalDisplay(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongShow));