import React, { Component } from 'react';
import './App.css';
import Logout from '../Logout/Logout';
import Receipt from '../Receipt/Receipt';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };

    this.getTracks =this.getTracks.bind(this);
  }

  componentDidMount() {
    this.getTracks();
  }

  getTracks() {
    Spotify.getRecentlyPlayedTracks().then((tracks) => {
      this.setState({ tracks });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {this.getTracks()}
        <Logout />
        <Receipt tracks={this.state.tracks} />
      </div>
    )
  }
}

export default App;
