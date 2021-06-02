import LoopIcon from '@material-ui/icons/Loop';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import React, { useState } from 'react';
import convertTime from 'utils/convertTime';
import styles from "./styles.module.scss";

export default function PlayingBar() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({
    now: 28,
    length: 100
  })
  const [settings, setSettings] = useState({
    shuffle: false,
    loop: false
  })

  const control_btns = [
    {
      icon: <div className={settings.shuffle ? styles.player_control_active : ""}><ShuffleIcon /></div>,
      onClick: () => setSettings({ ...settings, shuffle: !settings.shuffle })
    },
    {
      icon: <SkipPreviousIcon />,
      onClick: () => { }
    },
    {
      icon: <div className={styles.player_control_play}>
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </div>,
      onClick: () => setPlaying(!playing)
    },
    {
      icon: <SkipNextIcon />,
      onClick: () => { }
    },
    {
      icon: <div className={settings.loop ? styles.player_control_active : ""}><LoopIcon /></div>,
      onClick: () => setSettings({ ...settings, loop: !settings.loop })
    }
  ]

  const handleChangePlayback = event => {
    const value = event.target.value;
    setTime({ ...time, now: value })
  }

  return (
    <div className={styles.container}>
      <p>Hi</p>
      <div className={styles.player_control}>
        <div className={styles.player_control_btns}>
          {
            control_btns.map((item, idx) =>
              <div key={idx}
                className={styles.player_control_btn}
                onClick={item.onClick}
              >{item.icon}</div>)
          }
        </div>
        <div className={styles.playback}>
          <div className={styles.playback_time}>{convertTime(time.now)}</div>
          <input
            type="range" min={0} max={time.length} step={1}
            value={time.now} onChange={handleChangePlayback}
            className={styles.playback_progress}
          />
          <div className={styles.playback_time}>{convertTime(time.length)}</div>
        </div>
      </div>
      <p>Hi</p>
    </div >
  )
}
