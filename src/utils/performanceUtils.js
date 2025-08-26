/**
 * 성능 최적화를 위한 유틸리티 함수들
 * 
 * 스크롤, 리사이즈 등 빈번하게 발생하는 이벤트 핸들링에 유용
 * - debounce: 연속된 호출 중 마지막 또는 첫 호출만 실행
 * - throttle: 일정 시간 간격으로 호출 제한
 */

/**
 * Debounce 함수
 * 연속된 함수 호출에서 지정된 대기 시간 이후에 마지막 함수 호출만 실행
 * 
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간(ms)
 * @param {boolean} immediate - true일 경우 첫 호출 즉시 실행, false면 마지막 호출 후 대기
 * @returns {Function} debounce 처리된 함수
 * 
 * @example
 * // 스크롤 이벤트에 debounce 적용
 * window.addEventListener('scroll', debounce(() => {
 *   console.log('스크롤 종료 후 1번만 실행');
 * }, 300));
 */
export const debounce = (func, wait = 300, immediate = false) => {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    
    // timeout ID를 저장하고 있다면 clearTimeout으로 제거
    const later = () => {
      timeout = null;
      // immediate가 아닐 경우에만 마지막에 함수 실행
      if (!immediate) func.apply(context, args);
    };
    
    // immediate가 true이고 timeout이 없을 경우 함수 즉시 실행
    const callNow = immediate && !timeout;
    
    // 기존 timeout 제거
    clearTimeout(timeout);
    
    // 새로운 timeout 설정
    timeout = setTimeout(later, wait);
    
    // immediate가 true이고 첫 호출일 경우 함수 실행
    if (callNow) func.apply(context, args);
  };
};

/**
 * Throttle 함수
 * 함수 호출을 일정 시간 간격으로 제한
 * 
 * @param {Function} func - 실행할 함수
 * @param {number} limit - 제한 시간(ms)
 * @returns {Function} throttle 처리된 함수
 * 
 * @example
 * // 스크롤 이벤트에 throttle 적용
 * window.addEventListener('scroll', throttle(() => {
 *   console.log('스크롤 중 일정 간격으로 실행');
 * }, 200));
 */
export const throttle = (func, limit = 200) => {
  let lastCall = 0;
  let lastArgs = null;
  let lastThis = null;
  let timeoutId = null;
  
  return function executedFunction(...args) {
    const now = Date.now();
    const context = this;
    
    // 마지막 실행 시간과 현재 시간의 차이
    const timeSinceLastCall = now - lastCall;
    
    // throttle 간격보다 작으면 실행 제한
    if (timeSinceLastCall < limit) {
      // 마지막 호출 인자와 컨텍스트 저장
      lastArgs = args;
      lastThis = context;
      
      // 이미 예약된 타임아웃이 없으면 예약
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          timeoutId = null;
          // 마지막으로 저장된 인자와 컨텍스트로 함수 실행
          func.apply(lastThis, lastArgs);
        }, limit - timeSinceLastCall);
      }
      
      return;
    }
    
    // throttle 간격보다 크면 함수 실행
    lastCall = now;
    func.apply(context, args);
  };
};

/**
 * requestAnimationFrame과 throttle을 결합한 최적화 함수
 * 렌더링 성능과 배터리 효율성을 극대화하는 방식
 * 
 * @param {Function} func - 실행할 함수
 * @param {number} limit - 제한 시간(ms)
 * @returns {Function} 최적화된 함수
 * 
 * @example
 * // 스크롤 이벤트에 rAF와 throttle을 결합하여 적용
 * window.addEventListener('scroll', rafThrottle(() => {
 *   console.log('최적화된 스크롤 이벤트 핸들링');
 * }, 100));
 */
export const rafThrottle = (func, limit = 100) => {
  let lastCall = 0;
  let rafId = null;
  let timeoutId = null;
  
  return function executedFunction(...args) {
    const now = Date.now();
    const context = this;
    
    // 이미 예약된 rAF가 있으면 취소
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    // throttle 간격 체크
    if (now - lastCall >= limit) {
      lastCall = now;
      
      // rAF를 사용하여 다음 렌더링 프레임에 맞춰 함수 실행
      rafId = requestAnimationFrame(() => {
        func.apply(context, args);
        rafId = null;
      });
    } else {
      // throttle 간격 내에 있으면 마지막 호출만 예약
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        
        rafId = requestAnimationFrame(() => {
          func.apply(context, args);
          rafId = null;
        });
      }, limit - (now - lastCall));
    }
  };
};