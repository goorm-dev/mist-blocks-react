import { useState, useEffect } from 'react';
import { Text, Button, Badge, IconButton } from '@vapor-ui/core';
import './DetailHero.css';
import { LinkOutlineIcon } from '@vapor-ui/icons';
import { debounce } from '../../utils/performanceUtils';

import { formatPeriod, getRecruitmentStatus } from '../../utils/courseUtils';

const DetailHero = ({ 
  data,
  onEnrollClick,
  onShareClick 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  
  const {
    title,
    description,
    tags,
    detailImageDesktop,
    detailImageMobile
  } = data;

  // 이미지 경로 디버깅
  useEffect(() => {
    console.log('DetailHero 이미지 정보:', {
      title,
      detailImageDesktop,
      detailImageMobile,
      data
    });
  }, [title, detailImageDesktop, detailImageMobile, data]);

  // 화면 크기 감지
  useEffect(() => {
    // 원본 크기 감지 함수
    const checkScreenSizeOriginal = () => {
      const width = window.innerWidth;
      if (width <= 992) {
        setScreenSize('mobile');
      } else {
        setScreenSize('desktop');
      }
    };
    
    // 디바운스 적용된 크기 감지 함수
    const checkScreenSize = debounce(checkScreenSizeOriginal, 200);

    // 초기 체크
    checkScreenSizeOriginal();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    // 클린업
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { statusType } = getRecruitmentStatus(data.startAt, data.endAt);

  const getCtaButtonConfig = (statusType) => {
    console.log(statusType)
    switch (statusType) {
      case 'close':
        return {
          text: "모집이 마감되었습니다",
          link: null,
          disabled: true
        };
      case 'contrast':
        return {
          text: "오픈 알림 신청하기",
          link: "https://gem.goorm.io/submissions/ktcloudtechup/openalarm",
          disabled: false
        };
      case 'open':
        return {
          text: `${data.title} 지원하기`,
          link: `https://gem.goorm.io/submissions/ktcloudtechup/${data.keyword}`,
          disabled: false
        };
    }
  };

  const ctaButton = getCtaButtonConfig(statusType);
  
  console.log(getCtaButtonConfig(statusType))

  const shareButton = {
     link: window.location.href,
  }

  const courseInfo = [
      {
        label: "지원 일정",
        value: `${formatPeriod(data.startAt, data.endAt)}`
      },
      {
        label: "교육 일정", 
        value: `${formatPeriod(data.eventStartAt, data.eventEndAt)}`
      },
      {
        label: "모집 인원",
        value: `${data.recruitedPeopleAmount}명`
      },
      {
        label: "교육 방법",
        value: "온라인 / 비대면 실시간"
      }
  ]

  const handleEnrollClick = () => {
    if (onEnrollClick) {
      onEnrollClick();
    } else if (ctaButton.onClick) {
      ctaButton.onClick();
    }
  };

  const handleShareClick = async () => {
    try {
      // 링크 복사
      await navigator.clipboard.writeText(shareButton.link);
      
      if (onShareClick) {
        onShareClick();
      } else if (shareButton.onClick) {
        shareButton.onClick();
      }
      
      // 복사 성공 상태로 변경
      setIsCopied(true);
      
      // 2초 후 원래 상태로 복원
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      
    } catch (err) {
      console.error("링크 복사 실패:", err);
      // 폴백: 구식 브라우저 지원
      const textArea = document.createElement("textarea");
      textArea.value = shareButton.link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      // 복사 성공 상태로 변경
      setIsCopied(true);
      
      // 2초 후 원래 상태로 복원
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <section className="content-hero-section detail-hero-section">
      <div className="container">
        <div className="detail-hero-wrap grid grid-cols-12">
          <div className="hero-left col-span-5">
            <div className="course-thumbnail">
              {/* PC용 이미지 (992px 초과) */}
              <img 
                src={detailImageDesktop} 
                alt={`${title} 상세 이미지 (PC)`} 
                className="course-thumbnail-image desktop-image"
                onError={(e) => {
                  console.error('PC 이미지 로드 실패:', detailImageDesktop);
                  e.target.style.display = 'none';
                }}
              />
              {/* 모바일용 이미지 (992px 이하) */}
              <img 
                src={detailImageMobile} 
                alt={`${title} 상세 이미지 (모바일)`} 
                className="course-thumbnail-image mobile-image"
                onError={(e) => {
                  console.error('모바일 이미지 로드 실패:', detailImageMobile);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="hero-right col-span-7">
            <div className="hero-right-wrap">
              <div className="detail-course-info">
                <div className="detail-hero-course-text">
                  <Text typography="heading1" foreground="normal" className="course-title">
                    {title}
                  </Text>
                  <Text typography="body1" foreground="hint" className="course-description">
                    {description}
                  </Text>
                </div>
                <div className="badge-wrap">
                  {tags.map((tag, index) => (
                    <Badge key={index} size="md" color="danger">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="cta-wrap">
                {ctaButton.link && !ctaButton.disabled ? (
                  <a target='_blank' href={ctaButton.link} className="cta-enroll-link w-full">
                    <Button 
                      size="xl" 
                      color="primary" 
                      stretch="true" 
                      className="cta-enroll"
                      onClick={handleEnrollClick}
                    >
                      {ctaButton.text}
                    </Button>
                  </a>
                ) : (
                  <Button 
                    size="xl" 
                   color="primary" 
                    stretch="true" 
                    className="cta-enroll"
                    onClick={ctaButton.disabled ? undefined : handleEnrollClick}
                    disabled={ctaButton.disabled}
                  >
                    {ctaButton.text}
                  </Button>
                )}
                {statusType === 'open' && (
                  isCopied ? (
                    <Button 
                      size="xl" 
                      color="secondary" 
                      className="cta-share"
                      disabled
                    >
                      복사됨
                    </Button>
                  ) : (
                    <IconButton 
                      size="xl" 
                      color="secondary" 
                      className="cta-share"
                      onClick={handleShareClick}
                    >
                      <LinkOutlineIcon />
                    </IconButton>
                  )
                )}
              </div>
              <div className="course-info-detail">
                {courseInfo.map((info, index) => (
                  <div key={index} className="course-info-detail-item">
                    <Text typography="subtitle1" foreground="hint">
                      {info.label}
                    </Text>
                    <Text typography="heading5" foreground="normal">
                      {info.value}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailHero;
