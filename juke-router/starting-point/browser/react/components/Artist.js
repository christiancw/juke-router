import React from 'react';
import {Router, Link} from 'react-router';
import axios from 'axios';
import Albums from './Albums';
import Utils, {convertAlbums, convertSong} from '../utils';
import Songs from './Songs';

// const Artist = (props) => {
export default class Artist extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedArtist: {},
			artistAlbums: [],
			artistSongs: []
		}
	}


	componentDidMount() {
		const artistId = this.props.routeParams.artistId;

		Promise.all([(axios.get(`/api/artists/${artistId}`)
					.then(res => res.data)),
					(axios.get(`/api/artists/${artistId}/albums`)
					.then(res => res.data)),
					(axios.get(`/api/artists/${artistId}/songs`)
					.then(artistSongData => artistSongData.data))])
		.then( threePromises => {
				this.setState({
					artistSongs: threePromises[2].map(convertSong),
					artistAlbums: threePromises[1],
					selectedArtist: threePromises[0]
				})
		}).catch(console.error)
	}

	render() {
		return (<div>
				  <h3>{this.state.selectedArtist.name}</h3>

				  <h4>
				  <Albums albums={convertAlbums(this.state.artistAlbums)} />
				  </h4>

				  <h4>
				  <Songs songs={this.state.artistSongs}
				    currentSong={this.props.currentSong}
        			isPlaying={this.props.isPlaying}
        			toggleOne={this.props.toggleOne} />
				  </h4>
				</div>)
	}

}
