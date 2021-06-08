import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Dropdown, Menu } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT } from 'store/slice/user';
import { title } from 'utils/constants';
import styles from "./styles.module.scss";

export default function Main(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const handleClickSignOut = () => {
    dispatch(SIGN_OUT())
  }

  useEffect(() => {
    document.title = title
  }, [])

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="https://www.spotify.com/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account">
          Account
      </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/31v264d22wsj2ooavhvwqvi3ebay">
          Profile
      </a>
      </Menu.Item>
      <Menu.Item key="3">
        <div onClick={handleClickSignOut}>
          Sign out
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.navigationBtns}>
          <div className={styles.navigationBtn}>
            <ChevronLeftIcon />
          </div>
          <div className={styles.navigationBtn}>
            <ChevronRightIcon />
          </div>
        </div>
        <Dropdown overlay={userMenu} trigger="click">
          <button className={styles.user}>
            <img src={user.images[0].url} alt="avatar" width={28} />
            <span className={styles.user_name}>{user.display_name}</span>
          </button>
        </Dropdown>
      </div>
      {props.children}
    </div>
  )
}
