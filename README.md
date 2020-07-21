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

![waveform](https://github.com/glenpark00/AudioPuff/blob/master/app/assets/images/waveform.png)

The visualizer is constructed of three versions of the canvas image, each colored with a different filter. The three versions are used for displaying progress, time left, and a hover effect. As a song plays, all three images adjust their widths accordingly, and users can click on any part of the waveform to go to the corresponding timestamp.

## Fully Connected Global Audio Player

AudioPuff has five different types of audio players of varying complexity, and in order to improve overall site performance, I decided to have each audio player essentially be a glorified play button for the central audio player fixed at the bottom of the screen.

![homepage](https://github.com/glenpark00/AudioPuff/blob/master/app/assets/images/homepage.png)

This was possible due to the way my Redux state was set up to handle streaming. The state would only keep record of the current song, and would fetch next song information only when needed. The streaming is fully capable of sophisticated continous listening, as song containers are smartly set up to determine the next song. 

## Full User Experience

User authentication is seemless and hassle-free; users only need to give an email, password, and age. The rest of the information can be edited later, including the URL of the users profile page, allowing for easy sharing across the web. Song uploads are equally painless, and song URLs can also be edited. Aside from streaming, users can also like songs and follow their favorite artists. 

## To-Do
- Comments and Reposts
- Playlists

## Contact

[LinkedIn](https://www.linkedin.com/in/glen-park/)
