import React, { Component } from 'react';
import './App.css';
import Logout from '../Logout/Logout';
import Receipt from '../Receipt/Receipt';
import Spotify from '../../util/Spotify';
import Analysis from '../../util/Analysis';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      analysis: [],
      username: "",
      isLoading: true,
    };
    this.printRef = React.createRef();
  }

  async componentDidMount() {
    try {
      const tracks = await Spotify.getRecentlyPlayedTracks();
      const analysis = await Analysis.analyzeTracks(tracks);
      const username = await Spotify.getUsername();
      this.setState({ tracks, analysis, username, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  handlePrintComplete = () => {
    console.log('Receipt printed!');
  };

  render() {
    const { tracks, analysis, username, isLoading } = this.state;

    return (
      <div>
        <Logout />
        <p>Instructions</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Receipt
              printRef={this.printRef}
              username={username}
              tracks={tracks}
              analysis={analysis}
              isLoading={isLoading}
              onPrintComplete={this.handlePrintComplete}
            />
          </div>
        )}
        <a href="https://www.spotify.com" alt="Spotify Link"><img className="spotify-logo" width="100px" src={process.env.PUBLIC_URL + "/assets/spotify_logo.png"} alt="Spotify Logo" /></a>
      </div>
    );
  }
}

export default App;
