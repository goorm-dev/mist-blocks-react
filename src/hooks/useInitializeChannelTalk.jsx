import { useEffect } from "react";

export const useInitializeChannelTalk = () => {
  useEffect(() => {
    const initChannelTalk = () => {
	  window.ChannelIO("boot", {
		pluginKey: "8d3e0c5a-ffbe-44d1-8f7c-60f7dca10efd",
	  });
    };

    initChannelTalk();
  }, []);
}