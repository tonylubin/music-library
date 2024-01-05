import React, { useState, useRef, useEffect, useCallback } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import {
  BsPlayCircle,
  BsPauseCircle,
  BsSkipBackward,
  BsSkipForward,
} from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { motion, useMotionValue, useTransform } from "framer-motion";

const AudioPlayer = ({ trackData }) => {
  const { title, artist, album, genre, year, audio_url } = trackData;
  
  // player state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [trackLength, setTrackLength] = useState();
  const [playCount, setPlayCount] = useState(0);
  
  // useRef's - reference to html elements
  const audioPlayer = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // toggle button status - play/pause
  const handlePlay = () => {
    if (!playing) {
      setPlaying(true);
      setPlayCount(playCount + 1);
    } else {
      setPlaying(false);
    }
  };

  // skipping feature
  const skipForward = () => {
    audioPlayer.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioPlayer.current.currentTime -= 10;
  };

  // reset/reload track when playing ended
  const reload = () => {
    setPlaying(false);
    audioPlayer.current.load();
    progress.set(0);
  };

  // format secs/mins for double digits  - '03:03'
  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }
    const secs = Math.floor(time % 60);
    const mins = Math.floor(time / 60);
    const correctSecs = secs < 10 ? `0${secs}` : `${secs}`;
    const correctMins = mins < 10 ? `0${mins}` : `${mins}`;
    return `${correctMins}:${correctSecs}`;
  };

  // get track duration function & format it
  const getDuration = useCallback(() => {
    const time = audioPlayer.current.duration;
    const duration = formatTime(time);
    setTrackLength(duration)
  },[]);

  // progress bar
  let progress = useMotionValue(0);
  let width = useTransform(progress, (currentTime) => {
    const duration = audioPlayer?.current?.duration;
    const progressPercentage = `${(currentTime / duration) * 100}%`;
    return progressPercentage;
  });

  // set track duration time
  useEffect(() => {
    getDuration();
    setCurrentTime(formatTime(audioPlayer.current.currentTime));
  },[getDuration]);
  
    // setup EQ on pressing play button
  const createAudioAnalyzer = (element, audioSource) => {
    return new AudioMotionAnalyzer(element, {
      source: audioSource,
      ledBars: true,
      mode: 6,
      barSpace: 0.5,
      gradient: "prism",
      showScaleX: false,
      height: 150,
      width:  element.offsetWidth,
      overlay: true,
      showBgColor: true,
      bgAlpha: 0,
    });
  }

  useEffect(() => {
    if(playCount === 1) {
      createAudioAnalyzer(containerRef.current,audioPlayer.current);
    }
  },[playCount])

  // handle audio playing
  useEffect(() => {
    if(playing) {
      audioPlayer.current.play();
      setCurrentTime(formatTime(audioPlayer.current.currentTime));
    } else {
      audioPlayer.current.pause();
    }
  }, [playing]);

  return (
    <div className="w-80 p-8 flex flex-col gap-5 items-center font-vt323 bg-secondaryBlack">
      <audio
        ref={audioPlayer}
        id="audio"
        src={audio_url}
        crossOrigin="anonymous"
        preload="auto"
        onTimeUpdate={(e) => {
          setCurrentTime(formatTime(e.currentTarget.currentTime));
          // update motion value for progress bar
          progress.set(e.currentTarget.currentTime);
        }}
        onEnded={reload}
        onLoadedMetadata={getDuration}
      ></audio>
      <div className="w-full">
        <p className="capitalize text-3xl">{title}</p>
        <p className="capitalize text-primaryRed text-lg">{artist}</p>
        {album !== "n/a" && <p className="text-lg capitalize">{album}</p>}
        <div className="flex gap-2">
          <p className="capitalize">{genre}</p>
          <p>&#x2022; {year}</p>
        </div>
      </div>
      <div ref={containerRef} id="container" className="w-full min-h-[150px]"></div>
      <div className="w-full justify-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-x-7">
          <div className="flex flex-col">
            <button
              aria-label="skip-backward"
              id="backward"
              type="button"
              className="text-3xl text-redHover hover:text-primaryRed"
              onClick={skipBackward}
            >
              <BsSkipBackward />
            </button>
            <span className="text-sm">10 secs</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              //aria-label={!playing ? 'play' : 'pause'}
              type="button"
              className="text-5xl text-redHover hover:text-primaryRed"
              onClick={handlePlay}
            >
              {!playing ? <BsPlayCircle data-testid='play-btn'/> : <BsPauseCircle data-testid='pause-btn'/>}
            </button>
            <span className="text-sm pt-1">{!playing ? "Play" : "Pause"}</span>
          </div>
          <div className="flex flex-col">
            <button
              aria-label="skip-forward"
              id="forward"
              type="button"
              className="text-3xl text-redHover hover:text-primaryRed"
              onClick={skipForward}
            >
              <BsSkipForward />
            </button>
            <span className="text-sm">10 secs</span>
          </div>
          <div className="flex flex-col">
            <button
              aria-label="reload"
              id="reload"
              type="button"
              className="text-3xl text-redHover hover:text-primaryRed"
              onClick={reload}
            >
              <BiRefresh />
            </button>
            <span className="text-sm">reload</span>
          </div>
        </div>
        <div className="w-full h-[2px] bg-slate-700 rounded-lg">
          <motion.div
            ref={progressBarRef}
            className="h-full bg-redHover rounded-l-lg"
            style={{ width }}
          ></motion.div>
        </div>
        <div className="w-full flex gap-6 justify-between text-lg">
          <p>
            Playing:{" "}
            <span className="ml-1 text-emerald-400">{currentTime}</span>
          </p>
          <p>
            Duration: <span className="ml-1 text-redHover">{trackLength}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
