import React, { useState, useRef, useEffect } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import {
  BsPlayCircle,
  BsPauseCircle,
  BsSkipBackward,
  BsSkipForward,
} from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";


const AudioPlayer = ({ trackData }) => {

  const { title, artist, album, genre, year } = trackData;

  // player state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [duration, setDuration] = useState();

  // useRef's - reference to html elements
  const audioPlayer = useRef();
  const containerRef = useRef();
  const progressBarRef = useRef();
  const animationRef = useRef();

  // toggle button status - play/pause
  // smooth animation of progress bar
  const handlePlay = () => {
    if (!playing) {
      audioPlayer.current.play();
      setPlaying(true);
      animationRef.current = requestAnimationFrame(updateProgressBar);
    } else {
      audioPlayer.current.pause();
      setPlaying(false);
      cancelAnimationFrame(animationRef.current);
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
    progressBarRef.current.style.width = `0%`;
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

  // ** when browser has loaded metadata for audio it fires loadmetadata event (can then get track duration) & create audio motion element instance **
  useEffect(() => {
    setDuration(formatTime(audioPlayer.current.duration));
    const audioMotion = new AudioMotionAnalyzer(containerRef.current, {
      source: audioPlayer.current,
      ledBars: true,
      mode: 6,
      barSpace: 0.5,
      gradient: "prism",
      showScaleX: false,
      height: 150,
      width: containerRef.current.offsetWidth,
      overlay: true,
      showBgColor: true,
      bgAlpha: 0
    });
  }, [audioPlayer?.current?.loadedmetadata]);

  // update current playing time
  useEffect(() => {
    setCurrentTime(formatTime(audioPlayer.current.currentTime));
  }, [playing]);

  // progress bar
  function updateProgressBar() {
    const currentTime = audioPlayer?.current?.currentTime;
    const duration = audioPlayer?.current?.duration;
    const progressBar = progressBarRef?.current;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    animationRef.current = requestAnimationFrame(updateProgressBar);
  };

  return (
    <div className="w-80 p-8 flex flex-col gap-5 items-center font-vt323 bg-blackShade">
      <audio
        ref={audioPlayer}
        id="audio"
        src="/music/02 Treat Me Right.m4a"
        preload="auto"
        onTimeUpdate={(e) => {
          setCurrentTime(formatTime(e.currentTarget.currentTime));
        }}
        onEnded={reload}
      ></audio>
      <div className="w-full">
        <p className="capitalize text-3xl">{title}</p>
        <p className="capitalize text-redHover text-lg">{artist}</p>
        {album !== "n/a" && <p className="text-lg capitalize">{album}</p>}
        <div className="flex gap-2">
          <p>{genre}</p>
          <p>&#x2022; {year}</p>
        </div>
      </div>
      <div ref={containerRef} id="container" className="w-full"></div>
      <div className="w-full justify-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-x-7">
          <div className="flex flex-col">
            <button
              id="backward"
              type="button"
              className="text-3xl text-primaryRed active:text-redHover active:text-[2rem]"
              onClick={skipBackward}
            >
              <BsSkipBackward />
            </button>
            <span className="text-sm">10 secs</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              className="text-5xl text-primaryRed active:text-redHover"
              onClick={handlePlay}
            >
              {!playing ? <BsPlayCircle /> : <BsPauseCircle />}
            </button>
            <span className="text-sm pt-1">{!playing ? "Play" : "Pause"}</span>
          </div>
          <div className="flex flex-col">
            <button
              id="forward"
              type="button"
              className="text-3xl text-primaryRed active:text-redHover active:text-[2rem]"
              onClick={skipForward}
            >
              <BsSkipForward />
            </button>
            <span className="text-sm">10 secs</span>
          </div>
          <div className="flex flex-col">
            <button
              id="reload"
              type="button"
              className="text-3xl text-primaryRed active:text-redHover active:text-[2rem]"
              onClick={reload}
            >
              <BiRefresh />
            </button>
            <span className="text-sm">reload</span>
          </div>
        </div>
        <div className="w-full h-[2px] bg-slate-700 rounded-lg">
          <div
            ref={progressBarRef}
            className="w-0 h-full bg-redHover rounded-l-lg"
          ></div>
        </div>
        <div className="w-full flex gap-6 justify-between text-lg">
          <p>
            Playing:{" "}
            <span className="ml-1 text-emerald-400">{currentTime}</span>
          </p>
          <p>
            Duration: <span className="ml-1 text-primaryRed">{duration}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
