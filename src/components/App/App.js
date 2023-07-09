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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
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
      </div>
    );
  }
}

export default App;
