import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupFormStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomGender: false,
      email: this.props.email,
      password: this.props.password,
      gender: '',
      age: 0,
      ageError: false,
      genderError: false
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

  checkFields() {
    if (this.state.age < 15) {
      this.setState({ ageError: true });
    } else {
      this.setState({ ageError: false });
    }
    if (this.state.gender === '') {
      this.setState({ genderError: true });
    } else {
      this.setState({ genderError: false });
    }
  }

  handleSignup() {
    this.checkFields();
    if (this.state.age >= 15 && this.state.gender != '') {
      const { setUser, history } = this.props;
      const { email, password, gender, age } = this.state;
      this.props.signup({ email, password, gender, age })
        .then(user => {
          setUser(user, () => {
            history.push('/discover');
          })
        });
    }
  }

  render() {
    return (
      <div className='form-modal'>
        <h3 className='form-header'>Create your AudioPuff account</h3>
        <div className='modal-subheader'>Tell us your age</div>
        <input className='form-modal-input'
          type='number'
          value={ this.state.age }
          onChange={ e => this.setState({ age: e.target.value }) } />
        { this.state.ageError ? 
          <div className='form-error-text'>
            Sorry, but you don't meet AudioPuff's minimum age requirements.
          </div> 
          : '' 
        }
        <div className='modal-subheader'>Gender</div>
        <select className='form-modal-dropdown' defaultValue='' onChange={ this.toggleCustomGender }>
          <option disabled value=''>Indicate your gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Custom">Custom</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        { this.state.showCustomGender ? 
          <input className='form-modal-input'
                 type="text"
                 value={ this.state.gender } 
                 placeholder='Custom gender' 
                 onChange={ e => this.setState({ gender: e.target.value }) } /> 
          : '' 
        }
        { this.state.genderError ?
          <div className='form-error-text'>
            Please indicate your gender.
          </div>
          : ''
        }
        <button className='form-submit-button ' onClick={ this.handleSignup }>Continue</button>
      </div>
    )
  }
}

export default withRouter(SignupFormStep2);