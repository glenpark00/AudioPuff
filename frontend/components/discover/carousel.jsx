import React from 'react';
import SongDisplayItemContainer from '../song_display_item/song_display_item_container';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    }
  }

  scrollCarousel(side) {
    const carousel = document.querySelector('.songs-carousel');
    const width = carousel.offsetWidth;
    const scrollWidth = carousel.scrollWidth;
    const { position } = this.state;
    if (side === 'left' && position > 0) {
      let newPosition = position - width;
      if (position > scrollWidth) {
        newPosition -= 2 * width;
      }
      if (newPosition < 0) {
        newPosition = 0;
      }
      this.scrollTo(newPosition);
    } else if (side === 'right' && position < scrollWidth) {
      let newPosition = position + width;
      if (newPosition + width > scrollWidth) {
        newPosition = scrollWidth + width;
      }
      this.scrollTo(newPosition);
    }
  }

  scrollTo(position) {
    const carousel = document.querySelector('.songs-carousel');
    this.setState({ position }, () => {
      carousel.scrollLeft = position;
    })
  }

  scrollOnHover(side) {
    const carousel = document.querySelector('.songs-carousel');
    const { position } = this.state;
    if (side === 'left') {
      if (position > carousel.scrollWidth) {
        carousel.scrollLeft = position - 2 * carousel.offsetWidth - 10;
      } else {
        carousel.scrollLeft = position - 10;
      }
      setTimeout(() => carousel.scrollLeft = position, 175)
    } else {
      carousel.scrollLeft = position + 15;
      setTimeout(() => carousel.scrollLeft = position, 175)
    }
  }

  scrollButton(side) {
    return (
      <div
        id={`carousel-${side}-button-container`}
        className='carousel-scroll-button-container'
        onClick={() => this.scrollCarousel(side)}
      >
        <div id={`carousel-${side}-button`} className='carousel-scroll-button' onMouseEnter={() => this.scrollOnHover(side)}>
          {side === 'left' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
        </div>
      </div>
    )
  }

  render() {
    const { users, songs } = this.props;
    const carousel = document.querySelector('.songs-carousel');
    const scrollWidth = (carousel ? carousel.scrollWidth : 9999);

    return (
      <div className='songs-carousel-container'>
        {this.state.position > 0 ? this.scrollButton('left') : null}
        <div className='songs-carousel'>
          {songs.map(song => {
            const user = users[song.userUrl];
            return <SongDisplayItemContainer song={song} user={user} key={song.id} />
          }
          )}
        </div>
        {this.state.position < scrollWidth ? this.scrollButton('right') : null}
      </div>
    )
  }
}