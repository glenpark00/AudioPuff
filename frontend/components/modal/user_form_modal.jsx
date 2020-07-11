import React from 'react';
import UserForm from './user_form';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import DemoLogin from './demo_login';

export default class UserFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstStep: true,
      formType: null,
      identifier: '',
      demoUser: null
    }
    this.setForm = this.setForm.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.triggerDemoLogin = this.triggerDemoLogin.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(1)
      .then(user => this.setState({ demoUser: user }))
  }

  setForm(exists, identifier) {
    if (exists) {
      this.setState({ identifier, formType: 'login', firstStep: false })
    } else {
      this.setState({ identifier, formType: 'signup', firstStep: false })
    }
  }

  prevStep() {
    this.setState({ firstStep: true });
  }

  triggerDemoLogin() {
    this.setState({ firstStep: false, formType: 'demo' });
  }

  render() {
    const { handleCloseModal, text, login, signup, updateUser, errors } = this.props;
    const { formType, firstStep, identifier, demoUser } = this.state;
    if (firstStep) {
      return <UserForm setForm={this.setForm}
        triggerDemoLogin={this.triggerDemoLogin} text={text} />
    } else if (!firstStep) {
      if (formType === 'login') {
        return <LoginForm identifier={identifier}
          login={login}
          prevStep={this.prevStep}
          handleCloseModal={handleCloseModal}
          errors={errors} />
      } else if (formType === 'signup') {
        return <SignupForm email={identifier}
          signup={signup}
          updateUser={updateUser}
          prevStep={this.prevStep}
          handleCloseModal={handleCloseModal} />
      } else if (formType === 'demo') {
        return <DemoLogin handleCloseModal={handleCloseModal}
          login={login} demoUser={demoUser} />
      }
    }
  }
}
