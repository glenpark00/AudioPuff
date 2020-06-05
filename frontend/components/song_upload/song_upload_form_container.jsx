import { connect } from 'react-redux';
import { createSong } from '../../actions/songs_actions';
import SongUploadForm from './song_upload_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserUrl]
})

const mapDispatchToProps = dispatch => ({
  createSong: (song, currentUserUrl) => dispatch(createSong(song, currentUserUrl))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongUploadForm));