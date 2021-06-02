import Main from 'components/Main';
import Nav from 'components/Nav';
import PlayingBar from 'components/PlayingBar';
import React from 'react';
import styles from "./styles.module.scss";

export default function Layout() {
  return (
    <div className={styles.container}>
      <Nav />
      <Main />
      <PlayingBar />
    </div>
  )
}
