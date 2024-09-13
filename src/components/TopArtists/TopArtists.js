import React from "react"

export default function TopArtists({ artists }) {

    return (
        <div>
        {artists.length > 0 ? (
          artists.map((artist) => (
            <div key={artist.id}>
              <img src={artist.imageUrl} alt={artist.name} />
              <p>{artist.name}</p>
            </div>
          ))
        ) : (
          <p>No favorite artists found.</p>
        )}
      </div>
    )
}