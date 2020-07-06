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
  
  content() {
    const demoIdentifier = 'puffy2';
    const demoPassword = 'password';
    if (this.state.firstStep) {
      return <DemoUserForm nextStep={ this.nextStep } 
                           demoIdentifier={ demoIdentifier } />
    } else {
      return <DemoLoginForm closeModal={ this.closeModal }
                            demoIdentifier={ demoIdentifier }
                            demoPassword={ demoPassword }
                            login={this.props.login}
                            handleCloseModal={ this.props.handleCloseModal } />
    }
  }

  render() {
    return this.content();
  }
}
  