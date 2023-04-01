import { api } from "./api";
import {
  GenreProps,
  CardProps,
  UrlsIsValidProps,
  ResponseHttpDefaultDetailMovieProps,
  ResponseFormattedDetailMovieProps,
  ResponseHttpDefaultDetailTvProps,
  ResponseFormattedCollectionProps,
  ResponseHttpCollectionProps,
  ResponseDetailSeasonProps,
} from "@src/interfaces";
import {
  formatDataMovieToCard,
  formatDataTvToCard,
  formatDataMovieToCardPageDetail,
  formatDataTvToCardPageDetail,
  formatDataCollectionToCard,
  formatDataDetailSeason,
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
  language: string;
  region: string;
  adult: boolean;
  callback?: () => void;
};

export async function apiFetchMovieAndTv({
  apiUrl,
  page = 1,
  genre = "",
  language,
  region,
  adult,
  callback = () => {},
}: ApiFetch): Promise<PromiseProps | null> {
  try {
    const params = {
      api_key: API_KEY,
      language: language,
      page,
      region: region,
      with_genres: genre,
      adult: adult,
    };
    const response = await api.get<ResponseHttp>(`${apiUrl}`, { params });

    if (apiUrl.includes("tv")) {
      const movie = await formatDataTvToCard(response.data.results);
      return {
        ...response.data,
        results: movie,
      };
    } else if (apiUrl.includes("movie")) {
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
  language: string;
  region: string;
  adult: boolean;
  callback?: () => void;
};

export async function apiFetchSearchAll({
  page = 1,
  search = "",
  language,
  region,
  adult,
  callback = () => {},
}: ApiFetchSearch): Promise<PromiseProps | null> {
  try {
    const params = {
      api_key: API_KEY,
      language: language,
      page,
      region: region,
      query: search,
      adult: adult,
    };
    const response = await api.get<ResponseHttp>("/search/multi", { params });
    if (response) {
      const results = response.data.results.filter(
        (item: any) => item.media_type === "tv" || item.media_type === "movie"
      );

      const tv = await formatDataTvToCard(
        results.filter((item: any) => item.media_type === "tv")
      );
      const movie = await formatDataMovieToCard(
        results.filter((item: any) => item.media_type === "movie")
      );

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
  language: string;

  callback?: () => void;
};

export async function apiFetchGenres({
  type,
  language,

  callback = () => {},
}: ApiFetchGenreProps): Promise<ResponseGenreHttp | null> {
  try {
    const response = await api.get<ResponseGenreHttp>(`genre/${type}/list`, {
      params: {
        api_key: API_KEY,
        language: language,
      },
    });
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
  language: string;
  region: string;
  adult: boolean;
  callback?: () => void;
};

export async function apiFetchDetail({
  type,
  id,
  language,
  region,
  adult,
  callback = () => {},
}: ApiFetchDetailProps): Promise<ResponseFormattedDetailMovieProps | null> {
  try {
    const response = await api.get(`${type}/${id}`, {
      params: {
        api_key: API_KEY,
        language: language,
        region: region,
        adult: adult,
        append_to_response: "videos,watch/providers,credits,recommendations",
      },
    });
    if (response.data) {
      const data =
        type === "movie"
          ? await formatDataMovieToCardPageDetail(
              response.data as ResponseHttpDefaultDetailMovieProps
            )
          : await formatDataTvToCardPageDetail(
              response.data as ResponseHttpDefaultDetailTvProps
            );

      return data as ResponseFormattedDetailMovieProps;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  } finally {
    callback();
  }
}
type ApiFetchCollectionProps = {
  id: number;
  language: string;
  region: string;
  adult: boolean;
  callback?: () => void;
};

export async function apiFetchCollection({
  id,
  language,
  region,
  adult,
  callback = () => {},
}: ApiFetchCollectionProps): Promise<ResponseFormattedCollectionProps | null> {
  try {
    const response = await api.get<ResponseHttpCollectionProps>(
      `collection/${id}`,
      {
        params: {
          api_key: API_KEY,
          language: language,
          region: region,
          adult: adult,
        },
      }
    );
    const genres = await apiFetchGenres({
      type: "movie",
      language: language,
    });

    if (response.data && genres) {
      return await formatDataCollectionToCard(response.data, genres.genres);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  } finally {
    callback();
  }
}

type ApiFetchDetailSeasonProps = {
  id: number;
  seasonId: number;
  language: string;
  region: string;
  adult: boolean;
  callback?: () => void;
};

export async function apiFetchDetailSeason({
  id,
  seasonId,
  language,
  region,
  adult,
  callback = () => {},
}: ApiFetchDetailSeasonProps): Promise<ResponseDetailSeasonProps | null> {
  try {
    const response = await api.get(`tv/${id}/season/${seasonId}`, {
      params: {
        api_key: API_KEY,
        language: language,
        region: region,
        adult: adult,
        append_to_response: "videos,watch/providers,credits",
      },
    });
    if (response.data) {
      return formatDataDetailSeason(response.data);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  } finally {
    callback();
  }
}
