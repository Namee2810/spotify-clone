import Logo from 'components/Logo';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn } from 'store/slice/user';
import { title } from 'utils/constants';
import { getTokenFromUrl, loginUrl } from 'utils/spotify';
import styles from "./styles.module.scss";

export default function SignInPage() {
  const dispatch = useDispatch();
  const signInLoading = useSelector(state => state.user.signInLoading);
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    if (localStorage.getItem("token")) return dispatch(signIn(localStorage.getItem("token")))
    document.title = `${title} | Sign in `;
    const hash = getTokenFromUrl();
    window.location.hash = ""

    const _token = hash.access_token;
    if (_token) {
      localStorage.setItem("token", _token);
      dispatch(signIn(_token))
    }
  }, [dispatch])

  const handleClickLogin = () => {
    if (signInLoading) return;
    window.location.href = loginUrl
  }

  return (
    <div className={styles.container}>
      {token && <Redirect to="/" />}
      <Logo />
      <button className={styles.signInBtn} onClick={handleClickLogin}>
        {!signInLoading ? "SIGN WITH SPOTIFY" : <div className={styles.spinner} />}</button>
    </div>
  )
}
