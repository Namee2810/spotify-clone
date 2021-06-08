import SpotifySVG from "assets/images/spotify.svg";
import React from 'react';
import styles from "./styles.module.scss";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={SpotifySVG} alt="Logo" width={40} />
      <div className={styles.logo_name}>Spotify</div>
    </div>
  )
}
