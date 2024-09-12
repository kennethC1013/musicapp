const clientId = '10a58e5cf48c4d01935946a1f4a3c649';
const redirectUri = 'http://localhost:3000/';
let accessToken;
let tokenExpirationTime;

const Spotify = {
   async getAccessToken() {
        //Return the token if it's already available and not expired
        if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
            return accessToken
        }

        // Check if the access token is in the URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);


        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            tokenExpirationTime = Date.now() + expiresIn * 1000

            // Clean up the URL
            window.history.replaceState({}, null, '/');

            return accessToken;
        } else {
            //Redirect to SPotify authorization if no token found
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
            return null;
        }
    },
    async search(term) {
        const accessToken = await Spotify.getAccessToken();
        if (!accessToken) {
            console.error('Access Token not available.');
            return [];
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=5`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch search results.');
            }
            const jsonResponse = await response.json();
            
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                albumCover: track.album.images[0].url,
                uri: track.uri
            }));
        } catch (error) {
            console.error('Error during search:', error);
        }
    },
    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            console.error('Name or track URIs are missing.')
            return;
        }

        const accessToken = await Spotify.getAccessToken();
        if (!accessToken) {
            console.error('Access Token not available.')
        }

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }

        try {
            const userResponse = await fetch('https://api.spotify.com/v1/me', { headers: headers });
            if (!userResponse.ok) {
                throw new Error('Failed to fetch user info.')
            }

            const userJson = await userResponse.json();
            const userId = userJson.id;

            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    description: 'New playlist created from app',
                    public: true
                })
            });
            if (!playlistResponse.ok) {
                throw new Error('Failed to create playlist')
            }

            const playlistJson = await playlistResponse.json();
            const playlistId = playlistJson.id;

            const trackResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris })
            });
            if (!trackResponse.ok) {
                throw new Error('Failed to add tracks to playlist')
            }

            console.log('Playlist created and tracks uploaded successfully.');
        } catch (error) {
            console.error('Error saving playlist:', error);
        }
    }
}
export default Spotify