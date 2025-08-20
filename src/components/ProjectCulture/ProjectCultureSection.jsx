import React from 'react';
import { Text, Badge } from '@vapor-ui/core';
import './ProjectCultureSection.css';

  const title = '조직 문화까지 체득하는\n대규모 팀 프로젝트';
  
  const projectCards = [
    {
      icon: (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.65005 8.02511L5.60005 8.85011C5.83338 8.38344 6.07505 7.93344 6.32505 7.50011C6.57505 7.06677 6.85005 6.63344 7.15005 6.20011L5.75005 5.92511L3.65005 8.02511ZM7.20005 10.1001L10.05 12.9251C10.75 12.6584 11.5 12.2501 12.3 11.7001C13.1 11.1501 13.85 10.5251 14.55 9.82511C15.7167 8.65844 16.6292 7.36261 17.2875 5.93761C17.9459 4.51261 18.2334 3.20011 18.15 2.00011C16.95 1.91677 15.6334 2.20427 14.2 2.86261C12.7667 3.52094 11.4667 4.43344 10.3 5.60011C9.60005 6.30011 8.97505 7.05011 8.42505 7.85011C7.87505 8.65011 7.46672 9.40011 7.20005 10.1001ZM11.65 8.47511C11.2667 8.09177 11.075 7.62094 11.075 7.06261C11.075 6.50427 11.2667 6.03344 11.65 5.65011C12.0334 5.26677 12.5084 5.07511 13.075 5.07511C13.6417 5.07511 14.1167 5.26677 14.5 5.65011C14.8834 6.03344 15.075 6.50427 15.075 7.06261C15.075 7.62094 14.8834 8.09177 14.5 8.47511C14.1167 8.85844 13.6417 9.05011 13.075 9.05011C12.5084 9.05011 12.0334 8.85844 11.65 8.47511ZM12.125 16.5001L14.225 14.4001L13.95 13.0001C13.5167 13.3001 13.0834 13.5709 12.65 13.8126C12.2167 14.0543 11.7667 14.2918 11.3 14.5251L12.125 16.5001ZM19.95 0.175106C20.2667 2.19177 20.0709 4.15427 19.3625 6.06261C18.6542 7.97094 17.4334 9.79177 15.7 11.5251L16.2 14.0001C16.2667 14.3334 16.25 14.6584 16.15 14.9751C16.05 15.2918 15.8834 15.5668 15.65 15.8001L11.45 20.0001L9.35005 15.0751L5.07505 10.8001L0.150049 8.70011L4.32505 4.50011C4.55838 4.26677 4.83755 4.10011 5.16255 4.00011C5.48755 3.90011 5.81672 3.88344 6.15005 3.95011L8.62505 4.45011C10.3584 2.71677 12.175 1.49177 14.075 0.775106C15.975 0.0584389 17.9334 -0.141561 19.95 0.175106ZM1.92505 13.9751C2.50838 13.3918 3.22088 13.0959 4.06255 13.0876C4.90422 13.0793 5.61672 13.3668 6.20005 13.9501C6.78338 14.5334 7.07088 15.2459 7.06255 16.0876C7.05422 16.9293 6.75838 17.6418 6.17505 18.2251C5.75838 18.6418 5.06255 19.0001 4.08755 19.3001C3.11255 19.6001 1.76672 19.8668 0.0500488 20.1001C0.283382 18.3834 0.550049 17.0376 0.850049 16.0626C1.15005 15.0876 1.50838 14.3918 1.92505 13.9751ZM3.35005 15.3751C3.18338 15.5418 3.01672 15.8459 2.85005 16.2876C2.68338 16.7293 2.56672 17.1751 2.50005 17.6251C2.95005 17.5584 3.39588 17.4459 3.83755 17.2876C4.27922 17.1293 4.58338 16.9668 4.75005 16.8001C4.95005 16.6001 5.05838 16.3584 5.07505 16.0751C5.09172 15.7918 5.00005 15.5501 4.80005 15.3501C4.60005 15.1501 4.35838 15.0543 4.07505 15.0626C3.79172 15.0709 3.55005 15.1751 3.35005 15.3751Z" fill="currentColor"/>
        </svg>

      ),
      title: '함께라서 가능한 스타트업 경험',
      description: 'TECH UP은 서로 다른 직군 18명이 모여 하나의 팀으로 협업합니다. 기획, 디자인, 개발 등 전 직군이 스타트업 환경을 재현하며 실전을 경험합니다.',
      badges: ['소규모 기업', '다양한 직군', '실무 경험']
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99995 20L0.999951 11.1L5.99995 5H14L19 11.1L9.99995 20ZM2.57495 5L0.449951 2.875L1.87495 1.475L3.99995 3.6L2.57495 5ZM8.99995 3V0H11V3H8.99995ZM17.375 5L15.95 3.575L18.075 1.45L19.5 2.875L17.375 5ZM9.99995 17.2L15.25 12H4.74995L9.99995 17.2ZM6.94995 7L4.47495 10H15.525L13.05 7H6.94995Z" fill="currentColor"/>
        </svg>

      ),
      title: '성장하는 스타트업의 팀 사이즈',
      description: '18명은 소통은 가능하지만 체계 없이는 운영이 어려운 규모입니다. 역할을 나누고 협업하며 실제 조직 운영을 그대로 체험합니다.',
      badges: ['조직 문화', '운영 효율', '협업']
    },
    {
      icon: (
        <svg width="20" height="18" viewBox="0 0 20 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18C2.9 18 1.95833 17.6083 1.175 16.825C0.391667 16.0417 0 15.1 0 14C0 12.9 0.391667 11.9583 1.175 11.175C1.95833 10.3917 2.9 10 4 10C5.1 10 6.04167 10.3917 6.825 11.175C7.60833 11.9583 8 12.9 8 14C8 15.1 7.60833 16.0417 6.825 16.825C6.04167 17.6083 5.1 18 4 18ZM16 18C14.9 18 13.9583 17.6083 13.175 16.825C12.3917 16.0417 12 15.1 12 14C12 12.9 12.3917 11.9583 13.175 11.175C13.9583 10.3917 14.9 10 16 10C17.1 10 18.0417 10.3917 18.825 11.175C19.6083 11.9583 20 12.9 20 14C20 15.1 19.6083 16.0417 18.825 16.825C18.0417 17.6083 17.1 18 16 18ZM4 16C4.55 16 5.02083 15.8042 5.4125 15.4125C5.80417 15.0208 6 14.55 6 14C6 13.45 5.80417 12.9792 5.4125 12.5875C5.02083 12.1958 4.55 12 4 12C3.45 12 2.97917 12.1958 2.5875 12.5875C2.19583 12.9792 2 13.45 2 14C2 14.55 2.19583 15.0208 2.5875 15.4125C2.97917 15.8042 3.45 16 4 16ZM16 16C16.55 16 17.0208 15.8042 17.4125 15.4125C17.8042 15.0208 18 14.55 18 14C18 13.45 17.8042 12.9792 17.4125 12.5875C17.0208 12.1958 16.55 12 16 12C15.45 12 14.9792 12.1958 14.5875 12.5875C14.1958 12.9792 14 13.45 14 14C14 14.55 14.1958 15.0208 14.5875 15.4125C14.9792 15.8042 15.45 16 16 16ZM10 8C8.9 8 7.95833 7.60833 7.175 6.825C6.39167 6.04167 6 5.1 6 4C6 2.9 6.39167 1.95833 7.175 1.175C7.95833 0.391667 8.9 0 10 0C11.1 0 12.0417 0.391667 12.825 1.175C13.6083 1.95833 14 2.9 14 4C14 5.1 13.6083 6.04167 12.825 6.825C12.0417 7.60833 11.1 8 10 8ZM10 6C10.55 6 11.0208 5.80417 11.4125 5.4125C11.8042 5.02083 12 4.55 12 4C12 3.45 11.8042 2.97917 11.4125 2.5875C11.0208 2.19583 10.55 2 10 2C9.45 2 8.97917 2.19583 8.5875 2.5875C8.19583 2.97917 8 3.45 8 4C8 4.55 8.19583 5.02083 8.5875 5.4125C8.97917 5.80417 9.45 6 10 6Z" fill="currentColor"/>
        </svg>

      ),
      title: '실무 수준의 협업 난이도 체험',
      description: '여러 기능을 동시에 개발하고 직군 간 종속성을 조율합니다. 단일 코드베이스에서 18명이 버전 관리하며 QA까지 수행해 협업을 익힙니다.',
      badges: ['DevOps', '코드 리뷰', '프로세스']
    },
    {
      icon: (
        <svg width="20" height="19" viewBox="0 0 20 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 19L7 4.95L4.8 15H0V13H3.2L6.025 0H8L11.05 14.3L13 6H15L16.8 13H20V15H15.25L14.05 10.3L12 19H10Z" fill="currentColor"/>
        </svg>

      ),
      title: '6개월 후, 달라진 당신',
      description: '대규모 협업 프로젝트와 다양한 네트워크를 확보합니다. 스타트업 문화와 프로세스를 익히며 복잡한 프로젝트를 완수하는 힘을 기릅니다.',
      badges: ['커리어 성장', '네트워크', '포트폴리오']
    }
  ];

const ProjectCultureSection = () => {
  return (
    <section className="content-section project-culture-section">
      <div className="container">
        <Text typography="heading2" className="title">{title}</Text>
        <div className="project-grid-wrapper">
          {projectCards.map((card, index) => (
            <div key={index} className="project-culture-content">
              {/* Gradient overlay for hover effect */}
              <div className="gradient-overlay">
                <svg 
                  className="gradient-svg" 
                  fill="none" 
                  viewBox="0 0 701 467" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="transform-gpu">
                    <path className="will-change-transform" d="M407.64 132.674 511.646 108l81.075 17.082V326.27H419.103l-31.111-98.696 19.648-94.9Z" fill="#FCD34D" data-svg-origin="387.99200439453125 108" transform="matrix(1,0,0,1,31.36287,-0.20357)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m357.667 186.498 72.448-19.143 56.475 13.253v156.09H365.651l-21.671-76.572 13.687-73.628Z" fill="#F59E0B" data-svg-origin="343.9800109863281 167.35499572753906" transform="matrix(1,0,0,1,-24.73095,-29.59005)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m471.471 217.57 58.714-9.647 45.77 6.679v78.666h-98.013l-17.563-38.591 11.092-37.107Z" fill="#D97706" data-svg-origin="460.3790283203125 207.92300415039062" transform="matrix(1,0,0,1,13.15042,6.88919)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m160.042 229.351 80.266-16.432 62.569 11.376v133.988H168.888l-24.009-65.73 15.163-63.202Z" fill="#B45309" data-svg-origin="144.87899780273438 212.91900634765625" transform="matrix(1,0,0,1,-26.55087,-30.88285)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m290.066 207.03 73.697-19.143 57.449 13.253v156.091H298.188l-22.044-76.573 13.922-73.628Z" fill="#92400E" data-svg-origin="276.14398193359375 187.88699340820312" transform="matrix(1,0,0,1,8.94762,8.71723)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m136.004 208.083 73.697-19.143 57.449 13.253v156.09H144.127l-22.045-76.572 13.922-73.628Z" fill="#78350F" data-svg-origin="122.08200073242188 188.9399871826172" transform="matrix(1,0,0,1,-31.99915,-6.78546)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m243.752 200.799 86.172-18.321 67.174 12.683v149.388H253.249l-25.776-73.284 16.279-70.466Z" fill="#451A03" data-svg-origin="227.47299194335938 182.47799682617188" transform="matrix(1,0,0,1,-22.48033,-27.85733)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m417.299 212.382 39.278-7.668 30.618 5.309v62.518h-65.567l-11.749-30.669 7.42-29.49Z" fill="#7C2D12" data-svg-origin="409.8790588378906 204.71400451660156" transform="matrix(1,0,0,1,31.60608,0.12566)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m145.653 194.349 93.505-19.143 72.89 13.253v156.09h-156.09l-27.97-76.573 17.665-73.627Z" fill="#991B1B" data-svg-origin="127.98797607421875 175.20599365234375" transform="matrix(1,0,0,1,-31.57057,-26.95806)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                    <path className="will-change-transform" d="m117.665 194.349 93.505-19.143 72.89 13.253v156.09H127.97L100 267.976l17.665-73.627Z" fill="#7F1D1D" data-svg-origin="100 175.20599365234375" transform="matrix(1,0,0,1,-26.91991,31.11664)" style={{translate: 'none', rotate: 'none', scale: 'none', transformOrigin: '0px 0px'}}></path>
                  </g>
                </svg>
              </div>
              
              <div className="project-culture-icon">
                <div className="icon-symbol" aria-hidden="true">
                  {card.icon}
                </div>
              </div>
              <div className="project-text-wrapper">
                <Text typography="heading4" foreground="normal" className="project-title">
                  {card.title}
                </Text>
                <Text typography="body1" foreground="normal-lighter" className="project-description">
                  {card.description}
                </Text>
              </div>
              <div className="project-badge-wrapper">
                {card.badges.map((badge, badgeIndex) => (
                  <Badge key={badgeIndex} color="danger" size="md">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCultureSection;
