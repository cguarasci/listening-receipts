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
      username: ""
    };
  }

  async componentDidMount() {
    try {
      const tracks = await Spotify.getRecentlyPlayedTracks();
      const analysis = Analysis.analyzeTracks(tracks);
      const username = await Spotify.getUsername();
      this.setState({ tracks, analysis, username });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <Logout />
        <p>Printing your receipt! Click above to logout.</p>
        <Receipt username={this.state.username} tracks={this.state.tracks} analysis={this.state.analysis} />
      </div>
    )
  }
}

export default App;
