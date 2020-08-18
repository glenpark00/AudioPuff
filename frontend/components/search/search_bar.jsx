import React from 'react';
import SearchDropdown from './search_dropdown';
import { GrSearch } from 'react-icons/gr';
import { debounce } from 'throttle-debounce';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fragment: '',
      showDropdown: false
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname && this.props.location.pathname.slice(7) !== '/search') {
      document.querySelector('.search-input').value = '';
      this.setState({ fragment: '', showDropdown: false }, () => this.props.search(''))
    }
  }

  closeDropdown() {
    this.setState({ showDropdown: false })
  }

  handleSearch(e) {
    const fragment = e.target.value;
    if (fragment === '') {
      this.setState({ showDropdown: false })
    } else {
      this.setState({ showDropdown: true })
    }
    this.setState({ fragment }, () => debounce(200, this.props.search)(fragment));
  }

  handleFocus(e) {
    if (e.target.value !== '') {
      this.setState({ showDropdown: true })
    }
  }

  openSearchResults() {
    this.props.history.push(`/search/${this.state.fragment}`);
  }

  render() {
    const { songs, users } = this.props;
    return (
      <div className='search-container'>
        <div className='search-bar'>
          <input 
            className='search-input'
            type="text"
            onChange={this.handleSearch}
            placeholder='Search' 
            onFocus={this.handleFocus}
            onClick={e => e.stopPropagation()}
            onKeyPress={e => e.key === 'Enter' ? this.openSearchResults(): null} />
          <div className='search-icon' onClick={e => {
            e.stopPropagation();
            this.openSearchResults()}}><GrSearch /></div>
        </div>
        {this.state.showDropdown ? <SearchDropdown songs={songs} users={users} fragment={this.state.fragment} closeDropdown={this.closeDropdown}/> : null}
      </div>
    )
  }
}