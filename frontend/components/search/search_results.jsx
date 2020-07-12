import React, { useEffect, useState } from 'react';
import SearchEverything from './search_everything';
import SearchSongs from './search_songs';
import SearchUsers from './search_users';
import { withRouter } from 'react-router-dom';
import { search } from '../../actions/songs_actions';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { GiSoundWaves } from 'react-icons/gi';
import { IoIosPerson } from 'react-icons/io';

const SearchResults = ({ match, history }) => { 
  const [searchSongs, setSearchSongs] = useState([]),
    [songUsers, setSongUsers] = useState({}),
    [searchUsers, setSearchUsers] = useState([]),
    [shuffledIndices, setShuffledIndices] = useState([]),
    [type, setType] = useState('everything'),
    dispatch = useDispatch(),
    fragment = match.params.fragment;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    dispatch(search(fragment))
      .then(data => {
        setSongUsers(data.songUsers);
        const size = Object.values(data.songs).length + Object.values(data.users).length;
        const shuffled = [...Array(size).keys()];;
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i)
          const temp = shuffled[i]
          shuffled[i] = shuffled[j]
          shuffled[j] = temp;
        }
        setSearchSongs(Object.values(data.songs));
        setSearchUsers(Object.values(data.users));
        setShuffledIndices(shuffled);
      })
  }, [fragment])

  const content = () => {
    if (type === 'everything') {
      return <SearchEverything users={searchUsers} songs={searchSongs} songUsers={songUsers} shuffledIndices={shuffledIndices} />;
    } else if (type === 'tracks') {
      return <SearchSongs songs={searchSongs} songUsers={songUsers} />;
    } else {
      return <SearchUsers users={searchUsers} />;
    }
  }
  
  return (
    <div className='search-results-page-background'>
      <div className='search-results-page'>
        <h1>Search Results for "{fragment}"</h1>
        <div className='search-results-content'>
          <div className='search-results-side-bar'>
            <div onClick={() => setType('everything')} style={type === 'everything' ? { backgroundColor: '#CE1141' } : {}}>
              <div>{<FaSearch color={type === 'everything' ? 'white' : ''} />}</div>
              <div style={type === 'everything' ? { color: 'white' } : {}}>Everything</div>
            </div>
            <div onClick={() => setType('tracks')} style={type === 'tracks' ? { backgroundColor: '#CE1141' } : {}}>
              <div>{<GiSoundWaves color={type === 'tracks' ? 'white' : ''} />}</div>
              <div style={type === 'tracks' ? { color: 'white' } : {}}>Tracks</div>
            </div>
            <div onClick={() => setType('people')} style={type === 'people' ? { backgroundColor: '#CE1141' } : {}}>
              <div>{<IoIosPerson color={type === 'people' ? 'white' : ''} />}</div>
              <div style={type === 'people' ? { color: 'white' } : {}}>People</div>
            </div>
          </div>
          <div className='phantom-search-side-bar'></div>
            {content()}
        </div>
      </div>
    </div>
  )
}

export default withRouter(SearchResults);