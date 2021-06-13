import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEW_TRACK } from 'store/slice/player';
import { getUserRecentlyPlayed } from 'store/slice/user';
import CardHorizontial from '../../../../components/CardHorizontial';
import styles from "./styles.module.scss";

export default function RecentlyPlayed() {
  const dispatch = useDispatch();
  const recentlyPlayed = useSelector(state => state.user.recentlyPlayed);

  const handleClickItem = (item) => {
    dispatch(SET_NEW_TRACK(item));
  }

  useEffect(() => {
    dispatch(getUserRecentlyPlayed())
  }, [dispatch])
  return (
    <div className={styles.container}>
      {
        recentlyPlayed.map((item, idx) => <CardHorizontial key={idx} item={item} onClick={handleClickItem} />)
      }
    </div>
  )
}
