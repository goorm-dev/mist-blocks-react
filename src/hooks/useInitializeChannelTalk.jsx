import { useEffect } from "react";

export const useInitializeChannelTalk = () => {
  useEffect(() => {
    const initChannelTalk = () => {
      if (typeof window === "undefined" || window.ChannelIO) {
        return;
      }

      console.log(import.meta.env.VITE_PUBLIC_CHANNEL_TALK_PLUGIN_KEY);

        window.ChannelIO("boot", {
            pluginKey: import.meta.env.VITE_PUBLIC_CHANNEL_TALK_PLUGIN_KEY || "YOUR_PLUGIN_KEY"
        });
    };

    initChannelTalk();
  }, []);
}