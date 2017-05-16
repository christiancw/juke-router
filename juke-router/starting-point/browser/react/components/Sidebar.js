import React from 'react';
import {Router, Link} from 'react-router';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to="/albums">
            ALBUMS
          </Link>
        </h4>
          <section>
        <h4 className="menu-item">
          <Link to={'/artists'}>ARTISTS</Link>
        </h4>
        </section>
      </section>
    </sidebar>
  );
}

export default Sidebar;
