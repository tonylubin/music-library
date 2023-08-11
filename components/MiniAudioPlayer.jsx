import React, { useState, useRef, useEffect } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import {
  MdOutlineForward10,
  MdOutlineReplay10,
  MdOutlineCached,
} from "react-icons/md";
import { useRouter } from "next/router";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { CldImage } from "next-cloudinary";
import { defaultTrackImgUrl } from "../utils/utils";

const MiniAudioPlayer = (props) => {
  const { title, artist, simplePlay, setSimplePlay } = props;

  const router = useRouter();

  // player state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [duration, setDuration] = useState();

  // useRef's - reference to html elements
  const audioPlayer = useRef();
  const containerRef = useRef();
  const progressBarRef = useRef();
  const animationRef = useRef();

  // toggle button status - play/pause - for both play btns
  // smooth animation of progress bar
  const handlePlay = () => {
    if (!playing) {
      audioPlayer.current.play();
      setPlaying(true);
      setSimplePlay(true)
      animationRef.current = requestAnimationFrame(updateProgressBar);
    } else {
      audioPlayer.current.pause();
      setPlaying(false);
      setSimplePlay(false);
      cancelAnimationFrame(animationRef.current);
    }
  };

  // skipping feature
  const skipForward = () => {
    audioPlayer.current.currentTime += 10;
    //updateProgressBar();
  };

  const skipBackward = () => {
    audioPlayer.current.currentTime -= 10;
    //updateProgressBar();
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
      gradient: "orangered",
      showScaleX: false,
      height: containerRef.current.offsetHeight,
      width: containerRef.current.offsetWidth,
      overlay: true,
      showBgColor: true,
      bgAlpha: 0,
    });
  }, [audioPlayer?.current?.loadedmetadata]);

  // update current playing time
  useEffect(() => {
    setCurrentTime(formatTime(audioPlayer.current.currentTime));
  }, [playing]);

  // cancel progress bar update when navigating away - that's causing null error
  useEffect(() => {
    const cancelAnimation = async () => {
      await audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    };
    router.events.on("routeChangeStart", cancelAnimation);
    return () => {
      router.events.off("routeChangeStart", cancelAnimation);
    };
  }, [router.events]);

  // handling outside audio play btn
  useEffect(() => {
    if(!simplePlay) {
      audioPlayer.current.pause();
      setPlaying((playing) => playing = false);
    } else {
      audioPlayer.current.play();
      setPlaying((playing) => playing = true);
    }
  },[simplePlay]); 

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
    <div className="w-full h-20 grid grid-cols-3 gap-4 items-center font-vt323 bg-secondaryBlack">
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
      <div className="w-full h-4/5 flex gap-8 pl-8 items-center">
        <div className="w-10 h-10 flex">
          <CldImage
            alt="mini album cover"
            src={defaultTrackImgUrl}
            width={70}
            height={70}
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col">
          <p className="capitalize text-lg">{title}</p>
          <p className="capitalize text-redHover text-sm">{artist}</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center gap-x-7">
          <div className="flex flex-col">
            <button
              id="backward"
              type="button"
              title="rewind seek"
              className="text-2xl text-primaryRed hover:text-redHover"
              onClick={skipBackward}
            >
              <MdOutlineReplay10 />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              title="play/pause"
              className="text-4xl text-primaryRed hover:text-redHover"
              onClick={handlePlay}
            >
              {!playing ? <BsPlayCircle /> : <BsPauseCircle />}
            </button>
          </div>
          <div className="flex flex-col">
            <button
              id="forward"
              type="button"
              title="forward seek"
              className="text-2xl text-primaryRed hover:text-redHover"
              onClick={skipForward}
            >
              <MdOutlineForward10 />
            </button>
          </div>
          <div className="flex flex-col">
            <button
              id="reload"
              type="button"
              title="reload"
              className="text-xl text-primaryRed hover:text-redHover"
              onClick={reload}
            >
              <MdOutlineCached />
            </button>
          </div>
        </div>
        <div className="w-full flex gap-4 items-center justify-between text-lg">
          <p className="text-emerald-400 text-sm">{currentTime}</p>
          <div className="w-full h-[2px] bg-slate-700 rounded-lg">
            <div
              ref={progressBarRef}
              className="w-0 h-full bg-redHover rounded-l-lg"
            ></div>
          </div>
          <p className="text-primaryRed text-sm">{duration}</p>
        </div>
      </div>
      <div
        ref={containerRef}
        id="container"
        className="w-1/2 h-4/5 flex justify-self-center"
      ></div>
    </div>
  );
};

export default MiniAudioPlayer;
