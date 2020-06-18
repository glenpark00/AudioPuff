import { connect } from 'react-redux';
import { createSong, receiveSongErrors } from '../../actions/songs_actions';
import SongUploadForm from './song_upload_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserUrl],
  errors: state.errors.songs
})

const mapDispatchToProps = dispatch => ({
  createSong: (song, currentUserUrl) => dispatch(createSong(song, currentUserUrl)),
  clearErrors: () => dispatch(receiveSongErrors([]))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongUploadForm));