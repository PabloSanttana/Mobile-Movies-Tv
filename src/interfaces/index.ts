export type ThemeProps = "dark" | "light";
export type DeviceTypeProps = "unknown" | "phone" | "tablet" | "desktop" | "tv";
export type UserProps = {
  firstName: string;
  lastName?: string;
  image?: string;
};

export type CardProps = MovieProps & {
  origin_country: string[];
  backdrop_path_small?: string;
  poster_path_small?: string;
};

export type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: "tv" | "movie";
};

export type TvProps = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
};

export type GenreProps = {
  id: number;
  name: string;
};

export type UrlsIsValidProps =
  | "movie/now_playing"
  | "movie/popular"
  | "trending/movie/day"
  | "tv/popular"
  | "movie/upcoming"
  | "trending/tv/day"
  | `movie/${number}/recommendations`
  | `tv/${number}/recommendations`;

export type BelongsToCollectionProps = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  poster_path_small?: string;
  backdrop_path_small?: string;
};
type GenresProps = {
  id: number;
  name: string;
};
type ProductionCompaniesProps = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};
type ProductionCountriesProps = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguagesProps = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
export type VideoProps = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
export type crewProps = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
  cast_id: number;
  character: string;
  order: number;
};

export type ResponseHttpDetailBase = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollectionProps | null;
  budget: number;
  genres: GenresProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesProps[];
  production_countries: ProductionCountriesProps[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesProps[];
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
  videos: {
    results: VideoProps[];
  };
  images: {
    backdrops: [];
    logos: [];
    posters: [];
  };
  credits: {
    crew: crewProps[];
    cast: crewProps[];
  };
  created_by?: CreatedByProps[];
  episode_run_time?: [number];
  seasons?: SeasonsProps[];
};

export type ResponseHttpDefaultDetailMovieProps = ResponseHttpDetailBase & {
  recommendations: {
    page: number;
    results: MovieProps[];
    total_pages: number;
    total_results: number;
  };
};

export type ResponseFormattedDetailMovieProps = ResponseHttpDetailBase & {
  recommendations: {
    page: number;
    results: CardProps[];
    total_pages: number;
    total_results: number;
  };
  genresStr?: string;
  runtimeStr?: string;
  backdrop_path_small?: string;
  poster_path_small?: string;
};

export type CreatedByProps = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type EpisodeDataProps = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

export type NetworksProps = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type SeasonsProps = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  season_number: number;
  poster_path: string;
};

export type ResponseHttpDetailBaseTv = {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedByProps[];
  episode_run_time: [number];
  first_air_date: string;
  last_air_date: string;
  genres: GenreProps[];
  homepage: string;
  id: number;
  in_production: true;
  languages: [string];
  last_episode_to_air: EpisodeDataProps | null;
  name: string;
  next_episode_to_air: EpisodeDataProps | null;
  networks: NetworksProps[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesProps[];
  production_countries: ProductionCountriesProps[];
  seasons: SeasonsProps[];
  spoken_languages: SpokenLanguagesProps[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: VideoProps[];
  };
  credits: {
    crew: crewProps[];
    cast: crewProps[];
  };
};

export type ResponseHttpDefaultDetailTvProps = ResponseHttpDetailBaseTv & {
  recommendations: {
    page: number;
    results: TvProps[];
    total_pages: number;
    total_results: number;
  };
};
