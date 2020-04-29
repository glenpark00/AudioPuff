import React from 'react';

export default class SignupFormStep2 extends React.Component {
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
    }
    if (this.state.gender === '') {
      this.setState({ genderError: true });
    }
  }

  handleSignup() {
    this.checkFields();
    if (this.state.age >= 15 && this.state.gender != '') {
      const { email, password, gender, age } = this.state;
      this.props.signup({ email, password, gender, age })
        .then(() => {
          this.setState({ gender: '', age: 0, });
          this.props.handleCloseModal();
        });
    }
  }

  render() {
    return (
      <div className='form-modal'>
        <h3>Create your AudioPuff account</h3>
        <div>Tell us your age</div>
        <input type='number'
          value={this.state.age}
          onChange={e => this.setState({ age: e.target.value })} />
        { this.state.ageError ? 
          <div>
            Sorry, but you don't meet AudioPuff's minimum age requirements.
          </div> 
          : '' 
        }
        <div>Gender</div>
        <select defaultValue='' onChange={this.toggleCustomGender}>
          <option disabled value=''>Indicate your gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Custom">Custom</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        { this.state.showCustomGender ? 
          <input type="text"
                 value={ this.state.gender } 
                 placeholder='Custom gender' 
                 onChange={ e => this.setState({ gender: e.target.value }) } /> 
          : '' 
        }
        { this.state.genderError ?
          <div>
            Please indicate your gender.
          </div>
          : ''
        }
        <button onClick={this.handleSignup}>Continue</button>
      </div>
    )
  }
}