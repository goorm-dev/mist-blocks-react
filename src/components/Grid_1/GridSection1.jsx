import React, { useEffect, useRef } from 'react';
import { Text, Badge } from '@vapor-ui/core';
import './GridSection1.css';

const cards = [
  {
    type: 'card-type1',
    videoSrc: '', // 비디오 경로 입력
    mobileImg: '', // 모바일 이미지 경로 입력
    defaultImg: '', // 기본 이미지 경로 입력
    imgAlt: '카드1 이미지 설명',
    subheading: '카드 1 서브타이틀',
    badge: '뱃지 텍스트',
    heading: '카드 1 타이틀',
    description: '카드 1 주요 메세지',
    link: '#'
  },
  {
    type: 'card-type2',
    videoSrc: '',
    mobileImg: '',
    defaultImg: '',
    imgAlt: '카드2 이미지 설명',
    subheading: '카드 2 서브타이틀',
    badge: '뱃지 텍스트',
    heading: '카드 2 타이틀',
    description: '카드 2 주요 메세지',
    link: '#'
  },
  {
    type: 'card-type3',
    videoSrc: '',
    mobileImg: '',
    defaultImg: '',
    imgAlt: '카드3 이미지 설명',
    subheading: '카드 3 서브타이틀',
    badge: '뱃지 텍스트',
    heading: '카드 3 타이틀',
    description: '카드 3 주요 메세지',
    link: '#'
  },
  {
    type: 'card-type4',
    videoSrc: '',
    mobileImg: '',
    defaultImg: '',
    imgAlt: '카드4 이미지 설명',
    subheading: '카드 4 서브타이틀',
    badge: '뱃지 텍스트',
    heading: '카드 4 타이틀',
    description: '카드 4 주요 메세지',
    link: '#'
  },
];

function GridSection1() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const video = card.querySelector('video');
      if (!video) return;
      if (isMobile) {
        card.addEventListener('touchstart', () => {
          if (video.paused) video.play().catch(() => {});
          else video.pause();
        }, { passive: true });
      } else {
        card.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
        card.addEventListener('mouseleave', () => { video.pause(); });
        card.addEventListener('focus', () => { video.play().catch(() => {}); });
        card.addEventListener('blur', () => { video.pause(); });
      }
    });
    // cleanup
    return () => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const video = card.querySelector('video');
        if (!video) return;
        card.replaceWith(card.cloneNode(true)); // remove all listeners
      });
    };
  }, []);

  return (
    <section className="content-section">
      <div className="container">
        <Text typography="heading2" className="title">Layout Grid 1</Text>
        <div className="card-grid">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`card-ui ${card.type}`}
              data-link={card.link}
              role="button"
              tabIndex={0}
              ref={el => cardRefs.current[idx] = el}
            >
              {/* 비디오 및 이미지 */}
              <video className="card-media pc-media" loop muted playsInline preload="metadata">
                <source media="(min-width: 577px)" src={card.videoSrc} type="video/mp4" />
              </video>
              <picture className="mobile-picture">
                <source media="(max-width: 576px)" srcSet={card.mobileImg} />
                <img src={card.defaultImg} alt={card.imgAlt} className="card-media" />
              </picture>
              <div className="card-gradient"></div>
              <div className="card-play-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
                  <path opacity="0.7" d="M20.5625 32.875L32.25 25.4375C32.7917 25.09 33.0625 24.6073 33.0625 23.9894C33.0625 23.3715 32.7917 22.8958 32.25 22.5625L20.5625 15.125C19.9792 14.7917 19.4062 14.7819 18.8438 15.0956C18.2812 15.4094 18 15.8983 18 16.5625V31.4375C18 32.1017 18.2812 32.5906 18.8438 32.9044C19.4062 33.2181 19.9792 33.2083 20.5625 32.875ZM24.0175 48C20.7142 48 17.6042 47.375 14.6875 46.125C11.7708 44.875 9.21875 43.1562 7.03125 40.9688C4.84375 38.7812 3.125 36.23 1.875 33.315C0.625 30.4 0 27.2854 0 23.9713C0 20.6571 0.625 17.5521 1.875 14.6562C3.125 11.7604 4.84375 9.21875 7.03125 7.03125C9.21875 4.84375 11.77 3.125 14.685 1.875C17.6 0.625 20.7146 0 24.0287 0C27.3429 0 30.4479 0.625 33.3438 1.875C36.2396 3.125 38.7812 4.84375 40.9688 7.03125C43.1562 9.21875 44.875 11.765 46.125 14.67C47.375 17.5754 48 20.6796 48 23.9825C48 27.2858 47.375 30.3958 46.125 33.3125C44.875 36.2292 43.1562 38.7812 40.9688 40.9688C38.7812 43.1562 36.235 44.875 33.33 46.125C30.4246 47.375 27.3204 48 24.0175 48Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="card-info">
                <div className="card-info-text">
                  <div className="card-subheading-container">
                    <Text typography="heading6" className="card-subheading">{card.subheading}</Text>
                    {/* 뱃지 UI 적용 */}
                    <Badge size="lg" color="primary">{card.badge}</Badge>
                  </div>
                  <Text typography="heading2" className="card-heading">{card.heading}</Text>
                  <Text typography="body1" className="card-description paragraph-lg">{card.description}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GridSection1; 