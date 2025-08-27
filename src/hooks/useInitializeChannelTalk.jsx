import { useEffect } from "react";

export const useInitializeChannelTalk = () => {
  useEffect(() => {
    const initChannelTalk = () => {
      if (typeof window === "undefined" || window.ChannelIO) {
        return;
      }

      try {
        (function() {
          const w = window
          // 채널톡 큐 시스템 설정
          const ch = function(args) {
            ch.c(args);
          };
          
          ch.q = [];
          ch.c = function(args) {
            ch.q.push(args);
          };
          w.ChannelIO = ch;

          // 스크립트 로드 함수
          function loadScript() {
            if (w.ChannelIOInitialized) {
              return;
            }
            w.ChannelIOInitialized = true;
            
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
            script.onerror = () => {
              console.error("Failed to load ChannelTalk script");
            };
            
            const firstScript = document.getElementsByTagName("script")[0];
            if (firstScript && firstScript.parentNode) {
              firstScript.parentNode.insertBefore(script, firstScript);
            }
          }

          // DOM 준비 상태에 따른 로드
          if (document.readyState === "complete") {
            loadScript();
          } else {
            w.addEventListener("DOMContentLoaded", loadScript);
            w.addEventListener("load", loadScript);
          }
        })();

        setTimeout(() => {
          if (window.ChannelIO) {
            window.ChannelIO("boot", {
              pluginKey: import.meta.env.VITE_PUBLIC_CHANNEL_TALK_PLUGIN_KEY || "YOUR_PLUGIN_KEY"
            });
          }
        }, 100);

      } catch (error) {
        console.error("ChannelTalk initialization error:", error);
      }
    };

    initChannelTalk();
  }, []);
}