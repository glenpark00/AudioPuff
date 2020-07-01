import React from 'react';
import SearchEverything from './search_everything';

export default class SearchResults extends React.Component {
  componentDidMount() {
    this.props.search(this.props.match.params.fragment);
  }

  render() {
    const { users, songs, songUsers } = this.props;
    const fragment = this.props.match.params.fragment;

    return (
      <div>
        <h1>Search Results for "{fragment}"</h1>
        <div>
          <SearchEverything users={users} songs={songs} songUsers={songUsers} />
        </div>
      </div>
    )
  }
}