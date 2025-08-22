import React from 'react';
import { Text } from '@vapor-ui/core';
import './DetailRecruitmentProcess.css';

const ProcessItem = ({ number, title, firstStageDate, firstStageDescription, secondStageDate, secondStageDescription, isLastItem }) => {
  return (
    <div className={`process-item ${isLastItem ? 'process-item-last' : ''}`}>
      <div className="process-item-header">
        <div className="process-number">
          <Text typography="body1" foreground="accent" className="number-text">
            {number.padStart(2, '0')}
          </Text>
        </div>
        <div className="process-title">
          <Text typography="body1" foreground="normal" className="title-text">
            {title}
          </Text>
        </div>
      </div>
      
      <div className="process-content">
        <div className="stage-info first-stage">
          <Text typography="subtitle1" foreground="normal" className="stage-date">
            {firstStageDate}
          </Text>
          {firstStageDescription && (
            <Text typography="subtitle2" foreground="hint" className="stage-description">
              {firstStageDescription}
            </Text>
          )}
        </div>
        <div className="stage-info second-stage">
          <Text typography="subtitle1" foreground="normal" className="stage-date">
            {secondStageDate}
          </Text>
          {secondStageDescription && (
            <Text typography="subtitle2" foreground="hint" className="stage-description">
              {secondStageDescription}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRecruitmentProcess = () => {
  const processItems = [
    {
      number: '1',
      title: '과정 지원',
      firstStageDate: '8/28(목) - 9/4(목)',
      firstStageDescription: '지원서 및 고용24 수강신청',
      secondStageDate: '9/5(목) - 9/11(목)',
      secondStageDescription: '지원서 및 고용24 수강신청'
    },
    {
      number: '2',
      title: '서류 합격',
      firstStageDate: '9/5(금)',
      firstStageDescription: null,
      secondStageDate: '9/12(금)',
      secondStageDescription: null
    },
    {
      number: '3',
      title: '면접',
      firstStageDate: '9/8(월) - 9/9(화)',
      firstStageDescription: null,
      secondStageDate: '9/15(월) - 9/16(화)',
      secondStageDescription: null
    },
    {
      number: '4',
      title: '최종 합격',
      firstStageDate: '9/10(수)',
      firstStageDescription: null,
      secondStageDate: '9/17(수)',
      secondStageDescription: null
    }
  ];

  return (
    <section className="content-section detail-recruitment-process-section" id="recruitment-process">
      <div className="container">
          <div className="section-inner">
            {/* 메인 타이틀 */}
            <div className="section-title">
              <Text typography="heading2" foreground="normal">
                지원에서 합류까지<br/>한눈에 확인하는 과정
              </Text>
            </div>

            {/* 프로세스 콘텐츠 */}
            <div className="process-content-wrapper">
              {/* 헤더 - 1차/2차 라벨 */}
              <div className="process-header">
                <div className="stage-header first-stage">
                  <Text typography="caption" foreground="hint">1차</Text>
                </div>
                <div className="stage-header second-stage">
                  <Text typography="caption" foreground="hint">2차</Text>
                </div>
              </div>

              {/* 프로세스 아이템 */}
              <div className="process-items">
                {processItems.map((item, index) => (
                  <ProcessItem
                    key={index}
                    number={item.number}
                    title={item.title}
                    firstStageDate={item.firstStageDate}
                    firstStageDescription={item.firstStageDescription}
                    secondStageDate={item.secondStageDate}
                    secondStageDescription={item.secondStageDescription}
                    isLastItem={index === processItems.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default DetailRecruitmentProcess;