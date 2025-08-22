import React, { useState, useEffect, useRef } from 'react';
import { Text, Button } from '@vapor-ui/core';
import { PlusOutlineIcon } from '@vapor-ui/icons';
import './CeoInterviewSection.css';

const CeoInterviewSection = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  // 템플릿 변수들
  const templateData = {
    videoSrc: "",
    videoPoster: "src/assets/interview-poster.png",
  };

  const handlePlusClick = () => {
    if (isOverlayOpen) {
      // 오버레이가 열려있으면 닫기 애니메이션 시작
      setIsClosing(true);
      setTimeout(() => {
        setIsOverlayOpen(false);
        setIsClosing(false);
      }, 300); // fade-out 애니메이션 지속시간과 동일
    } else {
      // 오버레이가 닫혀있으면 바로 열기
      setIsOverlayOpen(true);
    }
  };

  const handleOverlayClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOverlayOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // ESC 키로 오버레이 닫기
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOverlayOpen) {
        handleOverlayClose();
      }
    };

    if (isOverlayOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOverlayOpen]);

  // 비디오 재생 시 저장된 시간부터 시작
  useEffect(() => {
    if (isVideoPlaying && videoRef.current && currentTime > 0) {
      videoRef.current.currentTime = currentTime;
    }
  }, [isVideoPlaying]);

  // 비디오 재생 관련 함수들
  const handlePlayIconClick = () => {
    if (templateData.videoSrc) {
      setIsVideoPlaying(true);
      // 비디오 요소가 준비되면 자동 재생
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 100);
    }
  };

  const handleVideoPause = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
    setIsVideoPlaying(false);
  };

  const handleVideoEnded = () => {
    setCurrentTime(0);
    setIsVideoPlaying(false);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  return (
    <section className="content-section ceo-interview-section">
      <div className="container">
        <div className="interview-content-wrapper grid grid-cols-12">
          <div className="text-content-area col-span-7">
            <div className="text-wrapper">
              <Text typography="heading2" foreground="normal" className="interview-title">
                두려움을 넘어, 기술로 향하는 여정 <br />
                두려움을 넘어, 기술로 향하는 여정
              </Text>
              <Text typography="heading5" foreground="hint-darker" className="interview-description">
                지금, 테크업 부트캠프에 탑승하세요. <br />
                지금, 테크업 부트캠프에 탑승하세요.
              </Text>
            </div>
          </div>
          <div className="video-content-area col-span-5">
            <div 
              className={`video-thumb ${isOverlayOpen ? 'is-open' : ''} ${isVideoPlaying ? 'is-playing' : ''}`}
              style={{
                backgroundImage: templateData.videoPoster ? `url(${templateData.videoPoster})` : 'none'
              }}
            >
              {/* 비디오 플레이어 또는 플레이 아이콘 */}
              {templateData.videoSrc && isVideoPlaying ? (
                <video
                  ref={videoRef}
                  className="video-player"
                  poster={templateData.videoPoster || undefined}
                  controls
                  controlsList="nodownload nofullscreen noremoteplayback noplaybackrate nopictureinpicture"
                  preload="metadata"
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleVideoTimeUpdate}
                  aria-label="kt cloud ceo interview"
                  title="kt cloud ceo interview"
                >
                  <source src={templateData.videoSrc} type="video/mp4" />
                </video>
              ) : (
                <div className="play-icon" onClick={handlePlayIconClick}>
                  <svg className="play-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37333 0 0 5.37333 0 12C0 18.6267 5.37333 24 12 24C18.6267 24 24 18.6267 24 12C24 5.37333 18.6267 0 12 0ZM9.21 17.0467V6.95333L16.8433 12L9.21 17.0467Z" fill="white"/>
                  </svg>
                </div>
              )}
              
              {/* 오버레이 */}
              {isOverlayOpen && (
                <div 
                  className={`video-thumb-overlay ${isClosing ? 'closing' : ''}`}
                  onClick={handleOverlayClose}
                >
                  <div className="overlay-content">
                    <Text typography="heading5" foreground="accent" className="overlay-description">
                      지금, 테크업 부트캠프에 탑승하세요. 지금, 테크업 부트캠프에 탑승하세요. 지금, 테크업 부트캠프에 탑승하세요.
                    </Text>
                  </div>
                </div>
              )}
              
              <div 
                className="video-description-wrapper"
                onClick={handlePlusClick}
                aria-controls="video-overlay"
                aria-expanded={isOverlayOpen}
              >
                <div className="video-plus-wrapper">
                  <div className="description-plus is-1"></div>
                  <div className="description-plus is-2"></div>
                </div>
                <div className="video-transcript">
                  <span className="video-action-plus-label">내용 보기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoInterviewSection;
