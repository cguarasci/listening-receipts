import React from 'react';
import Spotify from '../../util/Spotify';
import './Logout.css';

class Logout extends React.Component {
  handleLogout = () => {
    Spotify.logout();
  }

  render() {
    return (
      <div className="Logout">
        <div style={{ margin: "0px" }}>
          <button className='logout-button' onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Logout;
