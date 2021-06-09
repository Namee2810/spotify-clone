import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentlyPlayed } from 'store/slice/user';
import CardHorizontial from '../CardHorizontial';
import styles from "./styles.module.scss";

export default function RecentlyPlayed() {
  const dispatch = useDispatch();
  const recentlyPlayed = useSelector(state => state.user.recentlyPlayed);

  useEffect(() => {
    dispatch(getUserRecentlyPlayed())
  }, [dispatch])
  return (
    <div className={styles.container}>
      {
        recentlyPlayed.map((item, idx) => <CardHorizontial key={idx} item={item} />)
      }
    </div>
  )
}
