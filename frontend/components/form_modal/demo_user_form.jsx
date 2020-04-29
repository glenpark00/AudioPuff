import React from 'react';

export default class DemoUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdentifier: '',
      timeout: null
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
      }, 300)
  }

  componentDidMount() {
    const submitButton = document.getElementById('demo-submit-button');
    setTimeout(() => submitButton.click(), 2000) 
  }

  render() {
    return (
      <div className='form-modal'>
        <input type="text"
          value={ this.state.currentIdentifier }
          placeholder='Your email address or profile URL'
          onChange={ e => this.setState({ currentIdentifier: e.target.value }) } />
        <button id='demo-submit-button' ref={ this.simulateClick } onClick={ this.props.nextStep }>Continue</button>
        <div>We may use your email and devices for updates and tips on SoundCloud's products and services, and for activities notifications. You can unsubscribe for free at any time in your notification settings.</div>
        <button>Demo Login</button>
      </div>
    )
  }
}


