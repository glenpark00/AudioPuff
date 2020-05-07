import React from 'react';
import SongItemContainer from '../song_item/song_item_container';
import { withRouter } from 'react-router-dom';

class SongShowDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { song, user, deleteSong, closeModal } = this.props;
    deleteSong(song.id);
    closeModal();
    this.props.history.push(`/${user.profileUrl}`);
  }

  render() {
    const { song, user, closeModal } = this.props;
    return (
      <div className='delete-song-modal'>
        <SongItemContainer song={ song } user={ user }/>
        <div className='delete-song-separator'></div>
        <div className='delete-song-subheader'>Permanently delete this track?</div>
        <div>
          <div>Removing this track is irreversible. You will lose all the plays, likes and comments for this track with no way to get them back.</div>
          <div>
            <div onClick={closeModal}>Cancel</div>
            <div onClick={this.handleDelete}>Delete forever</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SongShowDeleteModal);