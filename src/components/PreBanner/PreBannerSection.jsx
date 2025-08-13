import React from 'react';
import { Button, Text } from '@vapor-ui/core';
import './PreBannerSection.css';

const PreBannerSection = () => {
  const bannerData = {
    title: 'TECH UP 사전 온라인 설명회',
    subtitle: '사전 설명회 참석하고 에어팟 프로 받자!',
    schedule: '25.9.4 (목) 19:00, ZOOM',
    buttonText: 'LIVE 신청하기',
    buttonLink: ''
  };

  const handleApplyClick = () => {
    window.open(bannerData.buttonLink, '_blank');
  };

  return (
    <section className="content-section pre-banner-section">
      <div className="container">
        <div className="pre-content-wrapper">
            <div className="pre-text-content">
              <div className="pre-text-wrapper">
                <Text typography="heading3" foreground="normal" className="pre-banner-title">{bannerData.title}</Text>
                <Text typography="heading6" foreground="normal" className="pre-banner-subtitle">{bannerData.subtitle}</Text>
              </div>
              <Text typography="heading6" foreground="hint-darker" className="pre-banner-schedule">{bannerData.schedule}</Text>
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
