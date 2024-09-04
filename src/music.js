const music = {
    tracks: [
        {
            id: "1a2b3c4d",
            name: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours"
        },
        {
            id: "2b3c4d5e",
            name: "Watermelon Sugar",
            artist: "Harry Styles",
            album: "Fine Line"
        },
        {
            id: "3c4d5e6f",
            name: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia"
        },
        {
            id: "4d5e6f7g",
            name: "Circles",
            artist: "Post Malone",
            album: "Hollywood's Bleeding"
        },
        {
            id: "5e6f7g8h",
            name: "Good 4 U",
            artist: "Olivia Rodrigo",
            album: "SOUR"
        },
        {
            id: "r8fT3bLp",
            name: "Vampire",
            artist: "Olivia Rodrigo",
            album: "GUTS"
        }
    ],

    search: (query) => {
        return music.tracks.filter(track =>
            track.name.toLowerCase().includes(query.toLowerCase()) ||
            track.artist.toLowerCase().includes(query.toLowerCase()) ||
            track.album.toLowerCase().includes(query.toLowerCase())
        );
    },
};

export default music;
