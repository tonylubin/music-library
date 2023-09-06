import React, { useState, useRef, useEffect } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import {
  BsPlayCircle,
  BsPauseCircle,
  BsSkipBackward,
  BsSkipForward,
} from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { useRouter } from "next/router";

const AudioPlayer = ({ trackData }) => {
  const { title, artist, album, genre, year, audioUrl, duration } = trackData;

  const router = useRouter();

  // player state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [trackLength, setTrackLength] = useState(duration.substr(3));

  // useRef's - reference to html elements
  const audioPlayer = useRef(null);
  const containerRef = useRef(null);
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
  function formatTime(time) {
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
    const createAudioAnalyzer = async () => {
      const player = await audioPlayer.current;
      const analyzerContainer = await containerRef.current;

      const audioMotion = new AudioMotionAnalyzer(analyzerContainer, {
        source: player,
        ledBars: true,
        mode: 6,
        barSpace: 0.5,
        gradient: "prism",
        showScaleX: false,
        height: 150,
        width: analyzerContainer.offsetWidth,
        overlay: true,
        showBgColor: true,
        bgAlpha: 0,
      });

      return audioMotion;
    };

    createAudioAnalyzer();
  }, []);

  // update current playing time
  useEffect(() => {
    setCurrentTime(formatTime(audioPlayer.current.currentTime));
  }, [playing]);

  // cancel progress bar update when navigating away - that's causing null error
  useEffect(() => {
    const cancelAnimation = () => {
      cancelAnimationFrame(animationRef.current);
      audioPlayer.current.pause();
    };
    router.events.on("routeChangeStart", cancelAnimation);
    return () => {
      router.events.off("routeChangeStart", cancelAnimation);
    };
  }, [router.events]);

  // progress bar
  function updateProgressBar() {
    const currentTime = audioPlayer?.current?.currentTime;
    const duration = audioPlayer?.current?.duration;
    const progressBar = progressBarRef?.current;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    animationRef.current = requestAnimationFrame(updateProgressBar);
  }

  return (
    <div className="w-80 p-8 flex flex-col gap-5 items-center font-vt323 bg-secondaryBlack">
      <audio
        ref={audioPlayer}
        id="audio"
        src={audioUrl}
        crossOrigin="anonymous"
        preload="auto"
        onTimeUpdate={(e) => {
          setCurrentTime(formatTime(e.currentTarget.currentTime));
        }}
        onEnded={reload}
        // onLoadedMetadata={(e) => setTrackLength(formatTime(e.target.duration))}
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
      <div ref={containerRef} id="container" className="w-full"></div>
      <div className="w-full justify-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-x-7">
          <div className="flex flex-col">
            <button
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
              type="button"
              className="text-5xl text-redHover hover:text-primaryRed"
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
              className="text-3xl text-redHover hover:text-primaryRed"
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
              className="text-3xl text-redHover hover:text-primaryRed"
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
            Duration: <span className="ml-1 text-redHover">{trackLength}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
