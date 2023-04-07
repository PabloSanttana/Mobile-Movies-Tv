import { scale } from "react-native-size-matters";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
const { BASE_IMAGE_URL } = process.env;
import {
  MovieProps,
  ResponseHttpDefaultDetailMovieProps,
  ResponseFormattedDetailMovieProps,
  TvProps,
  ResponseHttpDefaultDetailTvProps,
  ResponseHttpCollectionProps,
  ResponseFormattedCollectionProps,
  GenreProps,
  ResponseDetailSeasonProps,
  ResponseHttpDetailSeasonProps,
  DeviceTypeProps,
  VideoProps,
  watchProvidersItemProps,
} from "@src/interfaces";
import { CardProps } from "@src/interfaces";
import Logo from "@src/assets/logo.png";
import { TypeDetailProps } from "@src/services/services";

const Language = {
  bg: "Búlgaro",
  es: "Espanhol",
  cs: "Checo",
  da: "Dinamarquês",
  de: "Alemão",
  et: "Estónio",
  el: "Grego",
  en: "Inglês",
  fr: "Francês",
  ga: "Irlandês",
  hr: "Croata",
  it: "Italiano",
  lv: "Letão",
  lt: "Lituano",
  hu: "Húngaro",
  mt: "Maltês",
  nl: "Neerlandês",
  pl: "Polaco",
  pt: "Português",
  ro: "Romeno",
  sk: "Eslovaco",
  sl: "Esloveno",
  fi: "Finlandês",
  sv: "Sueco",
  "": "------",
};

const status = {
  Released: "Lançado",
  "Returning Series": "Renovada",
  "": "----",
};

export function codeLanguage(cod: string | undefined): string {
  if (cod === undefined) return "---";
  //@ts-ignore
  return Language[cod ?? ""];
}
export function statusTranslate(cod: string | undefined): string {
  if (cod === undefined) return "---";
  //@ts-ignore
  return status[cod ?? ""];
}

export function imagePathIsValid(path: string) {
  const isValid = /\.(jpe?g|png|svg)$/i.test(path);
  if (isValid) {
    return { uri: path };
  } else {
    return Logo;
  }
}

export function convertScale(value: number): string {
  return `${scale(value)}px`;
}

export const progressColor = (value: number): string => {
  return value >= 7 ? "#21d07a" : value >= 4 ? "#d2d531" : "#db2360";
};

export function sizeDeviceTypeScale(
  type: DeviceTypeProps,
  lengthTablet: number,
  lengthIphone: number
): string {
  if (type === "tablet") {
    return convertScale(lengthTablet);
  } else if (type === "phone") {
    return convertScale(lengthIphone);
  }
  return "40px";
}

export const formatData = (
  data: string,
  dateFormat = "dd 'de' MMMM yyyy"
): string => {
  if (data.length < 10) {
    return "00 de Janeiro de 0000";
  }
  let dateObj = new Date(data);
  dateObj.setDate(dateObj.getDate() + 1);
  if (!isValid(dateObj)) {
    throw new Error("Invalid date format");
  }
  return format(dateObj, dateFormat, { locale: ptBR });
};

export function formatDataTvToCard(movies: TvProps[]): CardProps[] {
  const data: CardProps[] = movies.map((movie) => {
    return {
      adult: false,
      backdrop_path: `${BASE_IMAGE_URL}w780${movie.backdrop_path}`,
      backdrop_path_small: `${BASE_IMAGE_URL}w300${movie.backdrop_path}`,
      genre_ids: movie.genre_ids,
      id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_name,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: `${BASE_IMAGE_URL}w500${movie.poster_path}`,
      poster_path_small: `${BASE_IMAGE_URL}w92${movie.poster_path}`,
      release_date: formatData(movie.first_air_date ?? "00"),
      title: movie.original_name,
      video: false,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      media_type: "tv",
      origin_country: movie.origin_country,
    };
  });
  return data;
}

export function formatDataMovieToCard(movies: MovieProps[]): CardProps[] {
  const data: CardProps[] = movies.map((movie: MovieProps) => {
    return {
      ...movie,
      poster_path: `${BASE_IMAGE_URL}w780${movie.poster_path}`,
      poster_path_small: `${BASE_IMAGE_URL}w92${movie.poster_path}`,
      backdrop_path: `${BASE_IMAGE_URL}w500${movie.backdrop_path}`,
      backdrop_path_small: `${BASE_IMAGE_URL}w300${movie.backdrop_path}`,
      media_type: "movie",
      release_date: formatData(movie.release_date ?? "00"),
      origin_country: [],
    };
  });

  return data;
}

export async function formatDataMovieToCardPageDetail(
  data: ResponseHttpDefaultDetailMovieProps
): Promise<ResponseFormattedDetailMovieProps> {
  //formatando a data

  const newData = formatData(data.release_date);

  //formatando a horas do filme
  const hours = Math.floor(data.runtime / 60);
  const min = data.runtime % 60;
  const runtime = hours > 0 ? `${hours}h ${min}m` : `${min}m`;
  //pegando os nomes das categorias
  let genresStr: string[] = [];
  genresStr = data.genres.map((item) => item.name);

  //filtrando só as pessoas com esses perfils de trabalhos
  // set busca O(1)
  const jobs = new Set(["Characters", "Director", "Writer"]);
  const crewFilter = data.credits.crew.filter((item) => jobs.has(item.job));

  //Somente traile do YouTube
  const trailers: VideoProps[] = [];
  data.videos.results.forEach((item) => {
    if (item.site === "YouTube") {
      if (item.type === "Trailer") {
        trailers.push(item);
      }
    }
  });

  const recommendations = await formatDataMovieToCard(
    data.recommendations.results
  );

  const watchProviders: watchProvidersItemProps = {
    BR: {
      link: data["watch/providers"].results?.BR?.link ?? "",
      flatrate:
        data["watch/providers"].results?.BR?.flatrate?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      buy:
        data["watch/providers"].results?.BR?.buy?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      rent:
        data["watch/providers"].results?.BR?.rent?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
    },
    US: {
      link: data["watch/providers"].results?.US?.link ?? "",
      flatrate:
        data["watch/providers"].results?.US?.flatrate?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      buy:
        data["watch/providers"].results?.US?.buy?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      rent:
        data["watch/providers"].results?.US?.rent?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
    },
  };

  const belongs_to_collection = data.belongs_to_collection && {
    id: data.belongs_to_collection.id,
    backdrop_path: `${BASE_IMAGE_URL}w780${data.belongs_to_collection.backdrop_path}`,
    backdrop_path_small: `${BASE_IMAGE_URL}w300${data.belongs_to_collection.backdrop_path}`,
    name: data.belongs_to_collection.name,
    poster_path: `${BASE_IMAGE_URL}w500${data.belongs_to_collection.poster_path}`,
    poster_path_small: `${BASE_IMAGE_URL}w92${data.belongs_to_collection.poster_path}`,
  };

  return {
    ...data,
    original_language: codeLanguage(data.original_language),
    release_date: newData,
    runtimeStr: runtime,
    genresStr: genresStr.join(", "),
    status: statusTranslate(data.status),
    vote_average: Number(data.vote_average.toFixed(1)),
    backdrop_path: `${BASE_IMAGE_URL}original${data.backdrop_path}`,
    backdrop_path_small: `${BASE_IMAGE_URL}w300${data.backdrop_path}`,
    poster_path: `${BASE_IMAGE_URL}original${data.poster_path}`,
    poster_path_small: `${BASE_IMAGE_URL}w92${data.poster_path}`,
    credits: {
      crew: crewFilter,
      cast: data.credits.cast,
    },
    videos: {
      results: trailers,
    },
    "watch/providers": {
      results: watchProviders,
    },
    recommendations: {
      ...data.recommendations,
      results: recommendations,
    },
    belongs_to_collection: belongs_to_collection,
  };
}

export async function formatDataTvToCardPageDetail(
  data: ResponseHttpDefaultDetailTvProps
): Promise<ResponseFormattedDetailMovieProps> {
  //formatando a data
  const newDate = formatData(data.first_air_date ?? "00");
  //formatando a horas do filme
  const hours = Math.floor(data.episode_run_time[0] / 60);
  const min = data.episode_run_time[0] % 60;
  const runtime = hours > 0 ? `${hours}h ${min}m` : `${min}m`;
  //pegando os nomes das categorias
  let genresStr: string[] = [];
  genresStr = data.genres.map((item) => item.name);
  //filtrando só as pessoas com esses perfils de trabalhos
  //const jobs = ["Characters", "Director", "Writer"];
  //const crewFilter = data.credits.crew.filter(({ job }) => jobs.includes(job));
  const crewFilter = data.created_by.map((item) => {
    return {
      adult: false,
      gender: item.gender,
      id: item.id,
      known_for_department: "",
      name: item.name,
      original_name: item.name,
      popularity: 0,
      profile_path: item.profile_path,
      credit_id: item.credit_id,
      department: "Writing",
      job: "Criação",
      cast_id: item.id,
      character: "",
      order: 0,
    };
  });
  //Somente traile do YouTube
  const trailers: VideoProps[] = [];
  data.videos.results.forEach((item) => {
    if (item.site === "YouTube") {
      if (item.type === "Trailer") {
        trailers.push(item);
      }
    }
  });
  const recommendations = await formatDataTvToCard(
    data.recommendations.results
  );

  const seasons = data.seasons.map((item) => ({
    ...item,
    air_date: item.air_date?.split("-")?.[0] ?? "----",
  }));

  const watchProviders: watchProvidersItemProps = {
    BR: {
      link: data["watch/providers"].results?.BR?.link ?? "",
      flatrate:
        data["watch/providers"].results?.BR?.flatrate?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      buy:
        data["watch/providers"].results?.BR?.buy?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      rent:
        data["watch/providers"].results?.BR?.rent?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
    },
    US: {
      link: data["watch/providers"].results?.US?.link ?? "",
      flatrate:
        data["watch/providers"].results?.US?.flatrate?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      buy:
        data["watch/providers"].results?.US?.buy?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
      rent:
        data["watch/providers"].results?.US?.rent?.map((item) => ({
          ...item,
          logo_path: `${BASE_IMAGE_URL}w92${item.logo_path}`,
        })) ?? [],
    },
  };

  const newData: ResponseFormattedDetailMovieProps = {
    adult: data.adult,
    backdrop_path: `${BASE_IMAGE_URL}original${data.backdrop_path}`,
    backdrop_path_small: `${BASE_IMAGE_URL}w300${data.backdrop_path}`,
    poster_path: `${BASE_IMAGE_URL}original${data.poster_path}`,
    poster_path_small: `${BASE_IMAGE_URL}w92${data.poster_path}`,
    belongs_to_collection: null,
    budget: 0,
    genres: data.genres,
    homepage: data.homepage,
    id: data.id,
    imdb_id: "",
    original_language: codeLanguage(data.original_language),
    original_title: data.original_name,
    overview: data.overview,
    popularity: data.popularity,
    production_companies: data.production_companies,
    production_countries: data.production_countries,
    release_date: newDate,
    revenue: 0,
    runtime: data.episode_run_time[0],
    runtimeStr: runtime,
    spoken_languages: data.spoken_languages,
    status: statusTranslate(data.status),
    tagline: data.tagline,
    title: data.name,
    vote_average: Number(data.vote_average.toFixed(1)),
    vote_count: data.vote_count,
    video: false,
    "watch/providers": {
      results: watchProviders,
    },
    videos: {
      results: trailers,
    },
    images: {
      backdrops: [],
      logos: [],
      posters: [],
    },
    credits: {
      crew: crewFilter,
      cast: data.credits.cast,
    },
    created_by: data.created_by,
    episode_run_time: data.episode_run_time,
    seasons: seasons,

    recommendations: {
      ...data.recommendations,
      results: recommendations,
    },
    genresStr: genresStr.join(", "),
  };

  return newData;
}

export function formatDataCollectionToCard(
  data: ResponseHttpCollectionProps,
  genres: GenreProps[]
): ResponseFormattedCollectionProps {
  const parts = formatDataMovieToCard(data.parts);

  let vote_average_vector = parts.map(({ vote_average }) => vote_average);
  let soma = vote_average_vector.reduce((a, b) => a + b, 0);

  let media = soma / vote_average_vector.length;

  let genresSet: Set<Number> = new Set();

  parts.forEach(({ genre_ids }) => {
    genre_ids.forEach((id) => {
      genresSet.add(id);
    });
  });

  let genresStr: String[] = Array.from(
    genresSet,
    (id) => genres.find((item) => item.id === id)?.name ?? ""
  );

  return {
    ...data,
    poster_path: `${BASE_IMAGE_URL}w500${data.poster_path}`,
    poster_path_small: `${BASE_IMAGE_URL}w92${data.poster_path}`,
    backdrop_path: `${BASE_IMAGE_URL}w780${data.backdrop_path}`,
    backdrop_path_small: `${BASE_IMAGE_URL}w300${data.backdrop_path}`,
    parts,
    genresStr: genresStr.join(", "),
    vote_average: media,
  };
}

export function formatDataDetailToSessions(
  data: ResponseFormattedDetailMovieProps
): ResponseFormattedCollectionProps {
  //@ts-ignore
  const parts: CardProps[] = data.seasons?.map((item) => {
    return {
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      id: item.id,
      original_language: "pt-BR",
      original_title: item.name,
      overview: item.overview,
      popularity: 0,
      poster_path: `${BASE_IMAGE_URL}w500${item.poster_path}`,
      release_date: `${item.episode_count} episódios`,
      title: `${item.name} (${item.air_date})`,
      video: false,
      vote_average: 0,
      vote_count: 0,
      media_type: "tv",
      origin_country: [],
      season_number: item.season_number,
    };
  });

  return {
    id: data.id,
    name: data.title,
    overview: data.overview,
    poster_path: data.poster_path,
    poster_path_small: data.poster_path_small ?? "",
    backdrop_path: data.backdrop_path,
    backdrop_path_small: data.backdrop_path_small ?? "",
    vote_average: data.vote_average,
    genresStr: data.genresStr,
    parts: parts,
  };
}
export function formatDataDetailSeason(
  data: ResponseHttpDetailSeasonProps
): ResponseDetailSeasonProps {
  const newDate = formatData(data.air_date ?? "00");

  //filtrando só as pessoas com esses perfils de trabalhos
  // set busca O(1)
  const jobs = new Set(["Characters", "Director", "Writer"]);
  const crewFilter = data.credits.crew.filter((item) => jobs.has(item.job));

  const trailers: VideoProps[] = [];
  data.videos.results.forEach((item) => {
    if (item.site === "YouTube") {
      if (item.type === "Trailer") {
        trailers.push(item);
      }
    }
  });

  const episodes: CardProps[] = data.episodes.map((item) => {
    return {
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      id: item.id,
      original_language: "pt-BR",
      original_title: item.name,
      overview: item.overview,
      popularity: 0,
      poster_path: `${BASE_IMAGE_URL}w500${item.still_path}`,
      release_date: `${item.episode_number}º  Episódio`,
      title: item.name,
      video: false,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      media_type: "tv",
      origin_country: [],
      season_number: item.season_number,
    };
  });

  let vote_average_vector = data.episodes.map(
    ({ vote_average }) => vote_average
  );
  let soma = vote_average_vector.reduce((a, b) => a + b, 0);

  let media = soma / vote_average_vector.length;

  return {
    ...data,
    air_date: newDate,
    poster_path: `${BASE_IMAGE_URL}w500${data.poster_path}`,
    poster_path_small: `${BASE_IMAGE_URL}w92${data.poster_path}`,
    videos: {
      results: trailers,
    },
    credits: {
      crew: crewFilter,
      cast: data.credits.cast,
    },
    episodes: episodes,
    vote_average: media,
  };
}

export function convertDataFavoriteToCard(
  value: ResponseFormattedDetailMovieProps,
  genre_ids: number[],
  type: TypeDetailProps
): CardProps {
  return {
    adult: value.adult,
    backdrop_path: value.backdrop_path,
    genre_ids: genre_ids,
    id: value.id,
    original_language: value.original_language,
    original_title: value.original_title,
    overview: "",
    popularity: 0,
    poster_path: value.poster_path,
    release_date: value.release_date,
    title: value.title,
    video: false,
    vote_average: value.vote_average,
    vote_count: 0,
    media_type: type,
    origin_country: [],
    backdrop_path_small: "",
    poster_path_small: "",
  };
}

export function youtubeHTML(videoID: string, height: number, width: number) {
  //see https://medium.com/capriza-engineering/communicating-between-react-native-and-the-webview-ac14b8b8b91a
  const returnValue = `<!DOCTYPE html>
  <html>
  <head>

<meta name="viewport" content="initial-scale=1.0">
  </head>
  <body style="margin: 0px;background-color:#000;">
      <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
      <div id="player"></div>

      <script>
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
            height: '${height}',
            width: '${width}',
            videoId: '${videoID}',
            events: {
              'onStateChange': onPlayerStateChange,
              'onReady':onPlayerReady,
            }
          });
        }

        // 4. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;
        function onPlayerStateChange(event) {
          window.ReactNativeWebView.postMessage("videoEvent_"+JSON.stringify(event.data))
        }
        function onPlayerReady(event) {
          window.ReactNativeWebView.postMessage("uploadedSuccessfully")
        }
        function playVideo() {
          player.playVideo();
          player.toggleFullscreen();
        }
      </script>
    </body>
  </html>`;
  return returnValue;
}
