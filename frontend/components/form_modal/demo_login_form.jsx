import React from 'react';

class DemoLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      currentPassword: ''
    }
    this.fillInField();
    this.handleLogin = this.handleLogin.bind(this);
  }

  fillInField() {
    const chars = this.props.demoPassword.split('');
    let index = 0;
    let interval = setInterval(
      () => {
        this.setState({ currentPassword: this.state.currentPassword.concat(chars[index]) });
        index++;
        if (index === chars.length) {
          clearInterval(interval)
        }
      }, 200)
  }

  componentDidMount() {
    const submitButton = document.getElementById('demo-submit-button');
    setTimeout(() => submitButton.click(), 2000)
  }

  handleLogin() {
    const { demoIdentifier, demoPassword, login, handleCloseModal } = this.props;
    login({ identifier: demoIdentifier, password: demoPassword }).then( () => handleCloseModal() );
  }

  render() {
    const { demoIdentifier, prevStep } = this.props;
    return (
      <div className='form-modal'>
        <button onClick={ prevStep }>{ demoIdentifier }</button>
        <input type="password"
          value={ this.state.currentPassword }
          placeholder='Your Password'
          onChange={ e => this.setState({ currentPassword: e.target.value }) } />
        <button id='demo-submit-button' ref={ this.simulateClick } onClick={ this.handleLogin }>Sign In</button>
        <a href="">Don't know your password?</a>
      </div>
    )
  }
}

export default DemoLoginForm;