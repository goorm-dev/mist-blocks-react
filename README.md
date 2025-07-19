# Mist-Blocks React

**Mist-Blocks**는 goorm에서 다양한 랜딩 페이지를 빠르고 효율적으로 만들기 위해 개발한 **Skeleton UI 템플릿 라이브러리**입니다.  
Vapor 디자인 시스템을 기반으로, 상황에 맞게 조립 가능한 모듈형 UI 블록들을 제공합니다.

## 🌫️ 이름의 의미

- **Mist:** Vapor(증기)처럼 가볍고 유연한 UI를 지향합니다.
- **Blocks:** 다양한 상황에 맞게 조립 가능한 섹션 단위 컴포넌트입니다. (예: Nav, Hero, Footer 등)

## ✨ 주요 특징

- Vapor 디자인 시스템 기반으로 일관된 디자인 유지
- Nav, Hero, Footer 등 상황별로 구분된 다양한 템플릿 블록 제공
- 빠르고 효율적인 랜딩 페이지 제작 가능
- 코드 일관성과 재사용성 확보
- 확장 및 커스터마이징 용이

## 🚀 기술 스택

이 프로젝트는 **React + Vite**를 기반으로 구축되었습니다.

### 사용 가능한 플러그인

현재 두 개의 공식 플러그인이 사용 가능합니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - [Babel](https://babeljs.io/)을 사용한 Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) - [SWC](https://swc.rs/)를 사용한 Fast Refresh

## 🛠️ 개발 환경 설정

### ESLint 설정 확장

프로덕션 애플리케이션 개발 시, TypeScript와 타입 인식 린트 규칙을 사용하는 것을 권장합니다. 
TypeScript와 [`typescript-eslint`](https://typescript-eslint.io)를 프로젝트에 통합하는 방법은 
[TS 템플릿](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)을 참조하세요.

## 🎨 디자인 시스템

Mist-Blocks는 Vapor 디자인 시스템을 기반으로 하며, 다음과 같은 원칙을 따릅니다:

- **일관성**: 모든 컴포넌트가 동일한 디자인 언어 사용
- **재사용성**: 모듈화된 컴포넌트로 다양한 조합 가능
- **확장성**: 새로운 블록 추가 및 기존 블록 수정 용이
- **접근성**: 웹 접근성 표준 준수