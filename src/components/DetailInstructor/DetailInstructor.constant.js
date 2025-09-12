import { COURSE } from "../../constants/CourseInformation";

export const INSTRUCTOR_PROFILES = [
  {
    id: 1,
    name: "김클라우드",
    role: "kt cloud TECH UP 풀스택 개발 강사",
    description: "200여 종 솔루션 운영 경험을 담은 실무형 풀스택 교육을 통해 프론트엔드부터 백엔드, 생성형 AI까지<br>프로젝트 실습으로 웹 서비스 개발 전 과정을 완성할 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/mentor/techup_mentor_avatar_5.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 풀스택 개발 강사"
      },
      {
        badge: "이전", 
        description: "PaaS-TA 플랫폼 아키텍트"
      },
      {
        badge: "이전",
        description: "마이크로서비스 전문가"
      }
    ],
    course: COURSE.FULLSTACK,
  },
  {
    id: 2,
    name: "박프론트",
    role: "kt cloud TECH UP 프론트엔드 강사",
    description: "전국 거점 CDN 구축 노하우를 바탕으로 웹·앱 로딩 속도를 최적화하는 프론트엔드 실습 교육을 통해 React, SSR, UI/UX 최적화를 배우고 실무 역량을 강화할 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_frontend.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 프론트엔드 강사"
      },
      {
        badge: "이전", 
        description: "React 전문가"
      },
      {
        badge: "이전",
        description: "CDN 최적화 전문가"
      }
    ],
    course: COURSE.FRONTEND,
  },
  {
    id: 3,
    name: "이백엔드",
    role: "kt cloud TECH UP 백엔드 강사",
    description: "월 가용성 99.95%를 달성한 운영 경험을 기반으로 대규모 트래픽을 처리하는 백엔드 시스템을 배우는 실습 중심 교육을 통해 Java Spring, MSA, 무중단 배포까지 마스터할 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_backend.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 백엔드 강사"
      },
      {
        badge: "이전", 
        description: "Java Spring 전문가"
      },
      {
        badge: "이전",
        description: "MSA 아키텍트"
      }
    ],
    course: COURSE.BACKEND,
  },
  {
    id: 4,
    name: "최AI",
    role: "kt cloud TECH UP 생성형 AI 강사",
    description: "H100 GPU 기반 AI 파운드리 플랫폼을 활용한 생성형 AI 실습 교육을 통해 프롬프트 엔지니어링, RAG, LLM 모델 활용까지 프로젝트 기반으로 AI 서비스 개발 역량을 완성할 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_gen-ai.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 생성형 AI 강사"
      },
      {
        badge: "이전", 
        description: "LLM 전문가"
      },
      {
        badge: "이전",
        description: "AI 파운드리 아키텍트"
      }
    ],
    course: COURSE.GEN_AI,
  },
  {
    id: 5,
    name: "정보안",
    role: "kt cloud TECH UP 사이버 보안 강사",
    description: "국내 최초 공공 클라우드 보안 인증 '상' 등급을 획득한 kt cloud의 보안 아키텍처를 기반으로 한 실습 중심 교육을 통해 IAM, DevSecOps, 보안 자동화까지 한 번에 배울 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_cybersecurity.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 사이버 보안 강사"
      },
      {
        badge: "이전", 
        description: "클라우드 보안 전문가"
      },
      {
        badge: "이전",
        description: "DevSecOps 아키텍트"
      }
    ],
    course: COURSE.INFORMATION_SECURITY,
  },
  {
    id: 6,
    name: "김네이티브",
    role: "kt cloud TECH UP 클라우드 네이티브 강사",
    description: "전국 14개 데이터센터 운영 노하우를 기반으로 클라우드 환경 설계부터 자동화까지 배우는 실무 중심 교육을 통해 Docker, Kubernetes, CI/CD를 실습하며 DevOps 전문가로 성장할 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_cloud-native.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 클라우드 네이티브 강사"
      },
      {
        badge: "이전", 
        description: "Kubernetes 전문가"
      },
      {
        badge: "이전",
        description: "DevOps 아키텍트"
      }
    ],
    course: COURSE.CLOUD_NATIVE,
  },
  {
    id: 7,
    name: "박인프라",
    role: "kt cloud TECH UP 클라우드 인프라 강사",
    description: "국내 최대 민간 GPU 클라우드 인프라 운영 경험을 바탕으로 멀티 클라우드 환경 구축부터 자동화까지 실습합니다. Azure까지 아우르는 인프라 전문가로 성장할 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_cloud-infra.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 클라우드 인프라 강사"
      },
      {
        badge: "이전", 
        description: "GPU 클라우드 전문가"
      },
      {
        badge: "이전",
        description: "멀티 클라우드 아키텍트"
      }
    ],
    course: COURSE.CLOUD_INFRASTRUCTURE,
  },
  {
    id: 8,
    name: "이디자인",
    role: "kt cloud TECH UP 프로덕트 디자인 강사",
    description: "수십 가지 클라우드 상품의 UX 설계 경험을 담은 실무형 교육을 통해 디자인 시스템 구축부터 데이터 기반 UI/UX 개선, 생성형 AI 활용까지 실전 중심으로 배울 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_product-design.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 프로덕트 디자인 강사"
      },
      {
        badge: "이전", 
        description: "UX 설계 전문가"
      },
      {
        badge: "이전",
        description: "디자인 시스템 아키텍트"
      }
    ],
    course: COURSE.PRODUCT_DESIGN,
  },
  {
    id: 9,
    name: "최매니지먼트",
    role: "kt cloud TECH UP 프로덕트 매니지먼트 강사",
    description: "공공 클라우드 시장 점유율 42% 1위를 달성한 kt cloud의 PM 노하우를 기반으로 한 실무 중심 교육을 통해 데이터 분석부터 애자일, 생성형 AI 활용까지 제품 개발 전 과정을 경험할 수 있도록 지도합니다.",
    image: "https://statics.goorm.io/ktcloud-techup/landing/assets/instructor/techup_instructor_product-management.png",
    careers: [
      {
        badge: "현재",
        description: "kt cloud TECH UP 프로덕트 매니지먼트 강사"
      },
      {
        badge: "이전", 
        description: "제품 기획 전문가"
      },
      {
        badge: "이전",
        description: "애자일 전문가"
      }
    ],
    course: COURSE.PRODUCT_MANAGEMENT,
  }
];
