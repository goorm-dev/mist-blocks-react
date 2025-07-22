import React, { useState, useEffect } from 'react';
import { Text } from '@vapor-ui/core';
import './HeroSection1.css';

const HeroSection1 = () => {
  const [isHovered, setIsHovered] = useState(null);

  // 컴포넌트 마운트 확인
  useEffect(() => {
    console.log('🎨 HeroSection1 컴포넌트가 성공적으로 렌더링되었습니다!');
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

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content-wrapper">
          {/* 상단 카드 2개 */}
          <div className="hero-top-row">
            <div className="hero-left-container">
              <div className="hero-image-placeholder">
                <video 
                  className="hero-left-video" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="metadata" 
                  poster="/landing_skeleton/source/img-default-hero-left.png"
                >
                  <source media="(min-width: 577px)" src="/landing_skeleton/source/video.png" type="video/mp4" />
                </video>
                <img src="/landing_skeleton/source/img-default-hero-left.png" alt="hero-main-mobile" className="hero-left-image" />
              </div>
              <div className="hero-image-dim"></div>
              <div className="hero-title">
                <Text typography="display4" foreground="accent">
                  메인 타이틀을<br />최대 30자<br />이내로 입력하세요
                </Text>
              </div>
            </div>
            <div className="hero-right-container">
              <div className="hero-right-background"></div>
              <picture id="hero-main-picture">
                <source media="(max-width: 992px)" srcSet="/landing_skeleton/source/img-default-hero-right-2.png" />
                <img src="여기에 이미지 경로를 넣어주세요" alt="main-image" className="hero-right-image" />
              </picture>
            </div>
          </div>

          {/* 하단 카드 3개 */}
          <div className="hero-bottom-row">
            {[
              {
                label: "라벨 1",
                title: "서브 타이틀 1",
                description: "서브 타이틀 1에 대한 설명을 입력하세요",
                imageSrc: "여기에 이미지 경로를 넣어주세요"
              },
              {
                label: "라벨 2", 
                title: "서브 타이틀 2",
                description: "서브 타이틀 2에 대한 설명을 입력하세요",
                imageSrc: "여기에 이미지 경로를 넣어주세요"
              },
              {
                label: "라벨 3",
                title: "서브 타이틀 3", 
                description: "서브 타이틀 3에 대한 설명을 입력하세요",
                imageSrc: "여기에 이미지 경로를 넣어주세요"
              }
            ].map((card, index) => (
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

export default HeroSection1; 