import React from 'react';
import SiteDropdownContainer from './site_dropdown_container';

export default class SiteDropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  closeDropdown(e) {
    this.setState({ showDropdown: false });
  }

  render() {
    return (
      <div 
        className={`site-dropdown-button ${this.state.showDropdown ? 'dropdown-selected' : ''} no-select`} 
        onClick={ this.handleClick }
      >...
        {this.state.showDropdown ?
            <SiteDropdownContainer
              closeDropdown={ this.closeDropdown }
              loggedIn={ this.props.loggedIn } />
          : ''
        }
      </div>
    )
  }
}