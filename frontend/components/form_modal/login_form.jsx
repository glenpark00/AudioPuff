import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: this.props.identifier,
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
      this.props.login(this.state).then( () => {
      this.props.handleCloseModal();
      this.setState({ step: 1, formType: null, identifier: '', password: '' });
    })
  }

  render() {
    const { identifier, prevStep } = this.props;
    return (
      <div className='form-modal'>
        <button onClick={prevStep}>{identifier}</button>
        <input type="password"
               value={this.state.password}
               placeholder='Your Password'
               onChange={e => this.setState({ password: e.target.value })} />
        { this.props.errors.length > 0 ? <div>{this.props.errors[0]}</div> : '' }
        <button onClick={this.handleLogin}>Sign In</button>
        <a href="">Don't know your password?</a>
      </div>
    )
  }
}

export default withRouter(LoginForm);