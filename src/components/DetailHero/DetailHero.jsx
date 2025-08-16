import React, { useState } from 'react';
import { Text, Button, Badge, IconButton } from '@vapor-ui/core';
import './DetailHero.css';
import { LinkOutlineIcon } from '@vapor-ui/icons';

// 재사용 가능한 데이터 구조
const defaultDetailHeroData = {
  title: "풀스택",
  description: "풀스택 개발 풀스택 개발 풀스택 개발 풀스택 개발 풀스택 개발",
  tags: ["태그1", "태그2", "태그3", "태그4", "태그5"],
  ctaButton: {
    text: "풀스택 개발 지원하기",
    link: "/fullstack",
  },
  shareButton: {
    link: window.location.href,
  },
  courseInfo: [
    {
      label: "지원 일정",
      value: "12.6 (금) - 12.22 (일)"
    },
    {
      label: "교육 일정", 
      value: "12.6 (금) - 12.22 (일)"
    },
    {
      label: "모집 인원",
      value: "54명"
    },
    {
      label: "교육 방법",
      value: "온라인 / 비대면 실시간"
    }
  ]
};

const DetailHero = ({ 
  data = defaultDetailHeroData,
  onEnrollClick,
  onShareClick 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const {
    title,
    description,
    tags,
    ctaButton,
    shareButton,
    courseInfo
  } = data;

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
              {/* 썸네일 이미지가 들어갈 영역 */}
            </div>
          </div>
          <div className="hero-right col-span-7">
            <div className="hero-right-wrap">
              <div className="detail-course-info">
                <div className="detail-course-text">
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
                {ctaButton.link ? (
                  <a href={ctaButton.link} className="cta-enroll-link w-full">
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
                    onClick={handleEnrollClick}
                  >
                    {ctaButton.text}
                  </Button>
                )}
                {isCopied ? (
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
