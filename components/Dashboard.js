import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import styles from "../styles/Home.module.css";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "../components/TrackRender";
import Player from "../components/Player";

const spotifyApi = new SpotifyWebApi({
	clientId: "7f16edd9e41e45b79bcc064c4a02717d",
});
const dashboard = ({ code }) => {
	const [results, setResults] = useState([]);
	const [trackUri, setTrackUri] = useState();
	const accessToken = useAuth(code);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);
	const lookUp = async (song) => {
		let cancel = false;
		if (!song) return setResults([]);
		if (!accessToken) return setResults([]);
		const resultss = await spotifyApi.searchTracks(song);
		if (cancel) return;

		setResults(
			resultss.body.tracks.items.map((track) => {
				const smallestAlbumImage = track.album.images.reduce(
					(smallest, image) => {
						if (image.height < smallest.height) return image;
						return smallest;
					},
					track.album.images[0]
				);
				return {
					artist: track.artists[0].name,
					title: track.name,
					uri: track.uri,
					albumUrl: smallestAlbumImage.url,
				};
			})
		);
		return () => (cancel = true);
	};
	console.log(results);

	return (
		<div>
			<div className={styles.inputContainer}>
				<input
					type="text"
					className={styles.songInput}
					onChange={(e) => lookUp(e.target.value)}
					placeholder="Song name"
				/>
			</div>
			<div className={styles.songsSection}>
				{results.map((track) => {
					return <Track onclick={setTrackUri(track.uri)} track={track} key={track.uri} />;
				})}
			</div>
			<div>
				<Player accessToken={accessToken} trackUri={trackUri}/>
			</div>
		</div>
	);
};

export default dashboard;
