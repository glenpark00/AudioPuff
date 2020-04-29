import React from 'react';
import { userExists } from '../../util/users_api_util';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      error: false
    }
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  checkUserExists(e) {
    e.preventDefault();
    userExists(this.state.identifier).then(
      exists => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const identifier = this.state.identifier;
        if (!re.test(identifier) && !exists) {
          this.setState({ error: true });
        } else {
          this.props.setForm(exists, identifier);
        }
      }
    )
  }

  render() {
    return (
      <div className='form-modal'>
        <input type="text"
          value={this.state.identifier}
          placeholder='Your email address or profile URL'
          onChange={e => this.setState({ identifier: e.target.value })} />
        { this.state.error ? 
          <div>That profile url does not exist</div>
          : ''
        }
        <button onClick={this.checkUserExists}>Continue</button>
        <div>We may use your email and devices for updates and tips on SoundCloud's products and services, and for activities notifications. You can unsubscribe for free at any time in your notification settings.</div>
        <button onClick={this.props.triggerDemoLogin}>Demo Login</button>
      </div>
    )
  }
}