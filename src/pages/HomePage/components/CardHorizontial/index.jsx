import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import styles from "./styles.module.scss";

export default function CardHorizontial({ item }) {

  return (
    <div className={styles.cardHorizontial}>
      <div className={styles.cardHorizontial_image}
        style={{ backgroundImage: `url(${item.track.album.images[1].url})` }}
      />
      <div className={styles.cardHorizontial_content}>
        <div className={styles.cardHorizontial_title}>{item.track.album.name}</div>
        <div className={styles.cardHorizontial_play}><PlayArrowIcon /></div>
      </div>
    </div>
  )
}
