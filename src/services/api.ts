import axios from 'axios';

const tron = (name: string, value: unknown, preview: string) => {
  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../utils/reactotron').default?.display?.({ name, value, preview });
  }
};

export type Show = {
  id: number;
  name: string;
  summary: string;
  image: { medium: string; original: string } | null;
  genres: string[];
  rating: { average: number | null };
};

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

export const fetchShows = async (): Promise<Show[]> => {
  const url = 'https://api.tvmaze.com/shows?page=0';
  tron('→ REQUEST', { method: 'GET', url }, `GET ${url}`);

  const { data, status, headers } = await axios.get<any[]>(url);
  tron('← RESPONSE', { status, count: data.length, contentType: headers['content-type'] }, `${status} — ${data.length} items`);

  return data.map(item => ({
    id: item.id,
    name: item.name,
    summary: item.summary ? stripHtml(item.summary) : '',
    image: item.image ?? null,
    genres: item.genres ?? [],
    rating: { average: item.rating?.average ?? null },
  }));
};
