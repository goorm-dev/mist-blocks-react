'use client';

import { useEffect } from 'react';

export const useInitializeChannelTalk = () => {
  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 확인
    if (typeof window === 'undefined') {
      return;
    }

    // 이미 초기화되었는지 확인
    if (window.ChannelIO) {
      return;
    }

    const initChannelTalk = () => {
      try {
        (function () {
          const w = window;

          // 채널톡 큐 시스템 설정
          const ch = function (...args) {
            ch.c(args);
          };

          ch.q = [];
          ch.c = function (args) {
            ch.q.push(args);
          };
          w.ChannelIO = ch;

          // 스크립트 로드 함수
          function loadScript() {
            if (w.ChannelIOInitialized) {
              return;
            }
            w.ChannelIOInitialized = true;

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
            script.onerror = () => {
              console.error('Failed to load ChannelTalk script');
            };

            const firstScript = document.getElementsByTagName('script')[0];
            if (firstScript && firstScript.parentNode) {
              firstScript.parentNode.insertBefore(script, firstScript);
            }
          }

          // DOM 준비 상태에 따른 로드
          if (document.readyState === 'complete') {
            loadScript();
          } else {
            w.addEventListener('DOMContentLoaded', loadScript);
            w.addEventListener('load', loadScript);
          }
        })();

        setTimeout(() => {
          if (window.ChannelIO) {
            window.ChannelIO('boot', {
              pluginKey: '8d3e0c5a-ffbe-44d1-8f7c-60f7dca10efd',
            });
          }
        }, 100);
      } catch (error) {
        console.error('ChannelTalk initialization error:', error);
      }
    };

    initChannelTalk();
  }, []);
};
