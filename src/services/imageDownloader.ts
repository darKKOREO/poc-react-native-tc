import { DocumentDirectoryPath, downloadFile, exists, mkdir } from '@dr.pogodin/react-native-fs';
import { Show } from './api';

export type CachedShow = Show & { localImageUri: string | null };

const IMAGE_DIR = DocumentDirectoryPath + '/show_images/';

const ensureDir = async () => {
  const dirExists = await exists(IMAGE_DIR);
  if (!dirExists) {
    await mkdir(IMAGE_DIR);
  }
};

const downloadOne = async (showId: number, url: string): Promise<string> => {
  const path = IMAGE_DIR + showId + '.jpg';
  const fileExists = await exists(path);
  if (!fileExists) {
    await downloadFile({ fromUrl: url, toFile: path }).promise;
  }
  return 'file://' + path;
};

export const downloadAllImages = async (
  shows: Show[],
  onProgress: (done: number, total: number) => void,
): Promise<CachedShow[]> => {
  await ensureDir();
  const total = shows.length;
  let done = 0;
  const results: CachedShow[] = [];

  for (let i = 0; i < shows.length; i += 8) {
    const batch = shows.slice(i, i + 8);
    const batchResults = await Promise.all(
      batch.map(async show => {
        let localImageUri: string | null = null;
        if (show.image?.medium) {
          try {
            localImageUri = await downloadOne(show.id, show.image.medium);
          } catch {
            // leave null — show renders placeholder
          }
        }
        done++;
        onProgress(done, total);
        return { ...show, localImageUri };
      }),
    );
    results.push(...batchResults);
  }

  return results;
};
