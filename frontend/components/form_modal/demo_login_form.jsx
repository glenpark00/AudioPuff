import React from 'react';

class DemoLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      currentPassword: '',
      interval: null
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
      }, 100)
  }

  componentDidMount() {
    const submitButton = document.querySelector('.form-submit-button');
    this.setState({ interval: setInterval(() => submitButton.click(), 1200) })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({ interval: null })
  }

  handleLogin() {
    const { demoIdentifier, demoPassword, login, handleCloseModal } = this.props;
    login({ identifier: demoIdentifier, password: demoPassword }).then( () => handleCloseModal() );
  }

  render() {
    const { demoIdentifier, prevStep } = this.props;
    return (
      <div className='form-modal'>
        <div className='form-prev-button' onClick={prevStep}>◀  { demoIdentifier }</div>
        <input className='form-modal-input' 
          type="password"
          value={ this.state.currentPassword }
          placeholder='Your Password'
          onChange={ e => this.setState({ currentPassword: e.target.value }) } />
        <button className='form-submit-button' ref={ this.simulateClick } onClick={ this.handleLogin }>Sign In</button>
        <a href="">Don't know your password?</a>
      </div>
    )
  }
}

export default DemoLoginForm;