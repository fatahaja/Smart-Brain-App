import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignin }) => {
    if (isSignin) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div className="btn ma3" onClick={() => onRouteChange('signout')}>
            <svg>
              <rect x="0" y="0" fill="none" width="166" height="45"/>
            </svg>
            sign out
          </div>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div className="btn ma3" onClick={() => onRouteChange('signin')}>
            <svg>
              <rect x="0" y="0" fill="none" width="166" height="45"/>
            </svg>
            sign in
          </div>
          <div className="btn ma3" onClick={() => onRouteChange('register')}>
            <svg>
              <rect x="0" y="0" fill="none" width="166" height="45"/>
            </svg>
            register
          </div>
        </nav>
      );
    }
}

export default Navigation;