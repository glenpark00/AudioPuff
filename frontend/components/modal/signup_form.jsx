import React from 'react';
import SignupFormStep1 from './signup_form_step_1';
import SignupFormStep2 from './signup_form_step_2';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordPage: true,
      showCustomGender: false,
      email: this.props.email,
      password: ''
    }
    this.toggleCustomGender = this.toggleCustomGender.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.setPassword = this.setPassword.bind(this);
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
    this.setState({ formType: null, identifier: '', password: '' });
    this.props.handleCloseModal();
  }

  setPassword(password) {
    this.setState({ password, passwordPage: false })
  }

  render() {
    if (this.state.passwordPage) {
      return <SignupFormStep1 prevStep={ this.props.prevStep }
                              setPassword={ this.setPassword }
                              email={ this.state.email } />
    } else {
      return <SignupFormStep2 signup={ this.props.signup }
                              email={ this.state.email }
                              password={this.state.password}
                              handleCloseModal={ this.props.handleCloseModal } />
    }
  }
}