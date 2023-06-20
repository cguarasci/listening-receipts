import React from 'react';
import Spotify from '../../util/Spotify';

class Logout extends React.Component {
  handleLogout = () => {
    Spotify.logout();
  }

  render() {
    return (
      <div className="Logout">
        <div style={{ margin: "0px" }}>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Logout;
