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

Because SoundCloud seems to have taken down the only article about how their waveforms work, I decided to get creative and see if I could implement a interactive and responsive waveform visualizer purely in vanilla JavaScript. First, I made use of the built-in browser [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) interface to decode and convert a music file into sampled normalized sound data. This data is used to draw a set of bars on a canvas element, which is converted into a URL and stored in the database at the time of a song's creation. 
