import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from 'react';
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
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <Image src={require("public/images/spotify.svg")} height={40} width={40} />
          <div className={styles.logo_name}>Spotify</div>
        </a>
      </Link>
      <div className={styles.navigation}>
        {
          navigationList.map((item, idx) => <Link href={item.href} key={idx}>
            <a className={[styles.navigation_item, router.pathname === item.href ? styles.navigation_active : null].join(" ")}>
              <div className={styles.navigation_icon}>{item.icon}</div>
              <div className={styles.navigation_title}>{item.title}</div>
            </a>
          </Link>)
        }
      </div>
      <div className={styles.navigation}>
        {
          featureList.map((item, idx) => <Link href={item.href} key={idx}>
            <a className={[styles.navigation_item, router.pathname === item.href ? styles.navigation_active : null].join(" ")}>
              <div className={styles.navigation_icon}>{item.icon}</div>
              <div className={styles.navigation_title}>{item.title}</div>
            </a>
          </Link>)
        }
      </div>
      <div className={styles.playlist}>
        {
          playlist.map((item, idx) => <Link href={item.href} key={idx}>
            <a className={styles.playlist_item}>{item.title}</a>
          </Link>)
        }
      </div>
    </div >
  )
}
