import React from 'react';
import ReactLoading from 'react-loading';

const LoadingScreen = () => (
  <div className='loading-screen-background'>
    <div className='loading-screen'>
      <ReactLoading type={"bars"} color={"#CE1141"} />
    </div>
  </div>
)

export default LoadingScreen;