import { useState, useEffect } from 'react';
import { Text } from '@vapor-ui/core';
import './DetailLearnCation.css';

// 카드 데이터 상수화
const LEARN_CATION_CARDS = [
  {
    id: 0,
    title: '우수 훈련생에게 주어지는<br/>제주에서의 특별한 경험',
    description: '학습(Learn)과 휴가(Vacation)<br/>집이 아닌 새로운 공간에서 학습과 휴가를 동시에 경험하세요.',
    caption: '* 우수 훈련생 조건 - 직전 3개월 평균 출석율 100%',
    image: '/assets/techup_learncation_01.png',
    alt: '제주에서의 특별한 경험'
  },
  {
    id: 1,
    title: '휴가와 학습을 동시에',
    description: '제주도에서 온/오프라인으로 프로젝트를 수행하며<br/>챌린저들과 추억을 만들어보세요.',
    caption: '',
    image: '/assets/techup_learncation_02.png',
    alt: '휴가와 학습을 동시에'
  },
  {
    id: 2,
    title: '함께하는 성장과 네트워킹',
    description: '챌린저들과 오프라인에서 협업하고 교류하며<br/>소중한 네트워크를 만들어갑니다.',
    caption: '',
    image: '/assets/techup_learncation_03.png',
    alt: '함께하는 성장과 네트워킹'
  }
];

const DetailLearnCation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 윈도우 사이즈 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 이미지 hover 이벤트 핸들러
  const handleImageHover = (index) => {
    if (!isMobile) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="content-section">
      <div className="container">
            {/* 메인 타이틀 */}
              <Text typography="heading2" foreground="normal" className='title'>
                배우고, 쉬고, 연결되는<br/>TECH UP 런케이션
              </Text>
            
            {/* 런케이션 이미지 그리드 */}
            <div className="learn-cation-grid">
              {LEARN_CATION_CARDS.map((card, index) => (
                <div 
                  key={card.id}
                  className={`learn-cation-main-card ${activeIndex === index ? 'active' : ''}`}
                  onMouseEnter={() => handleImageHover(index)}
                >
                  <div className="image-container">
                    <div className="image-overlay"></div>
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="main-image"
                    />
                  </div>
                  {(isMobile || activeIndex === index) && (
                    <div className="card-content">
                      <div className="card-text">
                        <Text typography="heading3" foreground="accent">
                          <span dangerouslySetInnerHTML={{ __html: card.title }} />
                        </Text>
                        <Text typography="body1" foreground="accent" className='learn-cation-description'>
                          <span dangerouslySetInnerHTML={{ __html: card.description }} />
                        </Text>
                      </div>
                      {card.caption && (
                        <Text typography="caption" foreground="accent" className='learn-cation-caption'>
                          {card.caption}
                        </Text>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
        </div>
    </section>
  );
};

export default DetailLearnCation;