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
					artistAlbums: convertAlbums(threePromises[1]),
					selectedArtist: threePromises[0]
				})
		}).catch(console.error)
	}

	render() {
		const selectedArtist = this.props.selectedArtist;
		const children = this.props.children;
		const propsToPassToChildren = {
			album: this.props.selectedAlbum,
			currentSong: this.props.currentSong,
			isPlaying: this.props.isPlaying,
			toggleOne: this.props.toggleOne,
			albums: this.state.artistAlbums,
			selectAlbum: this.props.selectAlbum,
			artists: this.props.artists,
			selectedArtist: this.props.selectedArtist,
			songs: this.state.artistSongs
		}

		return (
		<div>
		  <h3>{ selectedArtist.name }</h3>
		  <ul className="nav nav-tabs">
		    <li><Link to={`/artists/${this.state.selectedArtist.id}/albums`}>ALBUMS</Link></li>
		    <li><Link to={`/artists/${this.state.selectedArtist.id}/songs`}>SONGS</Link></li>
		  </ul>
		  { children && React.cloneElement(children, propsToPassToChildren) }
		</div>
		)
	}

}
