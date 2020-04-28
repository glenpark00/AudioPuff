import React from 'react';
import UserForm from './user_form';
import LoginForm from './login_form';
import SignupForm from './signup_form';

export default class UserFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstStep: true,
      formType: null,
      identifier: ''
    }
    this.setForm = this.setForm.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.resetLocalState = this.resetLocalState.bind(this);
  }

  resetLocalState() {
    this.setState({
      firstStep: true,
      formType: null,
      identifier: ''
    })
  }

  setForm(exists, identifier) {
    if (exists) {
      this.setState({ identifier, formType: 'login', firstStep: false })
    } else {
      this.setState({ identifier, formType: 'signup', firstStep: false })
    }
  }

  prevStep() {
    this.setState({ firstStep: true });
  }

  handleCloseModal() {
    this.resetLocalState();
    this.props.disableModalDisplay();
  }

  modalContent() {
    const formType = this.state.formType;
    if (this.state.firstStep) {
      return <UserForm setForm = { this.setForm } />
    } else  {
      if (formType === 'login') {
        return <LoginForm identifier={this.state.identifier} 
                          login={this.props.login}
                          prevStep={this.prevStep} 
                          handleCloseModal={this.handleCloseModal}
                          errors={this.props.errors} />
      } else if (formType === 'signup') {
        return <SignupForm identifier={this.state.identifier} 
                           signup={this.props.signup}
                           prevStep={this.prevStep} 
                           handleCloseModal={this.handleCloseModal} />
      }
    }
  }

  render() {
    if (this.props.showModal) {
      return (
        <div className="modal-background" onClick={this.handleCloseModal}>
          <div className="modal-child" onClick={e => e.stopPropagation()}>
            {this.modalContent()}
          </div>
        </div>
      )
    } else {
      return <></>
    }
  }
}
