import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: this.props.identifier,
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.login(this.state)
      .then(() => {
        this.setState({ step: 1, formType: null, identifier: '', password: '' });
        this.props.handleCloseModal();
      });
  }

  render() {
    const { identifier, prevStep } = this.props;
    return (
      <div className='form-modal'>
        <div className='form-prev-button' onClick={prevStep}>◀  {identifier}</div>
        <input className='form-modal-input'
               type="password"
               value={this.state.password}
               placeholder='Your Password'
               onChange={e => this.setState({ password: e.target.value })} />
        { this.props.errors.length > 0 ? <div className='form-error-text'>{this.props.errors[0]}</div> : '' }
        <button className='form-submit-button' onClick={this.handleLogin}>Sign In</button>
        <a href="">Don't know your password?</a>
      </div>
    )
  }
}

export default LoginForm;