import { useEffect, useRef, useState } from "react"; 
import "../App.css";
const MusicPlayer = () => {
  const [isPlaying, setisPlaying] = useState(false);
  const [trackprogress, settrackprogress] = useState(0);
  const [currenttrack, setcurrentrack] = useState(0);

  const audioRef = useRef(null);

  const tracks = [
    {
      title: "Track 1",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Track 2",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      image: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        settrackprogress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  function handlePauseandPlay() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setisPlaying(!isPlaying);
  }
  function handleskip(getdir) {
    if (getdir === "backward") {
      setcurrentrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    } else if (getdir === "forward") {
      setcurrentrack((prev) => (prev + 1) % tracks.length);
    }
  }

  return (
    <div className="music-player">
      <h1>Music Player</h1>

      <h2>{tracks[currenttrack].title}</h2>
      <div className="image-container">
        <img
          src={tracks[currenttrack].image}
          alt={tracks[currenttrack].title}
        />
      </div>
      <audio ref={audioRef} src={tracks[currenttrack].source}></audio>
      <div
        className="progess-bar"
        style={{
          width: `${trackprogress}%`,
          height: "15px",
          background: isPlaying ? "#3498db" : "#a43636",
          borderRadius:"2px"
        }}
      ></div>
      <div className="controls">
        <button onClick={() => handleskip("backward")}>backward</button>
        <button onClick={handlePauseandPlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button onClick={() => handleskip("forward")}>forward</button>
      </div>
    </div>
  );
};
export default MusicPlayer;
