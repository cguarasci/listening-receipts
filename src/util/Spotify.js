const clientId = 'a4c7f9b5f41b4581a13e0812a8dfa8b4';
const redirect_uri = 'http://localhost:3000/';
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
				return jsonResponse.display_name; // display_name is the property that holds the user's display name
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
			.then((jsonResponse) => {
				if (!jsonResponse.items) {
					return [];
				}
				let trackMap = {};
				jsonResponse.items.forEach((item) => {
					const track = item.track;
					if (trackMap[track.id]) {
						trackMap[track.id].count += 1;
						trackMap[track.id].cost = +(streamingPrice * trackMap[track.id].count).toFixed(3);
					} else {
						trackMap[track.id] = {
							count: 1,
							id: track.id,
							name: track.name,
							artist: {
								name: track.artists[0].name,
								id: track.artists[0].id
							},
							cost: 0.003
						}
					}
				});
				return Object.values(trackMap);
			});
	}
};

export default Spotify;
