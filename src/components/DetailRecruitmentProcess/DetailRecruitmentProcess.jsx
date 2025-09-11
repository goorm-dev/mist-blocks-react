'use client';

import { useState, useEffect } from 'react';
import { Text, Nav } from '@vapor-ui/core';
import { debounce } from '../../utils/performanceUtils';
import './DetailRecruitmentProcess.css';

// 탭 구성
const PROCESS_TABS = [
  { key: 'first', label: '1차 일정' },
  { key: 'second', label: '2차 일정' },
  { key: 'third', label: '3차 일정' },
];

// 모바일용 프로세스 아이템 컴포넌트
const MobileProcessItem = ({ number, title, stageDate, stageDescription, isLastItem }) => {
  return (
    <div className={`mobile-process-item ${isLastItem ? 'mobile-process-item-last' : ''}`}>
      <div className="mobile-process-header">
        <div className="process-number">
          <Text typography="heading6" foreground="accent" className="number-text">
            {number.padStart(2, '0')}
          </Text>
        </div>
        <div className="process-title">
          <Text typography="heading6" foreground="normal" className="title-text">
            {title}
          </Text>
        </div>
      </div>

      <div className="mobile-process-content">
        <Text typography="heading6" foreground="normal" className="stage-date">
          {stageDate}
        </Text>
        {stageDescription && (
          <Text typography="subtitle1" foreground="hint" className="stage-description">
            {stageDescription}
          </Text>
        )}
      </div>
    </div>
  );
};

const ProcessItem = ({
  number,
  title,
  firstStageDate,
  firstStageDescription,
  secondStageDate,
  secondStageDescription,
  thirdStageDate,
  thirdStageDescription,
  isLastItem,
}) => {
  return (
    <div className={`process-item ${isLastItem ? 'process-item-last' : ''}`}>
      <div className="process-item-header">
        <div className="process-number">
          <Text typography="heading6" foreground="accent" className="number-text">
            {number.padStart(2, '0')}
          </Text>
        </div>
        <div className="process-title">
          <Text typography="heading6" foreground="normal" className="title-text">
            {title}
          </Text>
        </div>
      </div>

      <div className="process-content">
        <div className="stage-info first-stage">
          <Text typography="heading6" foreground="normal" className="stage-date">
            {firstStageDate}
          </Text>
          {firstStageDescription && (
            <Text typography="subtitle1" foreground="hint" className="stage-description">
              {firstStageDescription}
            </Text>
          )}
        </div>
        <div className="stage-info second-stage">
          <Text typography="heading6" foreground="normal" className="stage-date">
            {secondStageDate}
          </Text>
          {secondStageDescription && (
            <Text typography="subtitle1" foreground="hint" className="stage-description">
              {secondStageDescription}
            </Text>
          )}
        </div>
        <div className="stage-info third-stage">
          <Text typography="heading6" foreground="normal" className="stage-date">
            {thirdStageDate}
          </Text>
          {thirdStageDescription && (
            <Text typography="subtitle1" foreground="hint" className="stage-description">
              {thirdStageDescription}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRecruitmentProcess = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(PROCESS_TABS[0].key);

  // 화면 크기 감지
  useEffect(() => {
    // 원본 감지 함수
    const checkMobileOriginal = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 769);
      }
    };

    // 디바운스된 화면 크기 감지 함수
    const checkMobile = debounce(checkMobileOriginal, 200);

    // 초기 실행
    checkMobileOriginal();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일 여부에 따라 기본 활성 탭 설정 (모바일: 3차, 데스크톱: 1차)
  useEffect(() => {
    if (isMobile) {
      setActiveTab('third');
    } else {
      setActiveTab('first');
    }
  }, [isMobile]);

  // 탭 변경 핸들러
  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  // 현재 활성 탭에 따른 데이터 필터링
  const getActiveStageData = item => {
    if (activeTab === 'first') {
      return {
        date: item.firstStageDate,
        description: item.firstStageDescription,
      };
    } else if (activeTab === 'second') {
      return {
        date: item.secondStageDate,
        description: item.secondStageDescription,
      };
    } else {
      return {
        date: item.thirdStageDate,
        description: item.thirdStageDescription,
      };
    }
  };

  const processItems = [
    {
      number: '1',
      title: '과정 지원',
      firstStageDate: '25.8.28 (목) - 25.9.4 (목)',
      firstStageDescription: '지원서 및 고용24 수강신청',
      secondStageDate: '25.9.5 (목) - 25.9.11 (목)',
      secondStageDescription: '지원서 및 고용24 수강신청',
      thirdStageDate: '25.9.12 (금) - 25.9.17 (수)',
      thirdStageDescription: '지원서 및 고용24 수강신청',
    },
    {
      number: '2',
      title: '서류 합격',
      firstStageDate: '25.9.5 (금)',
      firstStageDescription: null,
      secondStageDate: '25.9.12 (금)',
      secondStageDescription: null,
      thirdStageDate: '25.9.18 (목)',
      thirdStageDescription: null,
    },
    {
      number: '3',
      title: '면접',
      firstStageDate: '25.9.8 (월) - 25.9.9 (화)',
      firstStageDescription: null,
      secondStageDate: '25.9.15 (월) - 25.9.16 (화)',
      secondStageDescription: null,
      thirdStageDate: '25.9.19 (금)',
      thirdStageDescription: null,
    },
    {
      number: '4',
      title: '최종 합격',
      firstStageDate: '25.9.10 (수)',
      firstStageDescription: null,
      secondStageDate: '25.9.17 (수)',
      secondStageDescription: null,
      thirdStageDate: '25.9.19 (금)',
      thirdStageDescription: null,
    },
  ];

  return (
    <section className="content-section detail-process" id="process">
      <div className="container">
        <Text typography="heading2" foreground="normal" className="title">
          지원에서 합류까지
          <br />
          한눈에 확인하는 과정
        </Text>

        <div className="process-group">
          {/* 트랙 1: Lightning Pass */}
          <div className="process-category">
            <div className="process-header">
              <div className="process-text">
                <div className="process-header-group">
                  <Text typography="subtitle1" foreground="hint-darker" className="process-label">
                    TRACK 1
                  </Text>
                  <Text typography="heading3" foreground="normal" className="process-title">
                    Lightning Pass
                  </Text>
                </div>
                <Text typography="heading6" foreground="hint-darker" className="process-desc">
                  준비된 지원자는 셀프 영상 인터뷰만으로 선발됩니다.
                </Text>
              </div>
            </div>

            <div className="process-process">
              <div className="process-step">
                <div className="step-header">
                  <div className="step-number">
                    <Text typography="heading6" foreground="primary" className="step-number-text">
                      01
                    </Text>
                  </div>
                  <div className="step-title">
                    <Text typography="heading6" foreground="normal">
                      과정 지원
                    </Text>
                  </div>
                </div>
                <div className="step-content">
                  <Text typography="heading6" foreground="normal" className="step-date">
                    25.8.28 (목) - 25.9.17 (목)
                  </Text>
                  <Text typography="subtitle1" foreground="hint" className="step-desc">
                    지원서 및 고용24 수강신청
                  </Text>
                </div>
              </div>

              <div className="process-step">
                <div className="step-header">
                  <div className="step-number">
                    <Text typography="heading6" foreground="primary" className="step-number-text">
                      02
                    </Text>
                  </div>
                  <div className="step-title">
                    <Text typography="heading6" foreground="normal">
                      최종 합격
                    </Text>
                  </div>
                </div>
                <div className="step-content">
                  <Text typography="heading6" foreground="normal" className="step-date">
                    서류 제출 후 5영업일 이내 최종 합격 발표
                  </Text>
                  <Text typography="subtitle1" foreground="hint" className="step-desc">
                    본 전형은 별도의 면접 없이, 제출 서류를 바탕으로 최종 합격 여부가 안내됩니다.
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* 트랙 2: Portfolio Battle */}
          <div className="process-category">
            <div className="process-header">
              <div className="process-text">
                <div className="process-header-group">
                  <Text typography="subtitle1" foreground="hint-darker" className="process-label">
                    TRACK 2
                  </Text>
                  <Text typography="heading3" foreground="normal" className="process-title">
                    Portfolio Battle
                  </Text>
                </div>
                <Text typography="heading6" foreground="hint-darker" className="process-desc">
                  프로젝트와 포트폴리오만으로 빠르게 선발할 수 있습니다.
                </Text>
              </div>
            </div>

            <div className="process-process">
              <div className="process-step">
                <div className="step-header">
                  <div className="step-number">
                    <Text typography="heading6" foreground="primary" className="step-number-text">
                      01
                    </Text>
                  </div>
                  <div className="step-title">
                    <Text typography="heading6" foreground="normal">
                      과정 지원
                    </Text>
                  </div>
                </div>
                <div className="step-content">
                  <Text typography="heading6" foreground="normal" className="step-date">
                    25.8.28 (목) - 25.9.17 (목)
                  </Text>
                  <Text typography="subtitle1" foreground="hint" className="step-desc">
                    지원서 및 고용24 수강신청
                  </Text>
                </div>
              </div>

              <div className="process-step">
                <div className="step-header">
                  <div className="step-number">
                    <Text typography="heading6" foreground="primary" className="step-number-text">
                      02
                    </Text>
                  </div>
                  <div className="step-title">
                    <Text typography="heading6" foreground="normal">
                      최종 합격
                    </Text>
                  </div>
                </div>
                <div className="step-content">
                  <Text typography="heading6" foreground="normal" className="step-date">
                    서류 제출 후 5영업일 이내 최종 합격 발표
                  </Text>
                  <Text typography="subtitle1" foreground="hint" className="step-desc">
                    본 전형은 별도의 면접 없이, 제출 서류를 바탕으로 최종 합격 여부가 안내됩니다.
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* 트랙 3: Hidden Gem (기존 코드 유지) */}
          <div className="process-category">
            <div className="process-header">
              <div className="process-text">
                <div className="process-header-group">
                  <Text typography="subtitle1" foreground="hint-darker" className="process-label">
                    TRACK 3
                  </Text>
                  <Text typography="heading3" foreground="normal" className="process-title">
                    Hidden Gem
                  </Text>
                </div>
                <Text typography="heading6" foreground="hint-darker" className="process-desc">
                  가능성을 지닌 지원자는 그룹 면접으로 협업, 인성을 확인합니다.
                </Text>
              </div>
            </div>

            {/* 기존 Hidden Gem 프로세스 (1차/2차 구분) */}
            {isMobile ? (
              <div className="mobile-process-wrapper">
                <Nav.Root size="lg" shape="fill" aria-label="지원 과정 단계 선택">
                  <Nav.List className="process-nav-list">
                    {PROCESS_TABS.map(tab => (
                      <Nav.Item key={tab.key} className="process-nav-item">
                        <Nav.Link
                          as="button"
                          type="button"
                          className="process-nav-link"
                          selected={activeTab === tab.key}
                          onClick={() => handleTabClick(tab.key)}
                          aria-current={activeTab === tab.key ? 'page' : undefined}
                        >
                          {tab.label}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav.List>
                </Nav.Root>

                <div
                  className="mobile-process-items"
                  role="tabpanel"
                  id={`panel-${activeTab}`}
                  aria-labelledby={`tab-${activeTab}`}
                >
                  {processItems.map((item, index) => {
                    const stageData = getActiveStageData(item);
                    return (
                      <MobileProcessItem
                        key={index}
                        number={item.number}
                        title={item.title}
                        stageDate={stageData.date}
                        stageDescription={stageData.description}
                        isLastItem={index === processItems.length - 1}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="process-content-wrapper">
                <div className="stage-header-wrapper">
                  <div className="stage-header first-stage">
                    <Text typography="subtitle1" foreground="hint">
                      1차 일정
                    </Text>
                  </div>
                  <div className="stage-header second-stage">
                    <Text typography="subtitle1" foreground="hint">
                      2차 일정
                    </Text>
                  </div>
                  <div className="stage-header third-stage">
                    <Text typography="subtitle1" foreground="hint">
                      3차 일정
                    </Text>
                  </div>
                </div>

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
                      thirdStageDate={item.thirdStageDate}
                      thirdStageDescription={item.thirdStageDescription}
                      isLastItem={index === processItems.length - 1}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="process-notice">
          <Text typography="subtitle1" foreground="hint">
            ※ Lightning Pass, Portfolio Battle 전형은 선착순으로 조기 마감될 수 있습니다.
          </Text>
          <Text typography="subtitle1" foreground="hint">
            ※ Lightning Pass, Portfolio Battle 전형 지원자는 평가에 따라 Hidden Gem 면접 전형으로
            이어서 진행될 수 있습니다.
          </Text>
        </div>
      </div>
    </section>
  );
};

export default DetailRecruitmentProcess;
