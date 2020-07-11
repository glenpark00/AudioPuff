import React from 'react';
import SignupFormStep1 from './signup_form_step_1';
import SignupFormStep2 from './signup_form_step_2';
import SignupFormStep3 from './signup_form_step_3';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      showCustomGender: false,
      email: this.props.email,
      password: '',
      user: null
    }
    this.toggleCustomGender = this.toggleCustomGender.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setUser = this.setUser.bind(this);
    // this.nextStep = this.nextStep.bind(this);
  }
  
  toggleCustomGender(e) {
    e.preventDefault();
    if (e.target.value === 'Custom') {
      this.setState({ showCustomGender: true, gender: '' })
    } else {
      this.setState({ showCustomGender: false, gender: e.target.value })
    }
  }

  handleSignup() {
    const { email, password, age, gender } = this.state;
    this.props.signup({ email, password, age, gender });
    this.setState({ formType: null, identifier: '', password: '' });
    this.props.handleCloseModal();
  }

  setPassword(password) {
    this.setState({ password, step: this.state.step + 1 })
  }

  setUser(user, callback) {
    this.setState({ user, step: this.state.step + 1  }, callback)
  }

  // nextStep() {
  //   this.setState({ step: this.state.step + 1 })
  // }

  render() {
    const { prevStep, signup, updateUser, handleCloseModal, email } = this.props;
    const { step, password, user  } = this.state;
    if (step === 1) {
      return <SignupFormStep1 prevStep={prevStep}
                              setPassword={this.setPassword}
                              email={email}
                              />
    } else if (step === 2) {
      return <SignupFormStep2 signup={signup}
                              email={email}
                              password={password}
                              setUser={this.setUser}
                              />
    } else {
      return <SignupFormStep3 updateUser={updateUser}
                              handleCloseModal={handleCloseModal}
                              user={user}
                              />
    }
  }
}