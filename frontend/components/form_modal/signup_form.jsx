import React from 'react';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordPage: true,
      showCustomGender: false,
      email: this.props.identifier,
      password: '',
      age: 0,
      gender: ''
    }
    this.toggleCustomGender = this.toggleCustomGender.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  
  toggleCustomGender(e) {
    e.preventDefault();
    if (e.target.value === 'Custom') {
      this.setState({ showCustomGender: true, gender: '' })
    } else {
      this.setState({ showCustomGender: false, gender: e.target.value })
    }
  }

  handleSignup(e) {
    const { email, password, age, gender } = this.state;
    this.props.signup({ email, password, age, gender });
    this.props.handleCloseModal();
    this.props.history.push('/discover');
    this.setState({ formType: null, identifier: '', password: '' });
  }

  render() {
    if (this.state.passwordPage) {
      return (
        <div className='form-modal'>
          <button onClick={this.props.prevStep}>{this.state.email}</button>
          <label>Choose a password
            <br/>
            <input type="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })} />
          </label>
            <div>By signing up I accept the Terms of Use. I have read and understood the Privacy Policy and Cookies Policy.</div>
            <button onClick={e => this.setState({ passwordPage: false })}>Accept and continue</button>
            <div>Are you trying to sign in?</div>
            <div>The email address that you entered was not found.</div>
            <div>Double-check your email address.</div>
        </div>
      )
    } else {
      return (
        <div className='form-modal'>
          <h3>Create your AudioPuff account</h3>
          <div>Tell us your age</div>
          <input type='number'
                 value={this.state.age}
                 onChange={e => this.setState({ age: e.target.value })} />
          <div>Gender</div>
          <select defaultValue='default' onChange={this.toggleCustomGender}>
            <option disabled value='default'>Indicate your gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Custom">Custom</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {this.state.showCustomGender ? <input type="text" value={this.state.gender} placeholder='Custom gender' onChange={e => this.setState({ gender: e.target.value })} /> : ''}
          <button onClick={this.handleSignup}>Continue</button>
        </div>
      )
    }
  }
}