const clientId = 'a4c7f9b5f41b4581a13e0812a8dfa8b4';
const redirect_uri = 'https://spotify-receipts.vercel.app';
const scopes = 'user-top-read user-read-recently-played';
let accessToken;

const Spotify = {
	getAccessToken() {
		console.log('URL:', window.location.href);
		if (accessToken) {
			return accessToken;
		}
	
		const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
	
		if (newAccessToken && newExpiresIn) {
			accessToken = newAccessToken[1];
			const expiresIn = Number(newExpiresIn[1]);
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&show_dialog=true&redirect_uri=${redirect_uri}`;
			window.location = accessUrl;
		}
	},

	logout() {
		accessToken = null;
		window.history.pushState('Access Token', null, '/');
		window.location = 'https://accounts.spotify.com/logout';
		Spotify.getAccessToken();
	},

	getUsername() {
		const accessToken = Spotify.getAccessToken();
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
	
		return fetch('https://api.spotify.com/v1/me', {
			headers: headers,
		})
		.then(
			(response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Request failed!');
			},
			(networkError) => {
				console.log(networkError.message);
			}
		)
		.then((jsonResponse) => {
			if (jsonResponse) {
				let username = jsonResponse.display_name;

				let printable = /^[\x20-\x7E\u00A0-\u00AC\u00B0-\u00B5\u00B7-\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]+$/;

				username = username.split('').filter(function(char) {
					return char.match(printable);
				}).join('');

				return username.trim();
			}
			return '';
		});
	},

	async getAudioFeatures(trackIds) {
		const accessToken = this.getAccessToken();
		const headers = {
		  Authorization: `Bearer ${accessToken}`
		};
		const trackIdsString = trackIds.join(',');
	
		const response = await fetch(`https://api.spotify.com/v1/audio-features/?ids=${trackIdsString}`, {
		  headers: headers
		});
	
		if (response.ok) {
		  const jsonResponse = await response.json();
		  return jsonResponse.audio_features; // return the audio feature information
		} else {
		  throw new Error('Request failed!');
		}
	},

	getGenre(artistId) {
		const accessToken = Spotify.getAccessToken();
		const headers = {
		  Authorization: `Bearer ${accessToken}`,
		};
	
		return fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
		  headers: headers,
		})
		  .then((response) => {
			if (response.ok) {
			  return response.json();
			}
			throw new Error('Request failed!');
		  })
		  .then((jsonResponse) => {
			if (jsonResponse && jsonResponse.genres) {
			  return jsonResponse.genres || ''; // Assuming the first genre is the primary genre
			}
			return '';
		  });
	},
	  
	getRecentlyPlayedTracks() {
		const accessToken = Spotify.getAccessToken();
		const streamingPrice = 0.003;
		const headers = {
		  Authorization: `Bearer ${accessToken}`,
		};
		return fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
		  headers: headers,
		})
		  .then(
			(response) => {
			  if (response.ok) {
				return response.json();
			  }
			  throw new Error('Request failed!');
			},
			(networkError) => {
			  console.log(networkError.message);
			}
		  )
		  .then(async (jsonResponse) => {
			if (!jsonResponse.items) {
			  return [];
			}
			let trackMap = {};
			for (const item of jsonResponse.items) {
			  const track = item.track;
			  const artistId = track.artists[0].id;
			  if (trackMap[track.id]) {
				trackMap[track.id].count += 1;
				trackMap[track.id].cost = +(streamingPrice * trackMap[track.id].count).toFixed(3);
			  } else {
				const genre = await Spotify.getGenre(artistId);
				trackMap[track.id] = {
				  count: 1,
				  id: track.id,
				  name: track.name,
				  artist: {
					name: track.artists[0].name,
					id: artistId,
				  },
				  genre: genre.join(" "),
				  cost: 0.003,
				};
			  }
			}
			return Object.values(trackMap);
		});
	}
};

export default Spotify;
