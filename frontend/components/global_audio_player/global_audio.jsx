import React from 'react';
import GlobalAudioPlayer from './global_audio_player';

const GlobalAudio = ({ audio, displayPlayer, users, playAudio, pauseAudio, changeCurrentTime, fetchCurrentSongFileUrl }) => {
  if (!displayPlayer) return null;

  return (
    <GlobalAudioPlayer
      audio={audio} 
      displayPlayer={displayPlayer}
      users={users}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      changeCurrentTime={changeCurrentTime} 
      fetchCurrentSongFileUrl={fetchCurrentSongFileUrl} />
  )
}

export default GlobalAudio;