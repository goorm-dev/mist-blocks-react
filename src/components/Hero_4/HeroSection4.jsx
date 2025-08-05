import React, { useState, useEffect } from 'react';
import { Text } from '@vapor-ui/core';
import './HeroSection4.css';

const HeroSection4 = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  // 컴포넌트 마운트 확인
  useEffect(() => {
    console.log('🎨 HeroSection4 컴포넌트가 성공적으로 렌더링되었습니다!');
  }, []);

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setScreenSize('mobile');
      } else if (width <= 768) {
        setScreenSize('tablet');
      } else if (width <= 992) {
        setScreenSize('small-desktop');
      } else {
        setScreenSize('desktop');
      }
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    // 클린업
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 비디오 자동 재생을 위한 useEffect
  useEffect(() => {
    const video = document.querySelector('.hero-media-video');
    if (video) {
      video.play().catch(error => {
        console.log('비디오 자동 재생 실패:', error);
      });
    }
  }, []);

  // 템플릿 변수들
  const templateData = {
    mainTitle: "메인 타이틀을<br />최대 30자<br />이내로 입력하세요",
    videoSrc: "",
    videoPoster: "",
    mobileImageSrc: ""
  };

  // 반응형 타이포그래피 결정 함수
  const getResponsiveTypography = () => {
    switch (screenSize) {
      case 'mobile':
        return "heading2"; // 576px 이하
      case 'tablet':
        return "heading2"; // 768px 이하
      case 'small-desktop':
        return "heading1"; // 992px 이하
      default:
        return "display4"; // 992px 초과
    }
  };

  // br 태그를 JSX로 변환하는 함수
  const renderTitleWithBreaks = (title) => {
    if (!title) return null;
    
    const parts = title.split('<br />');
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <section className="content-hero-section hero-section">
      <div className="container">
        {/* 메인 미디어 블록 */}
        <div className="hero-media-block">
          <div className="hero-image-placeholder">
            <video 
              className="hero-media-video" 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="metadata" 
              poster={templateData.videoPoster}
            >
              <source media="(min-width: 577px)" src={templateData.videoSrc} type="video/mp4" />
            </video>
            <img src={templateData.mobileImageSrc} alt="hero-main-mobile" className="hero-media-image" />
          </div>
          <div className="hero-image-dim"></div>
          <h1 className="hero-title">
            <Text typography={getResponsiveTypography()} foreground="accent">
              {renderTitleWithBreaks(templateData.mainTitle)}
            </Text>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection4; 