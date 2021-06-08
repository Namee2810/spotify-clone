import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';
import Logo from 'components/Logo';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getUserPlaylist } from 'store/slice/user';
import styles from "./styles.module.scss";

const navigationList = [
  { icon: <HomeIcon />, title: "Home", href: "/" },
  { icon: <SearchIcon />, title: "Search", href: "/search" },
  { icon: <LibraryMusicIcon />, title: "Your Library", href: "/collection" },
]
const featureList = [
  { icon: <AddBoxIcon />, title: "Create Playlist", href: "/playlist" },
  { icon: <FavoriteIcon />, title: "Liked Songs", href: "/collection/tracks" },
]

export default function Nav() {
  const dispatch = useDispatch();
  const userPlaylist = useSelector(state => state.user.playlist);

  useEffect(() => {
    dispatch(getUserPlaylist())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <a href="/" style={{ paddingLeft: "10px" }}>
        <Logo />
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
          userPlaylist.map((item, idx) =>
            <Link to={`/playlist/${item.id}`} key={item.id}
              className={styles.playlist_item}>{item.name}
            </Link>
          )
        }
      </div>
    </div >
  )
}
