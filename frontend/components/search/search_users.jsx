import React from 'react';
import SearchUserItem from './search_user_item';

export default class SearchEverything extends React.Component {

  render() {
    const { users } = this.props;

    return (
      <div className='search-results-items'>
        <h2>Found {users.length} people</h2>
        <div>
          {users.map(user =>
            <SearchUserItem user={user} key={`search-result-${Math.floor(Math.random() * 10000)}`} />
          )}
        </div>
      </div>
    )
  }
}