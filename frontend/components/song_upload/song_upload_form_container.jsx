import { connect } from 'react-redux';
import { createSong } from '../../actions/songs_actions';
import SongUploadForm from './song_upload_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId]
})

const mapDispatchToProps = dispatch => ({
  createSong: (song, currentUserId) => dispatch(createSong(song, currentUserId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongUploadForm));