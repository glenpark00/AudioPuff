import React from 'react';

export default class SignupFormStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }
  }

  render() {
    const { prevStep, email, setPassword } = this.props;
    return (
      <div className='form-modal'>
        <h2 className='form-header'>
          Create your AudioPuff account
        </h2>
        <div className='form-prev-button' onClick={prevStep}>◀  { email }</div>
        <div className='modal-subheader'>Choose a password</div>
        <input className='form-modal-input'
          type='password'
          value={ this.state.password }
          onChange={ e => this.setState({ password: e.target.value }) } />
        <div className='modal-text'>By signing up I accept the Terms of Use. I have read and understood the Privacy Policy and Cookies Policy.</div>
        <button className='form-submit-button' onClick={ () => setPassword(this.state.password) }>Accept and continue</button>
        <div className='modal-text'>Are you trying to sign in? The email address that you entered was not found. Double-check your email address.</div>
      </div>
    )
  }
}