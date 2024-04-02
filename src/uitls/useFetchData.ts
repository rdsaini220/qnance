import { useState, useEffect } from 'react';

interface FetchDataReturnType {
  resData: any;
  error: Error | null;
  isLoading: boolean;
  isfetchData: (URL: string) => void;
}

const useFetchData = (API_URL?: string | null): FetchDataReturnType => {
  const [resData, setResData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const isfetchData = async (URL: string) => {
    try {
      setIsLoading(true);
      const abortController = new AbortController();
      setController(abortController);

      const response = await fetch(URL, { signal: abortController.signal });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setResData(json);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (API_URL) {
      isfetchData(API_URL);
    }
  }, [API_URL]);

  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
        setController(null);
      }
    };
  }, [controller]);

  return { resData, error, isLoading, isfetchData };
};

export default useFetchData;
