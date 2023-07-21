import { useState, useEffect } from "react";
import axios from "axios";
import Config from "react-native-config";

const rapidApiKey = "73379ba041msh08899f8eabd6a7fp1fe1e7jsn82f028673f45";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsloading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsloading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsloading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
