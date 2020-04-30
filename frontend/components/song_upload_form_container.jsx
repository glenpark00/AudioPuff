import { connect } from 'react-redux';
import { createSong } from '../actions/songs_actions';
import SongUploadForm from './song_upload_form';

const mapStateToProps = state => ({
  currentUserId: state.session.currentUserId
})

const mapDispatchToProps = dispatch => ({
  createSong: (song, currentUserId) => dispatch(createSong(song, currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongUploadForm);