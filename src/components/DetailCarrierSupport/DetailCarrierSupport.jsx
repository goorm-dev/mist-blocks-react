import React from 'react';
import { Text } from '@vapor-ui/core';
import './DetailCarrierSupport.css';

// 아이콘 컴포넌트들
const DocumentIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PresentationIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const AwardIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// 텍스트 줄바꿈 처리 함수
const renderTextWithBreaks = (text) => {
  if (!text) return null;
  
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

// 아이콘 렌더링 함수
const renderIcon = (iconType) => {
  const iconMap = {
    document: <DocumentIcon />,
    code: <CodeIcon />,
    presentation: <PresentationIcon />,
    award: <AwardIcon />
  };
  
  return iconMap[iconType] || null;
};

// 멘토링 카드 컴포넌트 (이미지 배경, 2칸 차지)
const MentoringCard = () => (
  <div className="career-card career-card--image-overlay career-card--span-2" id="mentoring">
    <div className="career-card__background" style={{backgroundImage: 'url(https://placehold.co/558x249)'}}></div>
    <div className="career-card__overlay"></div>
    
    <div className="career-card__content">
      <div className="career-card__text">
        <Text 
          typography="heading5" 
          foreground="normal"
          className="career-card__title"
        >
          kt cloud 현직자 멘토링
        </Text>
        
        <Text 
          typography="body2" 
          foreground="hint"
        >
          kt cloud 현직자가 직접 멘토링합니다.
        </Text>
      </div>
    </div>
  </div>
);

// 특강 카드 컴포넌트 (기본형)
const SpecialLectureCard = () => (
  <div className="career-card career-card--default" id="special-lecture">
    <div className="career-card__content">
      <div className="career-card__text">
        <Text 
          typography="heading5" 
          foreground="normal"
          className="career-card__title"
        >
          kt cloud 현직자 특강
        </Text>
      </div>
      <div className="career-card__icon">
        {renderIcon('presentation')}
      </div>
    </div>
  </div>
);

// 해커톤 카드 컴포넌트 (작은 이미지)
const HackathonCard = () => (
  <div className="career-card career-card--image-small" id="hackathon">
    <div className="career-card__background" style={{backgroundImage: 'url(https://placehold.co/267x249)'}}></div>
    
    <div className="career-card__content">
      <div className="career-card__text">
        <Text 
          typography="heading5" 
          foreground="normal"
          className="career-card__title"
        >
          kt cloud 연합 해커톤
        </Text>
      </div>
    </div>
  </div>
);

// 포트폴리오 컨설팅 카드 컴포넌트 (강조 레드)
const PortfolioCard = () => (
  <div className="career-card career-card--highlight-red" id="portfolio">
    <div className="career-card__content">
      <div className="career-card__text">
        <Text 
          typography="heading4" 
          foreground="accent"
          className="career-card__title"
        >
          {renderTextWithBreaks('kt cloud 이력서,\n포트폴리오 컨설팅')}
        </Text>
      </div>
      <div className="career-card__icon">
        {renderIcon('document')}
      </div>
    </div>
  </div>
);

// 코드리뷰 카드 컴포넌트 (기본형)
const CodeReviewCard = () => (
  <div className="career-card career-card--default" id="code-review">
    <div className="career-card__content">
      <div className="career-card__text">
        <Text 
          typography="heading5" 
          foreground="normal"
          className="career-card__title"
        >
          {renderTextWithBreaks('kt cloud 현직자\n코드리뷰')}
        </Text>
      </div>
      <div className="career-card__icon">
        {renderIcon('code')}
      </div>
    </div>
  </div>
);

// 채용지원 카드 컴포넌트 (중앙 강조, 2칸 차지)
const HiringSupportCard = () => (
  <div className="career-card career-card--center-highlight career-card--span-2" id="hiring-support">
    <div className="career-card__content">
      <div className="career-card__text">
        <Text 
          typography="heading5" 
          foreground="normal"
          className="career-card__title"
        >
          우수 수료생 KT 채용 지원 시 우대
        </Text>
      </div>
      <div className="career-card__icon">
        {renderIcon('award')}
      </div>
    </div>
  </div>
);

// 추천사 데이터
const TESTIMONIAL_DATA = {
  message: "효과적인 제품 디자인은 사용자와의 소통에서 시작됩니다. KT Cloud 디자이너 과정은\n디자인 씽킹과 사용자 중심 디자인, 기술 협업을 기반으로 학습자들에게 창의적이고 실용적인 디자인 역량을 제공합니다.\n여러분의 디자인이 세상을 변화시킬 것을 기대합니다.",
  author: "제이슨",
  company: "구름",
  profileImage: "https://placehold.co/242x302",
  backgroundImage: "https://placehold.co/532x532"
};

const DetailCarrierSupport = () => {
  return (
    <section className="content-section detail-carrier-support" id="carrier_support">
      <div className="container">
        <div className="content-wrapper">
          {/* 섹션 제목 */}
          <div className="section-title">
            <Text typography="heading2" foreground="normal">
              목표를 현실로 만드는<br/>맞춤형 커리어 지원
            </Text>
          </div>
          
          {/* 캐리어 지원 그리드 */}
          <div className="career-grid">
            <MentoringCard />
            <SpecialLectureCard />
            <HackathonCard />
            <PortfolioCard />
            <CodeReviewCard />
            <HiringSupportCard />
          </div>
          
          {/* 추천사 섹션 */}
          <div className="testimonial-section">
            <div className="testimonial-background" style={{backgroundImage: `url(${TESTIMONIAL_DATA.backgroundImage})`}}></div>
            <div className="testimonial-overlay"></div>
            
            <div className="testimonial-content">
              <div className="testimonial-profile">
                <img 
                  src={TESTIMONIAL_DATA.profileImage} 
                  alt={TESTIMONIAL_DATA.author}
                  className="testimonial-profile-image"
                />
              </div>
              
              <div className="testimonial-text-content">
                <div className="testimonial-message">
                  <Text typography="body1" foreground="normal" className="testimonial-text">
                    {renderTextWithBreaks(TESTIMONIAL_DATA.message)}
                  </Text>
                </div>
                
                <div className="testimonial-author">
                  <Text typography="body1" foreground="normal" className="testimonial-author-name">
                    {TESTIMONIAL_DATA.author}
                  </Text>
                  <Text typography="body1" foreground="hint" className="testimonial-author-company">
                    {TESTIMONIAL_DATA.company}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailCarrierSupport;