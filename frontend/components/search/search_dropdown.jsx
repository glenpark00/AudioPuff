import React from 'react';
import { IoIosPerson } from 'react-icons/io';
import { GiSoundWaves } from 'react-icons/gi';
import { withRouter } from 'react-router-dom';

export class SearchDropdown extends React.Component {
  componentDidMount() {
    window.addEventListener('click', this.props.closeDropdown)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.props.closeDropdown)
  }

  render() {
    const { fragment, songs, users, history } = this.props;
    return (
      <div className='search-dropdown-container'>
        <ul className='search-dropdown'>
          <li className='search-dropdown-query' onClick={() => history.push(`/search/${fragment}`)}>
            Search for "{fragment}"
          </li>
          {users.map((user, i) => {
            if (i < 3) {
              return (
                <li className='search-dropdown-result' key={user.id} onClick={() => history.push(`/${user.profileUrl}`)}>
                  <div className='search-dropdown-info'>
                    <img src={user.imageUrl} alt='user-image-search' className='search-dropdown-user-img' />
                    <div>{user.displayName}</div>
                  </div>
                  <div><IoIosPerson /></div>
                </li>
              )
            }
          })}
          {songs.map((song, i) => {
            if (i < 3) {
              return (
                <li className='search-dropdown-result' key={song.id} onClick={() => history.push(`${song.userUrl}/${song.songUrl}`)}>
                  <div className='search-dropdown-info'>
                    <img src={song.imageUrl} alt='user-image-search' className='search-dropdown-song-img' />
                    <div>{song.title}</div>
                  </div>
                  <div><GiSoundWaves /></div>
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
  
}

export default withRouter(SearchDropdown);