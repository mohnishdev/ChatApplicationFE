import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";
import LoginAndRegisterPage from "./components/Login&RegisterPage/Login&registerPage";
// import NewChatPage from "./components/Chat/newChatPage";
// import NewLoginSignUpPage from "./components/LoginPage/NewLoginSighupPage";
// import PageNotFound from "./components/PageNotFound/PageNotFound";
import PrivateRoute from "./Route/PrivateRoute";

// import socketIOClient from "socket.io-client";

const App = () => {
  return (
    <div className=""> 
      <Routes>
           <Route element={<PrivateRoute />}>
        </Route>
           <Route path="/chat" element={<ChatPage />} /> 
        <Route path="/" element={<LoginAndRegisterPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  )
}

export default App


// import React, { useState, useRef, useEffect } from 'react'


// const App = ({ timeJump = 20 }) => {
//   // state
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);

//   const chapters = [
//     {
//       start: 0,
//       end: 15
//     },
//     {
//       start: 60,
//       end: 75
//     }
//   ]

//   // references
//   const audioPlayer = useRef();   // reference our audio component
//   const progressBar = useRef();   // reference our progress bar
//   const animationRef = useRef();  // reference the animation

//   useEffect(() => {
//     if (timeJump) {
//       timeTravel(timeJump);
//       setIsPlaying(true);
//       play();
//     } else {
//       timeTravel(0);
//     }
//   }, [timeJump])

//   useEffect(() => {
//     const seconds = Math.floor(audioPlayer.current.duration);
//     setDuration(seconds);
//     progressBar.current.max = seconds;
//   }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

//   const calculateTime = (secs) => {
//     const minutes = Math.floor(secs / 60);
//     const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
//     const seconds = Math.floor(secs % 60);
//     const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
//     return `${returnedMinutes}:${returnedSeconds}`;
//   }

//   const play = () => {
//     audioPlayer.current.play();
//     animationRef.current = requestAnimationFrame(whilePlaying)
//   }

//   const togglePlayPause = () => {
//     const prevValue = isPlaying;
//     setIsPlaying(!prevValue);
//     if (!prevValue) {
//       play();
//     } else {
//       audioPlayer.current.pause();
//       cancelAnimationFrame(animationRef.current);
//     }
//   }

//   const whilePlaying = () => {
//     progressBar.current.value = audioPlayer.current.currentTime;
//     changePlayerCurrentTime();
//     animationRef.current = requestAnimationFrame(whilePlaying);
//   }

//   const changeRange = () => {
//     audioPlayer.current.currentTime = progressBar.current.value;
//     changePlayerCurrentTime();
//   }

//   const changePlayerCurrentTime = () => {
//     progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
//     setCurrentTime(progressBar.current.value);
//   }

//   const backThirty = () => {
//     timeTravel(Number(progressBar.current.value) - 30);
//   }

//   const forwardThirty = () => {
//     timeTravel(Number(progressBar.current.value) + 30);
//   }

//   const timeTravel = (newTime) => {
//     progressBar.current.value = newTime;
//     changeRange();
//   }

//   return (
//     <div className={""}>
//       <audio ref={audioPlayer} src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3" preload="metadata"></audio>
//       <button className={""} onClick={backThirty}> 30</button>
//       <button onClick={togglePlayPause} className={""}>
//         {isPlaying ? "puse" : "play"}
//       </button>
//       <button className={""} onClick={forwardThirty}>30 left</button>

//       {/* current time */}
//       <div className={""}>{calculateTime(currentTime)}</div>

//       {/* progress bar */}
//       <div className={""}>
//         <input type="range" className={""} defaultValue="0" ref={progressBar} onChange={changeRange} />
//         {chapters.map((chapter, i) => {
//           const leftStyle = chapter.start / duration * 100;
//           const widthStyle = (chapter.end - chapter.start) / duration * 100;
//           return (
//             <div
//               key={i}
//               className={`${""} ${chapter.start == 0 && ""} ${chapter.end == duration && "styles.end"}`}
//               style={{
//                 '--left': `${leftStyle}%`,
//                 '--width': `${widthStyle}%`,
//               }}
//             ></div>
//           )
//         })}
//       </div>

//       {/* duration */}
//       <div className={""}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
//     </div>
//   )
// }

// export default App