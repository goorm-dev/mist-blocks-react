import { useState, useEffect } from 'react';
import { Text, Nav } from '@vapor-ui/core';
import { debounce } from '../../utils/performanceUtils';
import './DetailRecruitmentProcess.css';

// 탭 구성
const PROCESS_TABS = [
  { key: 'first', label: '1차' },
  { key: 'second', label: '2차' }
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
}

const ProcessItem = ({ number, title, firstStageDate, firstStageDescription, secondStageDate, secondStageDescription, isLastItem }) => {
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
      setIsMobile(window.innerWidth < 575);
    };
    
    // 디바운스된 화면 크기 감지 함수
    const checkMobile = debounce(checkMobileOriginal, 200);
    
    // 초기 실행
    checkMobileOriginal();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 탭 변경 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 현재 활성 탭에 따른 데이터 필터링
  const getActiveStageData = (item) => {
    if (activeTab === 'first') {
      return {
        date: item.firstStageDate,
        description: item.firstStageDescription
      };
    } else {
      return {
        date: item.secondStageDate,
        description: item.secondStageDescription
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
      secondStageDescription: '지원서 및 고용24 수강신청'
    },
    {
      number: '2',
      title: '서류 합격',
      firstStageDate: '25.9.5 (금)',
      firstStageDescription: null,
      secondStageDate: '25.9.12 (금)',
      secondStageDescription: null
    },
    {
      number: '3',
      title: '면접',
      firstStageDate: '25.9.8 (월) - 25.9.9 (화)',
      firstStageDescription: null,
      secondStageDate: '25.9.15 (월) - 25.9.16 (화)',
      secondStageDescription: null
    },
    {
      number: '4',
      title: '최종 합격',
      firstStageDate: '25.9.10 (수)',
      firstStageDescription: null,
      secondStageDate: '25.9.17 (수)',
      secondStageDescription: null
    }
  ];

  return (
    <section className="content-section" id="faq">
      <div className="container">
        <Text typography="heading2" foreground="normal" className="title">
          지원에서 합류까지<br/>한눈에 확인하는 과정
        </Text>

        {/* 모바일 레이아웃 (575px 미만) */}
        {isMobile ? (
          <div className="mobile-process-wrapper">
            {/* Vapor Nav 컴포넌트로 탭 네비게이션 */}
            <Nav.Root size="lg" shape="fill" aria-label="지원 과정 단계 선택">
              <Nav.List className="process-nav-list">
                {PROCESS_TABS.map((tab) => (
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
          /* 데스크톱 레이아웃 (575px 이상) */
          <div className="process-content-wrapper">
            {/* 헤더 - 1차/2차 라벨 */}
            <div className="process-header">
              <div className="stage-header first-stage">
                <Text typography="subtitle1" foreground="hint">1차</Text>
              </div>
              <div className="stage-header second-stage">
                <Text typography="subtitle1" foreground="hint">2차</Text>
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
        )}
      </div>
    </section>
  );
};

export default DetailRecruitmentProcess;