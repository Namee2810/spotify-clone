import Layout from 'layouts/Layout';
import React from 'react';
import FeaturedPlaylists from './components/FeaturedPlaylists';
import RecentlyPlayed from './components/RecentlyPlayed';
import styles from "./styles.module.scss";

function getTimeOfDay() {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) return "morning";
  if (hours >= 12 && hours < 18) return "afternoon";
  return "evening"
}

export default function HomePage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className="text-welcome mb-16">Good {getTimeOfDay()}</div>
        <RecentlyPlayed />
        <FeaturedPlaylists />
      </div>
    </Layout>
  )
}
