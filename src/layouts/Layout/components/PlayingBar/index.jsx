
import BrandingWatermarkOutlinedIcon from '@material-ui/icons/BrandingWatermarkOutlined';
import DevicesIcon from '@material-ui/icons/Devices';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { message, Slider } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getPlaybackState, SET_PLAYING, SET_SETTINGS, SET_TIME_TRACK } from 'store/slice/player';
import { title } from 'utils/constants';
import convertTime from 'utils/convertTime';
import styles from "./styles.module.scss";

function getVolumeIcon(volume) {
  if (volume >= 50) return <VolumeUpIcon />;
  if (volume > 0) return <VolumeDownIcon />
  return <VolumeMuteIcon />
}

export default function PlayingBar() {
  const { isPlaying, settings, playingTrack, time } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const handleChangePlayback = value => {
    audioRef.current.currentTime = value;
    if (!isPlaying) handleClickPlay();
  }

  const handleClickPlay = () => {
    if (!playingTrack) return message.warning("There are no song available right now!");
    if (!playingTrack?.preview_url) return message.warning("This song doesn't have preview!");
    if (isPlaying) { audioRef.current.pause(); }
    else audioRef.current.play()
    dispatch(SET_PLAYING())
  }
  const handleLoadedPreviewSong = () => {
    audioRef.current.volume = settings.volume / 100;
    dispatch(SET_TIME_TRACK({ duration: audioRef.current.duration, current: 0 }))
    if (isPlaying) audioRef.current.play()
  }
  const handleTimeUpdateSong = () => {
    dispatch(SET_TIME_TRACK({ current: Math.round(audioRef.current.currentTime) }))
  }
  const handleEndedSong = () => {
    if (settings.repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    else handleClickPlay();
  }
  const handleChangeVolume = (value) => {
    audioRef.current.volume = value / 100;
    dispatch(SET_SETTINGS({ type: "volume", value }))
  }
  const handleClickShuffle = () => {
    dispatch(SET_SETTINGS({ type: "shuffle" }))
  }
  const handleClickRepeat = () => {
    dispatch(SET_SETTINGS({ type: "repeat" }))
  }

  useEffect(() => {
    dispatch(getPlaybackState())
  }, [dispatch])
  useEffect(() => {
    if (playingTrack?.name) document.title = `${title} | ${playingTrack.name}`;
  }, [playingTrack])

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        {playingTrack && <>
          <img src={playingTrack?.album?.image || "https://via.placeholder.com/56"} alt="Not found" width={56} />
          <div className={styles.song}>
            <div><Link to={`/album/${playingTrack?.album.id}`}>{playingTrack?.name}</Link></div>
            <div>{playingTrack?.artists.map(item =>
              <span key={item.id}>
                <Link to={`/artist/${item.id}`}>{item.name.substring(0, 30)}</Link>
              </span>
            )}
            </div>
          </div>
          <FavoriteBorderIcon />
          <BrandingWatermarkOutlinedIcon />
        </>}
      </div>
      <div className={styles.player_control}>
        <div className={styles.player_control_btns}>
          <div
            onClick={handleClickShuffle}
            className={settings.shuffle ? styles.player_control_active : ""}
          >
            <ShuffleIcon />
          </div>
          <div><SkipPreviousIcon /></div>
          <div
            onClick={handleClickPlay}
            className={styles.player_control_play}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </div>
          <div><SkipNextIcon /></div>
          <div
            onClick={handleClickRepeat}
            className={settings.repeat === 1 ? styles.player_control_active : settings.repeat === 2 ? styles.player_repeat_track : ""}
          >
            <RepeatIcon />
          </div>
        </div>
        <div className={styles.playback}>
          <div className={styles.playback_time}>{convertTime(time?.current || 0)}</div>
          <Slider
            value={time?.current || 0} min={0} max={time?.duration || 100}
            tipFormatter={convertTime} step={1}
            className={styles.playback_progress} onChange={handleChangePlayback}
          />
          <div className={styles.playback_time}>-{convertTime((time?.duration - time?.current) || 0)}</div>
        </div>
      </div>
      <div className={styles.subcontainer}>
        <PlaylistPlayIcon />
        <DevicesIcon />
        {getVolumeIcon(settings.volume)}
        <Slider min={0} max={100} value={settings.volume} className={styles.volume}
          onChange={handleChangeVolume} />
      </div>
      <audio
        ref={audioRef}
        src={playingTrack?.preview_url}
        onTimeUpdate={handleTimeUpdateSong}
        onLoadedData={handleLoadedPreviewSong}
        onEnded={handleEndedSong}
      />
    </div >
  )
}
