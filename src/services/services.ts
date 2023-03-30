import { api } from "./api";
import {
  GenreProps,
  CardProps,
  UrlsIsValidProps,
  ResponseHttpDefaultDetailMovieProps,
  ResponseFormattedDetailMovieProps,
  ResponseHttpDefaultDetailTvProps,
} from "@src/interfaces";
import {
  formatDataMovieToCard,
  formatDataTvToCard,
  formatDataMovieToCardPageDetail,
  formatDataTvToCardPageDetail,
} from "@src/utils/utils";
const { API_KEY } = process.env;
const { LANGUAGE } = process.env;
const { REGION } = process.env;

type datesProps = {
  maximum: string;
  minimum: string;
};

//Movies
export type PromiseProps = {
  total_pages: number;
  page: number;
  total_results: number;
  results: CardProps[];
  dates?: datesProps;
};

export type ResponseHttp = {
  total_pages: number;
  page: number;
  total_results: number;
  results: any;
  dates?: datesProps;
};

type ApiUrl = UrlsIsValidProps;

type ApiFetch = {
  apiUrl: ApiUrl;
  page?: number;
  genre?: string;
  callback?: () => void;
};

export async function apiFetchMovieAndTv({
  apiUrl,
  page = 1,
  genre = "",
  callback = () => {},
}: ApiFetch): Promise<PromiseProps | null> {
  try {
    const response = await api.get<ResponseHttp>(
      `${apiUrl}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}&region=${REGION}&with_genres=${genre}`
    );

    if (apiUrl.includes("tv")) {
      const movie = await formatDataTvToCard(response.data.results);

      return {
        ...response.data,
        results: movie,
      };
    } else if (apiUrl.includes("movie") || apiUrl.includes("trending")) {
      const movie = await formatDataMovieToCard(response.data.results);
      return {
        ...response.data,
        results: movie,
      };
    }

    return null;
  } catch (error) {
    return null;
  } finally {
    callback();
  }
}

type ApiFetchSearch = {
  page?: number;
  search?: string;
  callback?: () => void;
};

export async function apiFetchSearchAll({
  page = 1,
  search = "",
  callback = () => {},
}: ApiFetchSearch): Promise<PromiseProps | null> {
  try {
    const response = await api.get<ResponseHttp>(
      `/search/multi?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}&region=${REGION}&query=${search}`
    );

    if (response) {
      const tvFilter = response.data.results.filter(
        (item: any) => item.media_type === "tv"
      );

      const movieFilter = response.data.results.filter(
        (item: any) => item.media_type === "movie"
      );
      const tv = await formatDataTvToCard(tvFilter);
      const movie = await formatDataMovieToCard(movieFilter);

      return {
        ...response.data,
        results: [...movie, ...tv],
      };
    }
    return null;
  } catch (error) {
    return null;
  } finally {
    callback();
  }
}

// Genre
type ResponseGenreHttp = {
  genres: GenreProps[];
};

export type TypeGenreProps = "movie" | "tv";
type ApiFetchGenreProps = {
  type: TypeGenreProps;
  callback?: () => void;
};

export async function apiFetchGenres({
  type,
  callback = () => {},
}: ApiFetchGenreProps): Promise<ResponseGenreHttp | null> {
  try {
    const response = await api.get<ResponseGenreHttp>(
      `genre/${type}/list?api_key=${API_KEY}&language=${LANGUAGE}`
    );
    return response.data;
  } catch (error) {
    return null;
  } finally {
    callback();
  }
}

export type TypeDetailProps = "movie" | "tv";
type ApiFetchDetailProps = {
  type: TypeDetailProps;
  id: number;
  callback?: () => void;
};

export async function apiFetchDetail({
  type,
  id,
  callback = () => {},
}: ApiFetchDetailProps): Promise<ResponseFormattedDetailMovieProps | null> {
  try {
    if (type === "movie") {
      const response = await api.get<ResponseHttpDefaultDetailMovieProps>(
        `${type}/${id}?api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}&append_to_response=videos,watch/providers,credits,recommendations`
      );

      if (response.data) {
        const data = await formatDataMovieToCardPageDetail(response.data);

        return data;
      }
    } else if (type === "tv") {
      const response = await api.get<ResponseHttpDefaultDetailTvProps>(
        `${type}/${id}?api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}&append_to_response=videos,watch/providers,credits,recommendations`
      );

      if (response.data) {
        const data = await formatDataTvToCardPageDetail(response.data);
        return data;
      }
    }

    return null;
  } catch (error) {
    return null;
  } finally {
    callback();
  }
}
