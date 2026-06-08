import { useEffect } from 'react';
import { Platform } from 'react-native';

type TVRemoteEvent = {
  eventType: 'up' | 'down' | 'left' | 'right' | 'select' | 'back' | 'menu';
};

type Handler = (event: TVRemoteEvent) => void;

export const useTVRemote = (handler: Handler) => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Tizen / webOS — keyboard event
      const onKeyDown = (e: KeyboardEvent) => {
        const keyMap: Record<number, TVRemoteEvent['eventType']> = {
          38: 'up',
          40: 'down',
          37: 'left',
          39: 'right',
          13: 'select',
          8: 'back',
          27: 'back',
        };
        const eventType = keyMap[e.keyCode];
        if (eventType) handler({ eventType });
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }

    // tvOS / Android TV — React Native TV event handler
    const { useTVEventHandler } = require('react-native');
    useTVEventHandler(handler);
  }, [handler]);
};
