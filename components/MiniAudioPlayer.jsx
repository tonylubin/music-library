import React, { useState, useRef, useEffect } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import {
  MdOutlineForward10,
  MdOutlineReplay10,
  MdOutlineCached,
  MdSkipPrevious,
  MdSkipNext,
} from "react-icons/md";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { CldImage } from "next-cloudinary";
import { motion, useTransform, useMotionValue } from "framer-motion";

const MiniAudioPlayer = (props) => {
  const {
    playing,
    setPlaying,
    setCurrentTrackIndex,
    currentTrackIndex,
    trackData,
    active,
    setActive,
  } = props;

  // track time
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  // useRef's - reference to html elements
  const audioPlayer = useRef();
  const containerRef = useRef();
  const progressBarRef = useRef();

  // next track
  const nextTrack = () => {
    if (trackData.length === currentTrackIndex + 1) {
      setPlaying(false);
      setCurrentTrackIndex(null);
      setActive({ id: null });
      setCurrentTime("00:00");
      setDuration("00:00");
    } else {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setActive({ id: active.id + 1 });
    }
  };

  // progress bar
  let progress = useMotionValue(0);
  let width = useTransform(progress, (currentTime) => {
    const duration = audioPlayer?.current?.duration;
    const progressPercentage = `${(currentTime / duration) * 100}%`;
    return progressPercentage;
  });

  // previous track
  const prevTrack = () => {
    if (currentTrackIndex === 0) {
      return null;
    }
    setCurrentTrackIndex(currentTrackIndex - 1);
    setActive({ id: active.id - 1 });
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

  // create eq analyzer effect
  useEffect(() => {
    const createAudioAnalyzer = () => {
      const player = audioPlayer.current;
      const analyzerContainer = containerRef.current;

      const audioMotion = new AudioMotionAnalyzer(analyzerContainer, {
        source: player,
        ledBars: true,
        mode: 6,
        barSpace: 0.5,
        gradient: "orangered",
        showScaleX: false,
        height: analyzerContainer.offsetHeight,
        width: analyzerContainer.offsetWidth,
        overlay: true,
        showBgColor: true,
        bgAlpha: 0,
      });
      return audioMotion;
    };
    createAudioAnalyzer();
  }, []);

  // handle track upload & play
  useEffect(() => {
    if (currentTrackIndex >= 0 && playing) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [currentTrackIndex, playing]);

  return (
    <div className="w-full h-20 grid grid-cols-3 gap-4 items-center font-vt323 bg-secondaryBlack">
      <audio
        ref={audioPlayer}
        id="audio"
        src={trackData[currentTrackIndex]?.audioUrl}
        preload="auto"
        crossOrigin="anonymous"
        onTimeUpdate={(e) => {
          setCurrentTime(formatTime(e.currentTarget.currentTime));
          // update motion value for progress bar
          progress.set(e.currentTarget.currentTime);
        }}
        onLoadedMetadata={(e) =>
          setDuration(formatTime(e.currentTarget.duration))
        }
        // handle next track 'autoplay'
        onEnded={nextTrack}
      ></audio>
      <div className="w-full h-4/5 flex gap-8 pl-8 items-center">
        <div className="w-10 h-10 flex">
          {trackData[currentTrackIndex]?.imageUrl && (
            <CldImage
              alt="mini album cover"
              src={trackData[currentTrackIndex]?.imageUrl}
              width={70}
              height={70}
              sizes="100vw"
            />
          )}
        </div>
        <div className="flex flex-col">
          <p className="capitalize text-lg">
            {trackData[currentTrackIndex]?.title}
          </p>
          <p className="capitalize text-redHover text-sm">
            {trackData[currentTrackIndex]?.artist}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center gap-x-7">
          <div className="flex flex-col">
            <button
              id="forward"
              type="button"
              title="previous track"
              className="text-2xl text-primaryRed hover:text-redHover"
              onClick={prevTrack}
            >
              <MdSkipPrevious />
            </button>
          </div>
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
              onClick={() => setPlaying(!playing)}
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
              id="forward"
              type="button"
              title="next track"
              className="text-2xl text-primaryRed hover:text-redHover"
              onClick={nextTrack}
            >
              <MdSkipNext />
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
            <motion.div
              ref={progressBarRef}
              className="w-0 h-full bg-redHover rounded-l-lg"
              style={{ width }}
            ></motion.div>
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
