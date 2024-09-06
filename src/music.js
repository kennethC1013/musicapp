const music = {
    tracks: [
        {
            id: 1,
            name: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            uri: "spotify:track:1BlindingLightsURI"
        },
        {
            id: 2,
            name: "Watermelon Sugar",
            artist: "Harry Styles",
            album: "Fine Line",
            uri: "spotify:track:2WatermelonSugarURI"
        },
        {
            id: 3,
            name: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            uri: "spotify:track:3LevitatingURI"
        },
        {
            id: 4,
            name: "Circles",
            artist: "Post Malone",
            album: "Hollywood's Bleeding",
            uri: "spotify:track:4CirclesURI"
        },
        {
            id: 5,
            name: "Good 4 U",
            artist: "Olivia Rodrigo",
            album: "SOUR",
            uri: "spotify:track:5Good4UURI"
        },
        {
            id: 6,
            name: "Vampire",
            artist: "Olivia Rodrigo",
            album: "GUTS",
            uri: "spotify:track:6VampireURI"
        },
        {
            id: 7,
            name: "BLOOD.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:7BLOODURI"
        },
        {
            id: 8,
            name: "DNA.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:8DNAURI"
        },
        {
            id: 9,
            name: "YAH.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:9YAHURI"
        },
        {
            id: 10,
            name: "ELEMENT.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:10ELEMENTURI"
        },
        {
            id: 11,
            name: "FEEL.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:11FEELURI"
        },
        {
            id: 12,
            name: "LOYALTY. (feat. Rihanna)",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:12LOYALTYURI"
        },
        {
            id: 13,
            name: "PRIDE.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:13PRIDEURI"
        },
        {
            id: 14,
            name: "HUMBLE.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:14HUMBLEURI"
        },
        {
            id: 15,
            name: "LUST.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:15LUSTURI"
        },
        {
            id: 16,
            name: "LOVE. (feat. Zacari)",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:16LOVEURI"
        },
        {
            id: 17,
            name: "XXX. (feat. U2)",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:17XXXURI"
        },
        {
            id: 18,
            name: "FEAR.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:18FEARURI"
        },
        {
            id: 19,
            name: "GOD.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:19GODURI"
        },
        {
            id: 20,
            name: "DUCKWORTH.",
            artist: "Kendrick Lamar",
            album: "DAMN.",
            uri: "spotify:track:20DUCKWORTHURI"
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
