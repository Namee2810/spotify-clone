import BrandingWatermarkOutlinedIcon from '@material-ui/icons/BrandingWatermarkOutlined';
import DevicesIcon from '@material-ui/icons/Devices';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LoopIcon from '@material-ui/icons/Loop';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Slider } from 'antd';
import songSrc from "assets/song.mp3";
import React, { useRef, useState } from 'react';
import convertTime from 'utils/convertTime';
import styles from "./styles.module.scss";

function getVolumeIcon(volume) {
  if (volume >= 50) return <VolumeUpIcon />;
  if (volume > 0) return <VolumeDownIcon />
  return <VolumeMuteIcon />
}

export default function PlayingBar() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({
    current: 0,
    duration: 0
  })
  const [settings, setSettings] = useState({
    shuffle: false,
    loop: false,
    volume: 100
  })
  const [song, setSong] = useState({
    name: "bad guy",
    image: "https://via.placeholder.com/56",
    author: "Billie Eilish",
    like: false
  })
  const audioRef = useRef(null);

  const handleChangePlayback = value => {
    audioRef.current.currentTime = value;
    setTime({ ...time, current: value });
    if (!playing) handleClickPlay();
  }

  const handleClickPlay = () => {
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing)
  }
  const handleLoadedSong = () => {
    setTime({ current: 0, duration: audioRef.current.duration });
    console.log("loaded song");
  }
  const handleTimeUpdateSong = () => {
    setTime({ ...time, current: audioRef.current.currentTime })
  }
  const handleEndedSong = () => {
    if (settings.loop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setTime({ ...time, current: 0 })
    }
    else handleClickPlay();
  }
  const handleChangeVolume = (value) => {
    audioRef.current.volume = value / 100;
    setSettings({ ...setSettings, volume: value })
  }

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <img src={song.image} alt="Not found" />
        <div className={styles.song}>
          <div>{song.name}</div>
          <div>{song.author}</div>
        </div>
        <FavoriteBorderIcon />
        <BrandingWatermarkOutlinedIcon />
      </div>
      <div className={styles.player_control}>
        <div className={styles.player_control_btns}>
          <div
            onClick={() => setSettings({ ...settings, shuffle: !settings.shuffle })}
            className={settings.shuffle ? styles.player_control_active : ""}
          >
            <ShuffleIcon />
          </div>
          <div><SkipPreviousIcon /></div>
          <div
            onClick={handleClickPlay}
            className={styles.player_control_play}
          >
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </div>
          <div><SkipNextIcon /></div>
          <div
            onClick={() => setSettings({ ...settings, loop: !settings.loop })}
            className={settings.loop ? styles.player_control_active : ""}
          >
            <LoopIcon />
          </div>
        </div>
        <div className={styles.playback}>
          <div className={styles.playback_time}>{convertTime(time.current)}</div>
          <Slider
            value={time.current} min={0} max={time.duration}
            tipFormatter={convertTime} step={1}
            className={styles.playback_progress} onChange={handleChangePlayback}
          />
          <div className={styles.playback_time}>{convertTime(time.duration)}</div>
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
        src={songSrc}
        onTimeUpdate={handleTimeUpdateSong}
        onLoadedData={handleLoadedSong}
        onEnded={handleEndedSong}
      />
    </div >
  )
}
