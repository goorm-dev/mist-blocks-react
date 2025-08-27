export const COURSE = {
    PRODUCT_DESIGN: "PRODUCT_DESIGN",
    PRODUCT_MANAGEMENT: "PRODUCT_MANAGEMENT",
    FULLSTACK: "FULLSTACK",
    FRONTEND: "FRONTEND",
    BACKEND: "BACKEND",
    GEN_AI: "GEN_AI",
    INFORMATION_SECURITY: "INFORMATION_SECURITY",
    CLOUD_NATIVE: "CLOUD_NATIVE",
    CLOUD_INFRASTRUCTURE: "CLOUD_INFRASTRUCTURE"
}

export const COURSE_LIST = [
    COURSE.PRODUCT_DESIGN,
    COURSE.PRODUCT_MANAGEMENT,
    COURSE.FULLSTACK,
    COURSE.FRONTEND,
    COURSE.BACKEND,
    COURSE.GEN_AI,
    COURSE.INFORMATION_SECURITY,
    COURSE.CLOUD_NATIVE,
    COURSE.CLOUD_INFRASTRUCTURE
]

export const COURSE_AREA = {
    WEB_DEVELOPMENT: "WEB_DEVELOPMENT",
    INFRA_INNOVATION: "INFRA_INNOVATION",
    PRODUCT_EXPERT: "PRODUCT_EXPERT"
}

export const COURSE_AREA_LIST = [
    COURSE_AREA.WEB_DEVELOPMENT,
    COURSE_AREA.INFRA_INNOVATION,
    COURSE_AREA.PRODUCT_EXPERT
];

export const COURSE_AREA_INFORMATION = {
    WEB_DEVELOPMENT: {
        title: "웹 개발",
        description: "프론트엔드부터 백엔드까지, 웹 개발 전반을 실무로 익히는 실전 중심 트랙",
        courses: [
            COURSE.FULLSTACK,
            COURSE.FRONTEND,
            COURSE.BACKEND,
        ]
    },
    INFRA_INNOVATION: {
        title: "인프라 / 혁신 기술",
        description: "클라우드부터 AI·보안까지, 인프라와 미래 기술 중심의 테크 트랙",
        courses: [
            COURSE.GEN_AI,
            COURSE.INFORMATION_SECURITY,
            COURSE.CLOUD_INFRASTRUCTURE,
            COURSE.CLOUD_NATIVE,
        ]
    },
    PRODUCT_EXPERT: {
        title: "프로덕트 전문가",
        description: "기획부터 설계까지, 디지털 프로덕트 전반을 경험하는 실무형 프로덕트 트랙",
        courses: [
            COURSE.PRODUCT_DESIGN,
            COURSE.PRODUCT_MANAGEMENT,
        ]
    }
}

// 기본 OG 정보
export const DEFAULT_OG_DATA = {
    baseUrl: 'https://ktcloud-techup.com',
    title: 'kt cloud TECH UP | 내일의 인재, TECH UP에서 완성됩니다',
    description: 'kt cloud가 직접 만든 부트캠프 TECH UP. 클라우드, AI, 개발, 보안, 디자인까지 9개 실무 중심 교육으로 내일의 인재를 완성하세요. 국내 최대 인프라와 노하우를 경험하며 IT 전문가로 성장하세요.',
    keywords: 'KT 클라우드, TECH UP, 클라우드 교육, AI 부트캠프, IT 실무 교육, 개발자 부트캠프',
    image: 'https://statics.goorm.io/ktcloud-techup/landing/og-image.png',
    type: 'website'
};

// 각 과정별 OG 데이터
export const COURSE_OG_DATA = {
    [COURSE.CLOUD_NATIVE]: {
        title: '클라우드 네이티브 과정 | kt cloud TECH UP',
        description: '전국 14개 데이터센터 운영 노하우를 기반으로 클라우드 환경 설계부터 자동화까지 배우는 실무 중심 교육. Docker, Kubernetes, CI/CD를 실습하며 DevOps 전문가로 성장하세요.',
        keywords: '클라우드 네이티브, 도커, 쿠버네티스, DevOps, CI/CD, 클라우드 개발자, 클라우드 교육'
    },
    [COURSE.CLOUD_INFRASTRUCTURE]: {
        title: '클라우드 인프라 과정 | kt cloud TECH UP',
        description: '국내 최대 민간 GPU 클라우드 인프라 운영 경험을 바탕으로 멀티 클라우드 환경 구축부터 자동화까지 실습합니다. Azure까지 아우르는 인프라 전문가로 성장하세요.',
        keywords: '클라우드 인프라, GPU 클라우드, 인프라 자동화, 멀티 클라우드, 시스템 엔지니어, 인프라 교육'
    },
    [COURSE.INFORMATION_SECURITY]: {
        title: '사이버 보안 과정 | kt cloud TECH UP',
        description: '국내 최초 공공 클라우드 보안 인증 \'상\' 등급을 획득한 kt cloud의 보안 아키텍처를 기반으로 한 실습 중심 교육. IAM, DevSecOps, 보안 자동화까지 한 번에 배우세요.',
        keywords: '사이버 보안, 클라우드 보안, 공공 클라우드, 보안 인증, DevSecOps, 보안 전문가'
    },
    [COURSE.FULLSTACK]: {
        title: '풀스택 과정 | kt cloud TECH UP',
        description: '200여 종 솔루션 운영 경험을 담은 실무형 풀스택 교육. 프론트엔드부터 백엔드, 생성형 AI까지 프로젝트 실습으로 웹 서비스 개발 전 과정을 완성하세요.',
        keywords: '풀스택 개발, PaaS-TA, 프론트엔드, 백엔드, 풀스택 교육, 풀스택 부트캠프'
    },
    [COURSE.BACKEND]: {
        title: '백엔드 과정 | kt cloud TECH UP',
        description: '월 가용성 99.95%를 달성한 운영 경험을 기반으로 대규모 트래픽을 처리하는 백엔드 시스템을 배우는 실습 중심 교육. Java Spring, MSA, 무중단 배포까지 마스터하세요.',
        keywords: '백엔드 개발, Java Spring, MSA, 성능 튜닝, 백엔드 교육'
    },
    [COURSE.FRONTEND]: {
        title: '프론트엔드 과정 | kt cloud TECH UP',
        description: '전국 거점 CDN 구축 노하우를 바탕으로 웹·앱 로딩 속도를 최적화하는 프론트엔드 실습 교육. React, SSR, UI/UX 최적화를 배우고 실무 역량을 강화하세요.',
        keywords: '프론트엔드 개발, React, CDN, UI/UX, 웹 개발, 프론트엔드 교육'
    },
    [COURSE.GEN_AI]: {
        title: '생성형 AI 과정 | kt cloud TECH UP',
        description: 'H100 GPU 기반 AI 파운드리 플랫폼을 활용한 생성형 AI 실습 교육. 프롬프트 엔지니어링, RAG, LLM 모델 활용까지 프로젝트 기반으로 AI 서비스 개발 역량을 완성하세요.',
        keywords: '생성형 AI, LLM, 프롬프트 엔지니어링, AI 파운드리, AI 개발자, AI 교육'
    },
    [COURSE.PRODUCT_DESIGN]: {
        title: '프로덕트 디자이너 과정 | kt cloud TECH UP',
        description: '수십 가지 클라우드 상품의 UX 설계 경험을 담은 실무형 교육. 디자인 시스템 구축부터 데이터 기반 UI/UX 개선, 생성형 AI 활용까지 실전 중심으로 배웁니다.',
        keywords: '프로덕트 디자이너, 디자인 시스템, UX/UI, 사용자 경험, 디자인 교육'
    },
    [COURSE.PRODUCT_MANAGEMENT]: {
        title: '프로덕트 매니지먼트 과정 | kt cloud TECH UP',
        description: '공공 클라우드 시장 점유율 42% 1위를 달성한 kt cloud의 PM 노하우를 기반으로 한 실무 중심 교육. 데이터 분석부터 애자일, 생성형 AI 활용까지 제품 개발 전 과정을 경험하세요.',
        keywords: '프로덕트 매니저, PM, 애자일, 제품 기획, 시장 점유율, PM 교육'
    }
};

export const COURSE_INFORMATION = {
    [COURSE.FULLSTACK]: {
        title: "kt cloud 풀스택",
        description: "프론트엔드와 백엔드 모두 다루는 개발 전문가 과정",
        tags: ["React", "Java", "Spring", "아키텍처 설계"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'fullstack',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/fullstack/techup_nav_fullstack.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/fullstack/techup_thumb_fullstack.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/fullstack/techup_dㄴetail_pc_fullstack.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/fullstack/techup_detail_mo_fullstack.png"
    },
    [COURSE.FRONTEND]: {
        title: "kt cloud 프론트엔드",
        description: "최상의 사용 경험을 구현하는 인터페이스 전문가 과정",
        tags: ["React", "디자인 시스템", "웹 성능", "UI 설계"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'frontend',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/frontend/techup_nav_frontend.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/frontend/techup_thumb_frontend.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/frontend/techup_detail_pc_frontend.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/frontend/techup_detail_mo_frontend.png"
    },
    [COURSE.BACKEND]: {
        title: "kt cloud 백엔드",
        description: "서비스의 코어를 설계하는 개발 전문가 과정",
        tags: ["Java", "Spring Boot", "데이터베이스", "성능 최적화"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'backend',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/backend/techup_nav_backend.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/backend/techup_thumb_backend.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/backend/techup_detail_pc_backend.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/backend/techup_detail_mo_backend.png"
    },
    [COURSE.GEN_AI]: {
        title: "kt cloud 생성형 AI",
        description: "생성형 AI 혁신을 이끄는 글로벌 인재 과정",
        tags: ["LLM 성능", "커스텀 RAG", "LLM fine-tuning", "AI 서비스"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'gen-ai',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/gen-ai/techup_nav_gen-ai.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/gen-ai/techup_thumb_gen-ai.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/gen-ai/techup_detail_pc_gen-ai.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/gen-ai/techup_detail_mo_gen-ai.png"
    },
    [COURSE.INFORMATION_SECURITY]: {
        title: "kt cloud 사이버 보안",
        description: "데이터와 서비스를 수호하는 보안 전문가 과정",
        tags: ["네트워크보안", "침해사고 대응", "모의해킹", "디지털포렌식"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'cybersecurity',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cybersecurity/techup_nav_cybersecurity.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cybersecurity/techup_thumb_cybersecurity.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cybersecurity/techup_detail_pc_cybersecurity.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cybersecurity/techup_detail_mo_cybersecurity.png"
    },
    [COURSE.CLOUD_NATIVE]: {
        title: "kt cloud 클라우드 네이티브",
        description: "차세대 클라우드 아키텍처 전문가 과정",
        tags: ["Docker", "Kubernetes", "CI/CD", "모니터링", "로그 관리"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'cloud-native',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-native/techup_nav_cloud-native.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-native/techup_thumb_cloud-native.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-native/techup_detail_pc_cloud-native.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-native/techup_detail_mo_cloud-native.png"
    },
    [COURSE.CLOUD_INFRASTRUCTURE]: {
        title: "kt cloud 클라우드 인프라",
        description: "확장성과 안정성을 구축하는 인프라 전문가 과정",
        tags: ["클라우드 운영", "IaC", "비용 최적화", "운영 자동화"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'cloud-infra',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-infra/techup_nav_cloud-infra.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-infra/techup_thumb_cloud-infra.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-infra/techup_detail_pc_cloud-infra.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/cloud-infra/techup_detail_mo_cloud-infra.png"
    },
    [COURSE.PRODUCT_DESIGN]: {
        title: "kt cloud 프로덕트 디자인",
        description: "사용자 중심 경험을 설계하는 디자인 전문가 과정",
        tags: ["사용자 경험", "UX 리서치", "디자인 시스템", "Figma"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'product-design',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-design/techup_nav_product-design.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-design/techup_thumb_product-design.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-design/techup_detail_pc_product-design.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-design/techup_detail_mo_product-design.png"
    },
    [COURSE.PRODUCT_MANAGEMENT]: {
        title: "kt cloud 프로덕트 매니지먼트",
        description: "아이디어를 제품으로 비즈니스 임팩트를 만드는 과정",
        tags: ["데이터 분석", "고객 중심 사고", "제품 설계", "로드맵 수립"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'product-management',
        recruitedPeopleAmount: 50,
        navIconSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-management/techup_nav_product-management.png",
        imageSrc: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-management/techup_thumb_product-management.png",
        detailImageDesktop: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-management/techup_detail_pc_product-management.png",
        detailImageMobile: "https://statics.goorm.io/ktcloud-techup/landing/assets/course/product-management/techup_detail_mo_product-management.png"
    },
}
