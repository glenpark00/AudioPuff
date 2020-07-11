import React from 'react';
import CarouselItem from './carousel_item';
import LibraryUserItem from '../library/library_user_item';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    }
    this.id = Math.floor(Math.random() * 10000);
  }

  scrollCarousel(side) {
    const carousel = document.querySelector(`#songs-carousel-${this.id}`);
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
    const carousel = document.querySelector(`#songs-carousel-${this.id}`);
    this.setState({ position }, () => {
      carousel.scrollLeft = position;
    })
  }

  scrollOnHover(side) {
    const carousel = document.querySelector(`#songs-carousel-${this.id}`);
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
    const { users, songs, type } = this.props;
    const carousel = document.querySelector(`#songs-carousel-${this.id}`);
    const scrollWidth = (carousel ? carousel.scrollWidth : 9999);

    return (
      <div className='songs-carousel-buttons' key={this.id}>
        {this.state.position > 0 ? this.scrollButton('left') : null}
        <div className='songs-carousel-container'>
          <div id={`songs-carousel-${this.id}`} className='songs-carousel'>
            {type === 'songs' ? 
              songs.map(song => {
                const user = users[song.userUrl];
                return <CarouselItem song={song} user={user} key={`${song.id}-${this.id}`} />
              })
              :
              users.map(user => {
                return <LibraryUserItem user={user} key={`${user.id}-${this.id}`} />
              })
            }
          </div>
        </div>
        {this.state.position < scrollWidth ? this.scrollButton('right') : null}
      </div>
    )
  }
}