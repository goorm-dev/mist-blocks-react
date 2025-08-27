'use client';

import { Button, Text } from '@vapor-ui/core';
import './PreBannerSection.css';

const PreBannerSection = () => {
  const bannerData = {
    title: 'TECH UP 사전 온라인 설명회',
    subtitle:
      '사전설명회, 단순한 설명이 아닙니다. 커리어와 혜택의 출발점입니다.<br />상세 이벤트는 지원서에서 확인해주세요.',
    subtitleMobile:
      '사전설명회, 단순한 설명이 아닙니다.<br />커리어와 혜택의 출발점입니다.<br />상세 이벤트는 지원서에서 확인해주세요.',
    schedule: '25.9.4 (목) 19:00, ZOOM',
    buttonText: 'LIVE 신청하기',
    buttonLink:
      'https://gem.goorm.io/spaces/space_68760419fd5f865c3926eb2d/courses/course_68a70354d1bc229bd95af294/submissions/submission_68a6fc86d1bc229bd95ae9a0',
  };

  const handleApplyClick = () => {
    window.open(bannerData.buttonLink, '_blank');
  };

  return (
    <section className="pre-banner-section">
      <div className="container">
        <div className="pre-content-wrapper">
          <div className="pre-text-content">
            <div className="pre-text-wrapper">
              <Text typography="heading3" foreground="normal" className="pre-banner-title">
                {bannerData.title}
              </Text>
              <Text
                typography="heading6"
                foreground="normal-lighter"
                className="pre-banner-subtitle"
                dangerouslySetInnerHTML={{ __html: bannerData.subtitle }}
              />
              <Text
                typography="heading6"
                foreground="normal-lighter"
                className="pre-banner-subtitle-mobile"
                dangerouslySetInnerHTML={{ __html: bannerData.subtitleMobile }}
              />
            </div>
            <Text typography="heading6" foreground="normal" className="pre-banner-schedule">
              {bannerData.schedule}
            </Text>
          </div>
          <Button
            color="primary"
            size="xl"
            varient="fill"
            onClick={handleApplyClick}
            className="apply-button"
          >
            {bannerData.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreBannerSection;
