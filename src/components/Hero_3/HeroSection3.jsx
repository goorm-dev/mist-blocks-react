import React, { useState, useEffect } from 'react';
import { Text } from '@vapor-ui/core';
import './HeroSection3.css';

const HeroSection3 = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');

  // 컴포넌트 마운트 확인
  useEffect(() => {
    console.log('🎨 HeroSection3 컴포넌트가 성공적으로 렌더링되었습니다!');
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
    const video = document.querySelector('.hero-left-video');
    if (video) {
      video.play().catch(error => {
        console.log('비디오 자동 재생 실패:', error);
      });
    }
  }, []);

  const handleCardHover = (index) => {
    setIsHovered(index);
    console.log(`🖱️ 카드 ${index + 1}에 호버되었습니다.`);
  };

  const handleCardLeave = () => {
    setIsHovered(null);
    console.log('🖱️ 카드 호버가 해제되었습니다.');
  };

  // 템플릿 변수들
  const templateData = {
    mainTitle: "메인 타이틀을<br />최대 30자<br />이내로 입력하세요",
    videoSrc: "",
    videoPoster: "/landing_skeleton/source/img-default-hero-left.png",
    mobileImageSrc: "/landing_skeleton/source/img-default-hero-left.png",
    cards: [
      {
        label: "라벨1",
        title: "서브 타이틀1",
        description: "설명을 입력하세요.",
        imageSrc: "{{image_source_1}}"
      },
      {
        label: "라벨2",
        title: "서브 타이틀2",
        description: "설명을 입력하세요.",
        imageSrc: "{{image_source_2}}"
      }
    ]
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
        <div className="hero-content-wrapper">
          {/* 왼쪽 메인 카드 */}
          <div className="hero-left-container">
            <div className="hero-image-placeholder">
              <video 
                className="hero-left-video" 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="metadata" 
                poster={templateData.videoPoster}
              >
                <source media="(min-width: 577px)" src={templateData.videoSrc} type="video/mp4" />
              </video>
              <img src={templateData.mobileImageSrc} alt="hero-main-mobile" className="hero-left-image" />
            </div>
            <div className="hero-image-dim"></div>
            <h1 className="hero-title">
              <Text typography={getResponsiveTypography()} foreground="accent">
                {renderTitleWithBreaks(templateData.mainTitle)}
              </Text>
            </h1>
          </div>

          {/* 오른쪽 카드 2개 */}
          <div className="hero-right-container">
            {templateData.cards.map((card, index) => (
              <div 
                key={index}
                className={`hero-card-container ${isHovered === index ? 'hovered' : ''}`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
              >
                <div className="hero-card-image">
                  <img src={card.imageSrc} alt={`sub-image-${index + 1}`} className="hero-card-bg" />
                </div>
                <div className="hero-card-overlay"></div>
                <div className="hero-card-content">
                  <div className="hero-card-subtitle">
                    <Text typography="subtitle2" foreground="hint">
                      {card.label}
                    </Text>
                  </div>
                  <div className="hero-card-title">
                    <Text typography="heading3" foreground="normal">
                      {card.title}
                    </Text>
                  </div>
                  <div className="hero-card-description">
                    <Text typography="body2" foreground="normal">
                      {card.description}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection3; 