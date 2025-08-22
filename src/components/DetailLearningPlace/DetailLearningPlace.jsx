import React from 'react';
import './DetailLearningPlace.css';
import { Text } from '@vapor-ui/core';

const DetailLearningPlace = () => {
  // 이미지 배열 - 실제 이미지 경로로 변경해야 함
  const images = [
    "https://placehold.co/384x218",
    "https://placehold.co/384x218",
    "https://placehold.co/384x218",
    "https://placehold.co/384x218",
  ];

  return (
    <section className="content-section">
      <div className="container">
          <Text typography='heading2'>몰입과 협업이 공존하는<br/>열린 학습 공간</Text>
      </div>
      {/* Full-width slider container outside of container constraints */}
      <div className="learning-place-slider-container">
          {/* 두 슬라이더를 부모 컨테이너 안에 위치시킵니다 */}
          <div className="learning-place-slider original">
            {images.map((image, index) => (
              <div 
                key={`original-${index}`}
                className="learning-place-slide"
              >
                <img src={image} alt={`학습 공간 ${index + 1}`} className="learning-place-image" />
              </div>
            ))}
          </div>
          <div className="learning-place-slider clone">
            {images.map((image, index) => (
              <div 
                key={`clone-${index}`}
                className="learning-place-slide"
              >
                <img src={image} alt={`학습 공간 ${index + 1}`} className="learning-place-image" />
              </div>
            ))}
          </div>
      </div>
      <div className="container">

        <div className="learning-places-container">
          {/* 구름스퀘어 강남 카드 */}
          <div className="learning-place-card">
            <div className="learning-place-card-header">
              <div className="learning-place-card-title">구름스퀘어 강남</div>
            </div>
            <div className="learning-place-card-content">
              <div className="learning-place-card-description">
                서울특별시 강남구 테헤란로 142 (역삼동) 아크플레이스 2층
              </div>
            </div>
          </div>
          
          {/* TECH UP 메타버스 카드 */}
          <div className="learning-place-card">
            <div className="learning-place-card-header">
              <div className="learning-place-card-title">TECH UP 메타버스</div>
            </div>
            <div className="learning-place-card-content">
              <div className="learning-place-card-description">
                온라인 실시간 메타버스 강의실에서 학습합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailLearningPlace;