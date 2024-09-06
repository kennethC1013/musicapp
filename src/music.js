const music = {
    tracks: [
        {
            id: 1,
            name: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours"
        },
        {
            id: 2,
            name: "Watermelon Sugar",
            artist: "Harry Styles",
            album: "Fine Line"
        },
        {
            id: 3,
            name: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia"
        },
        {
            id: 4,
            name: "Circles",
            artist: "Post Malone",
            album: "Hollywood's Bleeding"
        },
        {
            id: 5,
            name: "Good 4 U",
            artist: "Olivia Rodrigo",
            album: "SOUR"
        },
        {
            id: 6,
            name: "Vampire",
            artist: "Olivia Rodrigo",
            album: "GUTS"
        },
        {
            id: 7,
            name: "BLOOD.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 8,
            name: "DNA.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 9,
            name: "YAH.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 10,
            name: "ELEMENT.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 11,
            name: "FEEL.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 12,
            name: "LOYALTY. (feat. Rihanna)",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 13,
            name: "PRIDE.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 14,
            name: "HUMBLE.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 15,
            name: "LUST.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 16,
            name: "LOVE. (feat. Zacari)",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 17,
            name: "XXX. (feat. U2)",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 18,
            name: "FEAR.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 19,
            name: "GOD.",
            artist: "Kendrick Lamar",
            album: "DAMN."
        },
        {
            id: 20,
            name: "DUCKWORTH.",
            artist: "Kendrick Lamar",
            album: "DAMN."
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
