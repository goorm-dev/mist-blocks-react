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
    videoSrc: "https://statics.goorm.io/ktb/ktb_main_jeju.mp4",
    videoPoster: "src/assets/person.png",
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

  // 반응형 타이포그래피 결정
  const getResponsiveTypography = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 992) return "heading2"; // 32px
      if (width <= 1200) return "heading1"; // 38px
      return "display4"; // 48px
    }
    return "display4";
  };

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
              <Text typography={getResponsiveTypography()} foreground="normal" className="interview-title">
                두려움을 넘어,<br />
                기술로 향하는 여정
              </Text>
              <Text typography="heading5" foreground="hint-darker" className="interview-description">
                코딩 교육 1위가 만든 차별화된 교육 방식. <br />
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
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.8438 49.3125L48.375 38.1562C49.1875 37.635 49.5938 36.9109 49.5938 35.9841C49.5938 35.0572 49.1875 34.3438 48.375 33.8438L30.8438 22.6875C29.9688 22.1875 29.1094 22.1728 28.2656 22.6434C27.4219 23.1141 27 23.8475 27 24.8438V47.1562C27 48.1525 27.4219 48.8859 28.2656 49.3566C29.1094 49.8272 29.9688 49.8125 30.8438 49.3125ZM36.0262 72C31.0712 72 26.4063 71.0625 22.0312 69.1875C17.6562 67.3125 13.8281 64.7344 10.5469 61.4531C7.26562 58.1719 4.6875 54.345 2.8125 49.9725C0.9375 45.6 0 40.9281 0 35.9569C0 30.9856 0.9375 26.3281 2.8125 21.9844C4.6875 17.6406 7.26562 13.8281 10.5469 10.5469C13.6875 7.26562 17.655 4.6875 22.0275 2.8125C26.4 0.9375 31.0719 0 36.0431 0C41.0144 0 45.6719 0.9375 50.0156 2.8125C54.3594 4.6875 58.1719 7.26562 61.4531 10.5469C64.7344 13.8281 67.3125 17.6475 69.1875 22.005C71.0625 26.3631 72 31.0194 72 35.9738C72 40.9288 71.0625 45.5937 69.1875 49.9688C67.3125 54.3438 64.7344 58.1719 61.4531 61.4531C58.1719 64.7344 54.3525 67.3125 49.995 69.1875C45.6369 71.0625 40.9806 72 36.0262 72Z" fill="white"/>
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
