import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useAxiosGet = (apiUrl, params = null) => {
  const [data, setData] = useState([]);
  const [getError, setGetError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
          params: params,
        });
        if (mounted.current) {
          setData(response.data);
        }
      } catch (error) {
        if (mounted.current) {
          setGetError(error.message);
        }
      } finally {
        mounted.current && setIsLoading(false);
      }
    };
    fetchData(apiUrl);

    const cleanUp = () => {
      source.cancel();
      mounted.current = false;
    };

    return cleanUp;
  }, [apiUrl, params]);

  return { data, getError, isLoading };
};

export default useAxiosGet;
