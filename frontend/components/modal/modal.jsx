import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserFormModalContainer from './user_form_modal_container';
import SongShowEditModal from './song_show_edit_modal';
import SongShowDeleteModal from './song_show_delete_modal';
import UserEditFormModal from './user_edit_form_modal';
import { receiveSongErrors } from '../../actions/songs_actions';
import { clearSessionErrors } from '../../actions/session_actions';
import { disableModalDisplay } from '../../actions/ui_actions';

const Modal = () => {
  const modal = useSelector(state => state.ui.modal);
  const dispatch = useDispatch();

  if (!modal.showModal) return null;

  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch(receiveSongErrors([]));
      dispatch(clearSessionErrors());
      dispatch(disableModalDisplay());
    }, 710)
    const modal = document.querySelector('.modal-child');
    modal.style.top = '-100%';
    modal.animate([
      { top: '45%' },
      { top: '-100%' }
    ], 700)
  }

  const createComponent = (type) =>{
    switch (type) {
      case 'session':
        return <UserFormModalContainer handleCloseModal={handleCloseModal} />;
      case 'songEdit':
        return <SongShowEditModal song={modal.data.song} user={modal.data.user} handleCloseModal={handleCloseModal} />;
      case 'songDelete':
        return <SongShowDeleteModal song={modal.data.song} user={modal.data.user} handleCloseModal={handleCloseModal} />;
      case 'userEdit':
        return <UserEditFormModal user={modal.data.user} handleCloseModal={handleCloseModal} />
    }
  }  

  return (
    <div className="modal-background" onClick={handleCloseModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {createComponent(modal.type)}
      </div>
    </div>
  )
}

export default Modal;