const clientId = 'a4c7f9b5f41b4581a13e0812a8dfa8b4';
const redirect_uri = 'http://127.0.0.1:3000';
const scopes = 'user-read-recently-played';
let accessToken;

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest('SHA-256', data);
}

function base64encode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const Spotify = {
	async getAccessToken() {
		if (accessToken) return accessToken;

		const params = new URLSearchParams(window.location.search);
		const code = params.get('code');

		if (!code) {
		const verifier = crypto.randomUUID() + crypto.randomUUID();
		localStorage.setItem('verifier', verifier);

		const challenge = base64encode(await sha256(verifier));

		window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}&code_challenge_method=S256&code_challenge=${challenge}`;
		return;
		}

		const verifier = localStorage.getItem('verifier');

		const body = new URLSearchParams({
		client_id: clientId,
		grant_type: 'authorization_code',
		code,
		redirect_uri,
		code_verifier: verifier,
		});

		const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
		});

		const data = await response.json();

		console.log(response.status);
		console.log(data);

		accessToken = data.access_token;
		window.history.replaceState({}, '', '/');

		return accessToken;
	},

	logout() {
		accessToken = null;
		window.history.pushState('Access Token', null, '/');
		window.location = 'https://accounts.spotify.com/logout';
		Spotify.getAccessToken();
	},

	async getUsername() {
		const accessToken = await Spotify.getAccessToken();
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
		const accessToken = await this.getAccessToken();
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

	async getGenre(artistId) {
		const accessToken = await Spotify.getAccessToken();
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
	  
	async getRecentlyPlayedTracks() {
		const accessToken = await Spotify.getAccessToken();
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
				  url: track.uri
				};
			  }
			}
			return Object.values(trackMap);
		});
	}
};

export default Spotify;