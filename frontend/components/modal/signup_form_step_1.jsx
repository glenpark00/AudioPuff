import React from 'react';

export default class SignupFormStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordError: false
    }
  }

  continue() {
    const { setPassword } = this.props;
    if (this.state.password.length >= 6) {
      setPassword(this.state.password)
    } else {
      this.setState({ passwordError: true })
    }
  }

  render() {
    const { prevStep, email } = this.props;
    const { password, passwordError } = this.state;
    return (
      <div className='form-modal'>
        <h2 className='form-header'>
          Create your AudioPuff account
        </h2>
        <div className='form-prev-button' onClick={prevStep}>◀  { email }</div>
        <div className='modal-subheader'>Choose a password</div>
        <input className='form-modal-input'
          type='password'
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          onKeyPress={e => e.key === 'Enter' ? this.continue(password) : null} /> 
        {passwordError ? <div className='form-error-text'>Password too short</div> : null }
        <div className='modal-text'>By signing up I accept the Terms of Use. I have read and understood the Privacy Policy and Cookies Policy.</div>
        <button className='form-submit-button' onClick={() => this.continue(password)}>Accept and continue</button>
        <div className='modal-text'>Are you trying to sign in? The email address that you entered was not found. Double-check your email address.</div>
      </div>
    )
  }
}