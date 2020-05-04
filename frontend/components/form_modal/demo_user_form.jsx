import React from 'react';

export default class DemoUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdentifier: '',
      interval: null
    }
    this.fillInField();
  }

  fillInField() {
    const chars = this.props.demoIdentifier.split('');
    let index = 0;
    let interval = setInterval(
      () => {
        this.setState({ currentIdentifier: this.state.currentIdentifier.concat(chars[index]) });
        index++;
        if (index === chars.length) {
          clearInterval(interval)
        }
      }, 150)
  }

  componentDidMount() {
    const submitButton = document.querySelector('.identifier-submit-button');
    this.setState({ interval: setInterval(() => submitButton.click(), 1600) })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({ interval: null })
  }

  render() {
    return (
      <div className='form-modal'>
        <div className='form-header'>Sign in or create an account</div>
        <input className='form-modal-input'
          type="text"
          value={ this.state.currentIdentifier }
          placeholder='Your email address or profile URL'
          onChange={ e => this.setState({ currentIdentifier: e.target.value }) } />
        <button className='identifier-submit-button' ref={ this.simulateClick } onClick={ this.props.nextStep }>Continue</button>
        <button className='demo-login-button'>Demo Login</button>
        <br/>
        <div className='modal-text'>We may use your email and devices for absolutely nothing. You can unsubscribe for free at any time in your notification settings.</div>
      </div>
    )
  }
}


