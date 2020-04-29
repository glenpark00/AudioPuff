import React from 'react';
import SiteDropdown from './site_dropdown';

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
      <div className='site-dropdown'>
        <button className='site-dropdown-button' onClick={ this.handleClick }>...</button>
        {this.state.showDropdown ?
          <SiteDropdown closeDropdown={ this.closeDropdown }
                        loggedIn={ this.props.loggedIn } />
          : ''
        }
      </div>
    )
  }
}