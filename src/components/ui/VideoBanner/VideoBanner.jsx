import { useRef, useState } from "react";
import "./VideoBanner.scss";

import { Pause, Play, VolumeMute, VolumeUp } from "react-bootstrap-icons";
const VideoBanner = ({
    sourceFile,
    videoSubTitle,
    videoTitle }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoElement = useRef();

    // Play or pause video
    const playPauseVideo = () => {
        const nextState = !isPlaying;
        setIsPlaying(nextState);
        if (nextState) {
            videoElement.current.pause();
        } else {
            videoElement.current.play();
        }
    }

    // Mute or Unmute video
    const toggleMuteVideo = () => {
        const audioState = !isMuted;
        setIsMuted(audioState);
        videoElement.current.muted = audioState;
    }

    return (
        <div className="video-banner">
            <video
                autoPlay={!isPlaying}
                loop={true}
                muted={isMuted}
                playsInline
                controls={false}
                className="video-banner__media" ref={videoElement}>
                <source src={sourceFile} type="video/mp4" />
            </video>
            <div className="video-banner__overlay">
                <div className="video-banner__content">
                    <div className="video-banner__subtitle">
                        {videoSubTitle}
                    </div>
                    <h2 className="video-banner__title">
                        {videoTitle}
                    </h2>
                    <button className="btn-borderless">Discover new collections</button>
                </div>
            </div>

            <div className="button-controls left">
                <button className="btn button-play" onClick={() => playPauseVideo()} >
                    {isPlaying ? <Play /> : <Pause />}
                </button>
            </div>
            <div className="button-controls right">
                <button className="btn button-mute" onClick={() => { toggleMuteVideo() }}>
                    {isMuted ? <VolumeMute /> : <VolumeUp />}
                </button>
            </div>
        </div>
    )
}
export default VideoBanner