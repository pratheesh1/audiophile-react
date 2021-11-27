import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useAxiosPost = (apiUrl, dataToPost) => {
  const [data, setData] = useState([]);
  const [postError, setPostError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const source = axios.CancelToken.source();

    const postData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.post(url, {
          cancelToken: source.token,
          payload: dataToPost,
        });
        if (mounted.current) {
          setData(response.data);
        }
      } catch (error) {
        if (mounted.current) {
          setPostError(error.message);
        }
      } finally {
        mounted.current && setIsLoading(false);
      }
    };
    postData(apiUrl);

    const cleanUp = () => {
      source.cancel();
      mounted.current = false;
    };

    return cleanUp;
  }, [apiUrl, dataToPost]);

  return { data, postError, isLoading };
};

export default useAxiosPost;
