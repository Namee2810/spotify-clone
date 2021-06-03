import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';
import SpotifySVG from "assets/images/spotify.svg";
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from "./styles.module.scss";

const navigationList = [
  { icon: <HomeIcon />, title: "Trang chủ", href: "/" },
  { icon: <SearchIcon />, title: "Tìm kiếm", href: "/search" },
  { icon: <LibraryMusicIcon />, title: "Thư viện", href: "/collection" },
]
const featureList = [
  { icon: <AddBoxIcon />, title: "Tạo playlist", href: "/playlist" },
  { icon: <FavoriteIcon />, title: "Bài hát đã thích", href: "/collection/tracks" },
]
const playlist = [
  { title: "Playlist 1", href: "/playlist" },
  { title: "Playlist 2", href: "/playlist" },
  { title: "Playlist 3", href: "/playlist" },
  { title: "Playlist 4", href: "/playlist" },
  { title: "Playlist 5", href: "/playlist" },
]

export default function Nav() {

  return (
    <div className={styles.container}>
      <a className={styles.logo} href="/">
        <img src={SpotifySVG} height={40} width={40} alt="not found" />
        <div className={styles.logo_name}>Spotify</div>
      </a>
      <div className={styles.navigation}>
        {
          navigationList.map((item, idx) =>
            <NavLink to={item.href} key={idx}
              className={styles.navigation_item}
              activeClassName={styles.navigation_active}
            >
              <div className={styles.navigation_icon}>{item.icon}</div>
              <div className={styles.navigation_title}>{item.title}</div>
            </NavLink>
          )
        }
      </div>
      <div className={styles.navigation}>
        {
          featureList.map((item, idx) =>
            <Link to={item.href} key={idx}
              className={styles.navigation_item}
            >
              <div className={styles.navigation_icon}>{item.icon}</div>
              <div className={styles.navigation_title}>{item.title}</div>
            </Link>
          )
        }
      </div>
      <div className={styles.playlist}>
        {
          playlist.map((item, idx) =>
            <Link to={item.href} key={idx}
              className={styles.playlist_item}>{item.title}
            </Link>
          )
        }
      </div>
    </div >
  )
}
