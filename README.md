# AudioPuff

A audio streaming platform and music sharing social media website inspired by SoundCloud, which has had a big part in shaping my taste in music.

### [Live Site](https://audiopuff.herokuapp.com)

![profile_page](https://github.com/glenpark00/AudioPuff/blob/master/app/assets/images/profile_page.png)

## Technologies

- Backend: Ruby on Rails, PostgreSQL
- Frontend: React, Redux
- Hosting: Heroku
- Additional technologies:
    * Amazon S3: image and song file hosting with user upload functionality
    * throttle-debounce: limits execution rate of event handlers; crucial due to constant state changes while streaming
    * HTML Canvas: Waveform visualizer created and stored in the songs database as a canvas URL string in order to massively cut down on load times and responsivity
    
## Homemade Dynamic Sound Waveform

Because SoundCloud seems to have taken down the only article about how their waveforms work, I decided to get creative and see if I could implement a interactive and responsive waveform visualizer purely in vanilla JavaScript. First, I made use of the built-in browser [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) API to decode and convert a music file into sampled normalized sound data. This data is used to draw a set of bars on a canvas element, which is converted into a URL and stored in the database at the time of a song's creation. This was done to optimize the waveform visualizer in practice, as other methods would have required parsing an audio file on demand and then creating the canvas, which would lead to absymal performance. 

![waveform](https://github.com/glenpark00/AudioPuff/blob/master/app/assets/images/waveform.gif)

The visualizer is constructed of three versions of the canvas image, each colored with a different filter. The three versions are used for displaying progress, time left, and a hover effect. As a song plays, all three images adjust their widths accordingly, and users can click on any part of the waveform to go to the corresponding timestamp.

Here's the code for how to progress/hover waveform works: 

```
componentDidUpdate() {
    const { audio, song, hovering, waveformWidth } = this.props;
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    const progressWidth = progressDiv.offsetWidth;
    const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
    const playingWidth = playingProgressDiv.offsetWidth;
    const currentTimeWidth = (audio.currentSong.currentTime / song.duration) * waveformWidth;
    if (hovering) {
      if (progressWidth + playingWidth <= currentTimeWidth) {
        playingProgressDiv.style.width = `${currentTimeWidth - progressDiv.offsetWidth}px`;
      } else {
        progressDiv.style.width = `${currentTimeWidth}px`;
        playingProgressDiv.style.width = `${progressWidth + playingWidth - currentTimeWidth}px`;
        playingProgressDiv.scrollLeft = progressDiv.offsetWidth;
      }
    } else {
      progressDiv.style.width = `${currentTimeWidth}px`;
      playingProgressDiv.style.width = '0';
    }
  }

  handlePlayingHover(e) {
    const { song, audio } = this.props;
    const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    const currentTime = document.querySelector(`#waveform-time-${song.id} > div:first-child`);
    const waveformWidth = document.querySelector('.waveform-progress-full').offsetWidth;
    const mousePosition = e.nativeEvent.offsetX;
    const songPosition = (audio.currentSong.currentTime / song.duration) * waveformWidth;
    const time = Math.floor((mousePosition / e.target.offsetWidth) * song.duration);
    currentTime.innerHTML = convertSecsToMins(time);
    const widthDiff = mousePosition - songPosition;
    if (widthDiff > 0) {
      progressDiv.style.width = `${songPosition}px`;
      playingProgressDiv.style.width = `${widthDiff}px`;
      playingProgressDiv.scrollLeft = songPosition;
    } else {
      progressDiv.style.width = `${mousePosition}px`;
      playingProgressDiv.style.width = `${-widthDiff}px`;
      playingProgressDiv.scrollLeft = mousePosition;
    }
  }

  render() {
    const { song, waveformWidth } = this.props;

    return (
      <div
        id={`waveform-progress-full-${song.id}`}
        className='waveform-progress-full'
        onMouseMove={this.handlePlayingHover}
      >
        <div
          id={`waveform-progress-${song.id}`} className='waveform-progress'
        >
          <img
            id={`waveform-progress-img-${song.id}`} className='waveform-progress-img'
            src={song.waveform} alt="waveform"
            width={`${waveformWidth}px`}
            style={{ filter: 'invert(17%) sepia(86%) saturate(6300%) hue-rotate(330deg) brightness(80%) contrast(99%)', width: `${waveformWidth}px` }}
          />
        </div>
        <div
          id={`waveform-progress-playing-${song.id}`} className='waveform-progress-playing'
        >
          <img
            id={`waveform-progress-playing-img-${song.id}`} className='waveform-progress-playing-img'
            src={song.waveform} alt="waveform"
            width={`${waveformWidth}px`}
            style={{ filter: 'invert(21%) sepia(62%) saturate(1084%) hue-rotate(305deg) brightness(95%) contrast(89%)', width: `${waveformWidth}px` }}
        />
        </div>
      </div>
    )
  }
```

This is component is aligned on top of the default waveform image, which changes in width in response to song progress/mouse over. To me, it's almost sort of a trick of a waveform because it's really just images stacked on top of each other, but I like how it turned out.

## Fully Connected Global Audio Player

AudioPuff has five different types of audio players of varying complexity, and in order to improve overall site performance, I decided to have each audio player essentially be a glorified play button for the central audio player fixed at the bottom of the screen.

![homepage](https://github.com/glenpark00/AudioPuff/blob/master/app/assets/images/homepage.png)

This was possible due to the way my Redux state was set up to handle streaming. The state would only keep record of the current song, and would fetch next song information only when needed. The streaming is fully capable of sophisticated continous listening, as song containers are smartly set up to determine the next song. The most complicated of those song containers is the carousel I made for songs that I also expanded to artists: 

![carousel](https://github.com/glenpark00/AudioPuff/blob/master/app/assets/images/carousel.gif)

```
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
    const songIds = songs ? songs.map(song => song.id) : [];

    return (
      <div className='songs-carousel-buttons' key={this.id}>
        {this.state.position > 0 ? this.scrollButton('left') : null}
        <div className='songs-carousel-container'>
          <div id={`songs-carousel-${this.id}`} className='songs-carousel'>
            {type === 'songs' ? 
              songs.map(song => {
                const user = users[song.userUrl];
                return <CarouselItem song={song} songIds={songIds} user={user} key={`${song.id}-${this.id}`} />
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
```

It makes use of the HTML scrollLeft property to scroll the container on button press, as well as have a little "peek-out" animation on button hover.

## Full User Experience

User authentication is seemless and hassle-free; users only need to give an email, password, and age. The rest of the information can be edited later, including the URL of the users profile page, allowing for easy sharing across the web. Song uploads are equally painless, and song URLs can also be edited. Aside from streaming, users can also like songs and follow their favorite artists. 

## To-Do
- Comments and Reposts
- Playlists

## Contact

[LinkedIn](https://www.linkedin.com/in/glen-park/)
