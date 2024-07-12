import { useState, useEffect } from "react";
import axios from "axios";

interface UseApiCallReturnType<T> {
  data?: T | null;
  loading?: boolean;
  error?: string | null;
}

const useApiCall = <T,>(apiUrl: string): UseApiCallReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<T>(apiUrl);
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, loading, error };
};

export default useApiCall;
