const Tracks = ({ track }) => {
	console.log(track);
	return (
		<div>
			<img src={track.albumUrl} height="100" width="100" styles={{cursor: 'pointer'}}/>
			<div>{track.title}</div>
			<div>{track.artist}</div>
		</div>
	);
};

export default Tracks;
