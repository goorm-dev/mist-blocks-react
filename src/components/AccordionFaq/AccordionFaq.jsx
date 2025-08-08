import React, { useState } from 'react';
import { Nav, Text, Card } from '@vapor-ui/core';
import ReactMarkdown from 'react-markdown';
import './AccordionFaq.css';

// FAQ 데이터 템플릿 (실제 데이터는 상위에서 props로 받아도 됨)
const FAQ_TABS = [
  { key: 'category1', label: '카테고리 1' },
  { key: 'category2', label: '카테고리 2' },
  { key: 'category3', label: '카테고리 3' },
  { key: 'category4', label: '카테고리 4' },
  { key: 'category5', label: '카테고리 5' },
];

const FAQ_DATA = {
  category1: [
    { question: '질문 1', answer: '답변 1' },
    { question: '질문 2', answer: '답변 2' },
    { question: '질문 3', answer: '답변 3' },
  ],
  category2: [
    { question: '질문 4', answer: '답변 4' },
    { question: '질문 5', answer: '답변 5' },
  ],
  category3: [
    { question: '질문 6', answer: '답변 6' },
    { question: '질문 7', answer: '답변 7' },
  ],
  category4: [
    { question: '질문 8', answer: '답변 8' },
    { question: '질문 9', answer: '답변 9' },
  ],
  category5: [
    { question: '질문 10', answer: '답변 10' },
    { question: '질문 11', answer: '답변 11' },
  ],
};

const AccordionFaq = () => {
  const [activeTab, setActiveTab] = useState(FAQ_TABS[0].key);
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleTabClick = (key) => {
    setActiveTab(key);
    setOpenIndexes([]); // 탭 변경 시 아코디언 모두 닫기
  };

  const handleAccordionClick = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [idx]
    ); // 하나만 열리게
  };

  return (
    <section className="content-section faq-section">
      <div className="container">
        <Text typography="heading2" className="title">FAQ</Text>
        {/* Vapor Nav 컴포넌트로 탭 네비게이션 */}
        <Nav.Root className="faq-nav" size="lg" shape="fill" aria-label="FAQ 카테고리 선택">
          <Nav.List className="faq-nav-list">
            {FAQ_TABS.map((tab) => (
              <Nav.Item key={tab.key} className="faq-nav-item">
                <Nav.Link
                  as="button"
                  type="button"
                  className="faq-nav-link"
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
        {/* FAQ 아코디언 */}
        <div className="faq-content">
          {FAQ_DATA[activeTab].map((item, idx) => (
            <Card.Root key={idx} className="faq-card">
              <Card.Header style={{ padding: 0 }} className="faq-card-header">
                <button
                  className="faq-toggle-btn"
                  onClick={() => handleAccordionClick(idx)}
                  aria-expanded={openIndexes.includes(idx)}
                >
                  <Text typography="heading6" className="faq-question">{item.question}</Text>
                  <span className="faq-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </Card.Header>
              {openIndexes.includes(idx) && (
                <Card.Body className="faq-card-body">
                  <div className="faq-answer">
                    <ReactMarkdown>{item.answer}</ReactMarkdown>
                  </div>
                </Card.Body>
              )}
            </Card.Root>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccordionFaq; 