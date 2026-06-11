import {
  OfflineManager,
  type OfflinePackProgressListener,
  type LngLatBounds,
} from '@maplibre/maplibre-react-native';
import { MAP_STYLE_URL } from '@/config/mapConfig';

export const BANGKOK_PACK_NAME = 'bangkok';

// [west, south, east, north]
export const BANGKOK_BOUNDS: LngLatBounds = [100.3, 13.55, 100.75, 13.95];

export const MAP_MIN_ZOOM = 9;
export const MAP_MAX_ZOOM = 16;

export const ensureOfflinePack = async (
  onProgress?: (percentage: number) => void,
): Promise<void> => {
  const packs = await OfflineManager.getPacks();
  const existing = packs.find((pack) => pack.metadata?.name === BANGKOK_PACK_NAME);
  if (existing) {
    return;
  }

  const progressListener: OfflinePackProgressListener = (_pack, status) => {
    onProgress?.(status.percentage);
  };
  const errorListener = (_pack: unknown, error: { message: string }) => {
    console.error('[MapTiles] offline pack error:', error.message);
  };

  await OfflineManager.createPack(
    {
      mapStyle: MAP_STYLE_URL,
      bounds: BANGKOK_BOUNDS,
      minZoom: MAP_MIN_ZOOM,
      maxZoom: MAP_MAX_ZOOM,
      metadata: { name: BANGKOK_PACK_NAME },
    },
    progressListener,
    errorListener,
  );
};
