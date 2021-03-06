import React from 'react';
import DemoLoginForm from './demo_login_form';
import DemoUserForm from './demo_user_form';

export default class DemoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstStep: true
    }
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep() {
    this.setState({ firstStep: false });
  }
  
  render() {
    const { demoUser, login, handleCloseModal, text } = this.props;
    const demoIdentifier = demoUser.profileUrl;
    const demoPassword = 'password';
    if (this.state.firstStep) {
      return <DemoUserForm nextStep={this.nextStep}
        demoIdentifier={demoIdentifier} text={text} />
    } else {
      return <DemoLoginForm closeModal={this.closeModal}
        demoIdentifier={demoIdentifier}
        demoPassword={demoPassword}
        login={login}
        handleCloseModal={handleCloseModal} />
    }
  }
}
  