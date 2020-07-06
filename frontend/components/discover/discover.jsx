import React from 'react';
import Footer from '../footer';
import Carousel from './carousel';

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNSongs(10);
  }

  render() {
    const { users, songs } = this.props;
    return (
      <div className='discover-page-background'>
        <div className='discover-page'>
          <div className='page-full-content'>
            <div className='page-main-content'>
              <div className='discover-heading-container'>
                <h2 className='discover-header'>New Music Now</h2>
                <div className='discover-subheader'>The latest hits, updated all the time</div>
              </div>
              <Carousel songs={songs} users={users}/>
              <Footer></Footer>
            </div>
            <div className='side-bar'>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}