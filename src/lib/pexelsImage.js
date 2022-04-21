import {PEXELS_API} from '@env';
import {createClient} from 'pexels';

const client = createClient(PEXELS_API);

export async function getImageFromString(string) {
  try {
    const search = await client.photos.search({query: string, per_page: 1});
    const result = await search.photos;

    return result[0].src.small;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}
