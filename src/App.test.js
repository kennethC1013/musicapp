import React from "react";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "./components/App/App.js";
import Spotify from "./util/spotify";

jest.mock('./util/Spotify', () => ({
    search: jest.fn(),
    savePlaylist: jest.fn()
}));

describe('App Component', () => {
    beforeEach(() => {
        Spotify.search.mockClear();
        Spotify.savePlaylist.mockClear();
    });

    //Search track test

    const searchAndAddTrack = async (trackName) => {
        fireEvent.change(screen.getByPlaceholderText(/Enter a song/i), { target: { value: 'Test' } });
        fireEvent.click(screen.getByRole('button', { name: /Search/i }))

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
        });
        
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));
       
    };

    it('Searches songs when the search function is called', async () => {
        Spotify.search.mockResolvedValue([{ id: 'A1', name: 'Test Song', artist: 'Test Artist' }]);

        render(<App />)

        fireEvent.change(screen.getByPlaceholderText(/Enter a song/i), { target: { value: 'Test' } });
        fireEvent.click(screen.getByRole('button', { name: /Search/i }));

        await waitFor(() => {
            expect(Spotify.search).toHaveBeenCalledWith('Test');
            expect(screen.getByText(/Test Song/i)).toBeInTheDocument();
        });
    });
    it('Adds a track to the playlist when the add button is clicked', async () => {

        render(<App />)

        await searchAndAddTrack('Test');

        const testSongsElements = screen.getAllByText(/Test Song/i);
        expect(testSongsElements).toHaveLength(2);
    });
    it('Removes a track from the playlist when the remove button is clicked', async () => {
        
        render(<App />)
        
        await searchAndAddTrack('Test');

        const testSongElements = screen.getAllByText(/Test Song/i);
        expect(testSongElements).toHaveLength(2);

        fireEvent.click(screen.getByRole('button', { name: /Remove/i }));

        await waitFor(() => {
            const updatedTestSongElement = screen.queryAllByText(/Test Song/i);
            expect(updatedTestSongElement).toHaveLength(1);
        });
    });
    it('Does not add duplicate tracks to the playlist', async () => {

        render(<App />)
        
        await searchAndAddTrack('Test');
        await searchAndAddTrack('Test');

        const testSongElements = screen.getAllByText(/Test Song/i);
        expect(testSongElements).toHaveLength(2)
    })
});
