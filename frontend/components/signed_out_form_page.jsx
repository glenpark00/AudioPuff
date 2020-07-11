import React from 'react';
import UserFormModalContainer from './modal/user_form_modal_container';
// import { disableModalDisplay } from '../../actions/ui_actions';
import { withRouter } from 'react-router-dom';

const SignedOutFormPage = ({ text }) => {

  const handleCloseModal = () => {

  }

  return (
    <div className='signed-out-form-page-background'>
      <div className='signed-out-form-page'>
        <div>{}</div>
        <UserFormModalContainer handleCloseModal={handleCloseModal} text={text} />
      </div>
    </div>
  )
}

export default withRouter(SignedOutFormPage);