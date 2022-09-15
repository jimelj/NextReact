import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tell apollo we will take care of everything
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If there are items AND there arent enough items to satisfy how many were requested AND we are on the last page THEN just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any itema , we must go to the network to fetch them
        return false;
      }

      // if there are items, just return them from the cache, and we dont need to go to the netwoork.

      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! gonna send them to apollo`
        );
        return items;
      }

      return false; // fallback to network

      // Frist thing it does it asks the read function for those items.
      // we can either do one of two things:
      // first things we can do is return the items because they are already in the cache.
      // the other thing we can od is to return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the apollo client comes back from the network with our products
      console.log(`Merging items from network ${incoming.length}`);
      console.log(incoming);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // finally we returned merged items from the cache,
      return merged;
      //
    },
  };
}
