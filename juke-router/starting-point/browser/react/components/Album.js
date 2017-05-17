import React from 'react';
import Songs from '../components/Songs';
import ReactDOM from 'react-dom';

export default class Album extends React.Component {
  componentDidMount(){
    const albumId = this.props.routeParams.albumId;
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);
}
  render() {
  const album = this.props.album
  const currentSong = this.props.currentSong
  const isPlaying = this.props.isPlaying
  const toggleOne = this.props.toggleOne
  // console.log(props);
  return (
    <div className="album">
      <div>
        <h3>{ album.name }</h3>
        <img src={ album.imageUrl } className="img-thumbnail" />
      </div>
      <Songs
        songs={album.songs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        toggleOne={toggleOne} />
    </div>);
  }
}
