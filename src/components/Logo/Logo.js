import React from 'react';
import Tilty from 'react-tilty';
import ImageLogo from './waving.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilty className='center' scale='1.2' 
        style={
          {
            position: 'relative',
            width: '200px',
            height: '200px',
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)', 
          }
        }>
        <div>
          <img src={ImageLogo} alt="logo"/> 
        </div>
      </Tilty>
    </div>
  );
}

export default Logo;