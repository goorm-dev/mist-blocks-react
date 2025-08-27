import { useState, useEffect, useRef } from 'react';
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
    videoSrc: "http://statics.goorm.io/ktcloud-techup/landing/assets/video/techup_ceo_interview.mp4",
    videoPoster: "/assets/interview-poster.png",
    youtubeUrl: "https://youtu.be/0xlwUnrinIM", // 유튜브 링크 (미정)
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
    // 모바일 환경 체크 (768px 이하)
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // 모바일에서는 유튜브 링크가 있을 때만 이동
      if (templateData.youtubeUrl) {
        window.open(templateData.youtubeUrl, '_blank');
      }
      // 유튜브 링크가 없으면 아무 액션 없음
      return;
    }

    // 데스크톱에서는 기존 비디오 재생
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
                우리가 찾는 인재, <br />
                kt cloud가 직접 교육합니다
              </Text>
              <Text typography="heading5" foreground="hint-darker" className="interview-description">
                이론 교육을 넘어 완성형 교육으로. <br />
                지식 습득을 넘어 애자일 마인드 셋을 갖추기까지.
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
                  id="video-overlay"
                  role="dialog"
                  aria-modal="true"
                  aria-label="인터뷰 내용"
                >
                  <div className="overlay-content">
                    <Text typography="heading5" foreground="accent" className="overlay-description">
                     kt cloud는 빠르게 변화하는 디지털 환경 속에서 실무형 인재의 필요성을 절감했습니다.
                     특히 산업 현장과 교육의 간극을 해결하지 않으면 미래 성장에 한계가 있다는 문제의식으로 현업의 기술과 경험을 담은 교육을 직접 만들게 되었습니다.
                    </Text>
                    <Text typography="heading5" foreground="accent" className="overlay-description">
                     TECH UP은 단순한 지식 전달을 넘어 고객 관점의 문제 해결 능력과 탁월한 협업 능력, 오너십을 통해 함께 성장하는 인재를 양성합니다. 이 모든 가치를 묶는 핵심이 바로 ‘Agile Mindset’입니다.
                     교육생은 기획자, 디자이너, 엔지니어 등 총 9가지 직무가 통합되어 대기업 핵심 프로젝트 팀에 견줄만한 생태계 속에서 문제 해결 능력을 체득하게 됩니다.
                    </Text>
                    <Text typography="heading5" foreground="accent" className="overlay-description" style={{marginBottom: 'var(--vapor-size-space-600)'}}>
                     그 결과, ‘kt cloud TECH UP 출신은 문제 접근 방식부터 다르다’는 이야기를 듣게 될 것입니다. 문제의 본질을 파악하고 해결하는 사고와 태도를 갖추게 될 테니까요.
                     “할까 말까 할 땐 하고, 갈까 말까 할 땐 가봐야죠.” 주저 없이 도전해 보세요.
                    </Text>
                  </div>
                </div>
              )}
              
              <button 
                className="video-description-wrapper"
                onClick={handlePlusClick}
                aria-controls="video-overlay"
                aria-expanded={isOverlayOpen}
                aria-label="인터뷰 내용 보기"
              >
                <div className="video-plus-wrapper">
                  <div className="description-plus is-1"></div>
                  <div className="description-plus is-2"></div>
                </div>
                <div className="video-transcript">
                  <span className="video-action-plus-label">내용 보기</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoInterviewSection;
