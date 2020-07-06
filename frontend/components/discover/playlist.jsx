import React from 'react';
import PlayButton from '../play_button';
import { FaHeart } from 'react-icons/fa';

const Playlist = ({ songs, users }) => {

  return (
    <div>
      <div>
        <img src="" alt=""/>
        <PlayButton />
      </div>
      <div>
        { songs.map(song => {
          const user = users[song.userUrl];
          return (
            <div>
              <div>
                <div>{`${user.displayName} - `}</div>
                <div>{song.title}</div>
              </div>
              <div>
                <div>{<FaHeart />}</div>
                <div>{song.likers.length}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}