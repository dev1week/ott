import axios from "axios";
import { writable } from "svelte/store";

// API 요청을 래핑한 요청용 스토어 팩토리

//URL마다 새 스토어를 만들어서 구독하는 방식임.

const setPromise = (url) => {
  const options = {
    method: "GET",
    url,
    params: {
      language: "ko",
      page: "1",
      api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
    headers: {
      accept: "application/json",
    },
  };
  const getPromise = async () => {
    try {
      const response = await axios.request(options);
      return response;
    } catch (error) {
      console.error(error);
      return new Error(error);
    }
  };

  const { subscribe } = writable(getPromise());

  return {
    subscribe,
  };
};

// 데이터
const setDatas = (url) => {
  const options = {
    method: "GET",
    url,
    params: {
      language: "ko",
      page: "1",
      api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
    headers: {
      accept: "application/json",
    },
  };
  const getDatas = async () => {
    try {
      const response = await axios.request(options);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return new Error(error);
    }
  };

  const { subscribe } = writable(getDatas());

  return {
    subscribe,
  };
};

// 장르
const setGenres = (url) => {
  const options = {
    method: "GET",
    url,
    params: {
      language: "ko",
      page: "1",
      api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
    headers: {
      accept: "application/json",
    },
  };
  const getGenres = async () => {
    try {
      const response = await axios.request(options);
      return response.data.genres;
    } catch (error) {
      console.error(error);
      return new Error(error);
    }
  };
  const { subscribe } = writable(getGenres());
  return {
    subscribe,
  };
};

//export
const basicURL = "https://api.themoviedb.org/3/movie";
export const nowPromise = setPromise(`${basicURL}/now_playing`);
export const nows = setDatas(`${basicURL}/now_playing`);

export const genres = setGenres(
  `https://api.themoviedb.org/3/genre/movie/list`
);

export const popularPromise = setPromise(`${basicURL}/popular`);
export const populars = setDatas(`${basicURL}/popular`);

export const upcomingPromise = setPromise(`${basicURL}/upcoming`);
export const upcomingDatas = setDatas(`${basicURL}/upcoming`);

export const topPromise = setPromise(`${basicURL}/top_rated`);
export const tops = setDatas(`${basicURL}/top_rated`);
