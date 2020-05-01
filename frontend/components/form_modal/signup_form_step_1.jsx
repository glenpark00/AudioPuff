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
        <button className='form-prev-button' onClick={prevStep}>◀  { email }</button>
        <label>Choose a password
            <br />
          <input className='form-modal-input'
            type='password'
            value={ this.state.password }
            onChange={ e => this.setState({ password: e.target.value }) } />
        </label>
        <br/>
        <div>By signing up I accept the Terms of Use. I have read and understood the Privacy Policy and Cookies Policy.</div>
        <button className='form-submit-button' onClick={ () => setPassword(this.state.password) }>Accept and continue</button>
        <br/>
        <div>Are you trying to sign in?</div>
        <div>The email address that you entered was not found.</div>
        <div>Double-check your email address.</div>
      </div>
    )
  }
}