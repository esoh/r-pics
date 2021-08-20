import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import { PIC_API_URL } from '../../constants';

export const useFuse = (searchString, items, opts) => {
  const [fuse, setFuse] = useState(new Fuse(items, opts));

  useEffect(() => {
    setFuse(new Fuse(items, opts));
  }, [items, opts]);

  const results = useMemo(() => {
    if (!searchString) return null;
    return fuse.search(searchString).map(({ item }) => item);
  }, [fuse, searchString]);

  if (!items || !searchString) return items;
  if (items?.length === 0) return [];
  return results;
};

export const usePicDataQuery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios(PIC_API_URL);
        setData(resp.data);
      } catch(err) {
        setError(err)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { loading: isLoading, error, data };
}
