const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108
    },
    {
      trackId: "trk103",
      artist: "Lunar Arcade",
      title: "Midnight Frequency",
      votes: 4,
      bpm: 128
    }
  ],
  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115
    },
    {
      trackId: "trk202",
      artist: "Velvet Comet",
      title: "Satellite Hearts",
      votes: 6,
      bpm: 124
    }
  ]
];

function flattenPlaylists(arr) {
	const flattenedArray = [];

	if (Array.isArray(arr)) {
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				let track = arr[i][j];
				flattenedArray.push({
					trackId: track.trackId,
      		artist: track.artist,
      		title: track.title,
      		votes: track.votes,
      		bpm: track.bpm,
					source: [i, j],
				})
			}
		}
	}

	return flattenedArray;
}

function scoreTracks(arr) {
	const scoredTracks = [];

	for (let i = 0; i < arr.length; i++) {
		let track = arr[i];
		track.score = track.votes * 10 - Math.abs(track.bpm - 120);
		scoredTracks.push(track);
	}

	return scoredTracks;
}

function dedupeTracks(arr) {
	const dedupedArray = [];

	for (let i = 0; i < arr.length; i++) {
		const track = arr[i];
		if (!dedupedArray.some(t => t.trackId === track.trackId)) {
			dedupedArray.push(track)
		}
	}

	return dedupedArray;
}

function enforceArtistQuota(arr, quota) {
	const enforcedArray = [];
	const artists = {};
	for (let i = 0; i < arr.length; i++) {
		const artist = arr[i].artist;
		if (!artists[artist]) {
			artists[artist] = 1;
			enforcedArray.push(arr[i]);
		} else if (artists[artist] < quota){
			artists[artist] += 1;
			enforcedArray.push(arr[i]);
		}
	}

	return enforcedArray;
}

function buildSchedule(arr) {
	const trackSchedule = [];

	for (let i = 0; i < arr.length; i++) {
		trackSchedule.push(
			{
				slot: i + 1, 
				trackId: arr[i].trackId,
			}
		)
	}
	return trackSchedule;
}

function remixPlaylist(arr, quota) {
	const flattenedPlaylist = flattenPlaylists(arr);
	const scoredTracks = scoreTracks(flattenedPlaylist);
	const dedupedTracks = dedupeTracks(scoredTracks);
	const enforcedQuota = enforceArtistQuota(dedupedTracks, quota);
	const trackSchedule = buildSchedule(enforcedQuota);

	return trackSchedule;
}

console.log(remixPlaylist(playlists, 2));