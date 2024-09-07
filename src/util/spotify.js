const clientId = '10a58e5cf48c4d01935946a1f4a3c649';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        //Return the token if it's already available
        if (accessToken) {
            return accessToken
        }

        // Check if the access token is in the URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);


        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Clear accessToken after it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);

            // Clean up the URL
            window.history.replaceState({}, null, '/');

            return accessToken;
        } else {
            //Redirect to SPotify authorization if no token found
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=5`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        try {
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        } catch (error) {
            console.error('Error fetching search results', error);
            return [];
        }
    }
}

export default Spotify