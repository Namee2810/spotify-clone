import React from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import PlayingBar from './components/PlayingBar';
import styles from "./styles.module.scss";

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Nav />
      <Main>{props.children}</Main>
      <PlayingBar />
    </div>
  )
}
