import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { StatusBar } from "expo-status-bar";

import { useSettings } from "@src/hooks/settings";
import { CardProps, UrlsIsValidProps } from "@src/interfaces";
import ListCardHorizontal from "@src/components/ListCardHorizontal";
import ListCarousel from "@src/components/ListCarousel";
import Footer from "@src/components/Footer";
import { apiFetchMovieAndTv, TypeDetailProps } from "@src/services/services";

import { Container } from "./styles";
import LoadPage from "@src/components/LoadPage";

export function Home() {
  const navigation = useNavigation();
  const [nowPlaying, setNowPlaying] = useState<CardProps[]>([]);
  const [popularMovie, setPopularMovie] = useState<CardProps[]>([]);
  const [trendingMovie, setTrendingMovie] = useState<CardProps[]>([]);
  const [popularTv, setPopularTv] = useState<CardProps[]>([]);
  const [trendingTv, seTrendingTv] = useState<CardProps[]>([]);
  const [upcomingMovie, setUpcomingMovie] = useState<CardProps[]>([]);
  const [onLoad, setOnLoad] = useState(true);
  const theme = useTheme();
  const { deviceType, themeText, language, adult, region, orientation } =
    useSettings();

  useEffect(() => {
    getAll();
  }, [language]);

  async function getAll() {
    try {
      setOnLoad(true);
      const [
        nowPlayingData,
        popularMovieData,
        upcomingMovieData,
        trendingMovieData,
        popularTvData,
        trendingTvData,
      ] = await Promise.all([
        fetchNowPlaying(),
        fetchMoviesPopular(),
        fetchMoviesUpcoming(),
        fetchMoviesTrending(),
        fetchTvPopular(),
        fetchTvTrending(),
      ]);
      if (nowPlayingData) {
        setNowPlaying(nowPlayingData?.results);
      }
      if (popularMovieData) {
        setPopularMovie(popularMovieData?.results);
      }
      if (upcomingMovieData) {
        setUpcomingMovie(upcomingMovieData?.results);
      }
      if (trendingMovieData) {
        setTrendingMovie(trendingMovieData?.results);
      }
      if (popularTvData) {
        setPopularTv(popularTvData?.results);
      }
      if (trendingTvData) {
        seTrendingTv(trendingTvData?.results);
      }
    } finally {
      setOnLoad(false);
    }
  }

  async function fetchNowPlaying() {
    return await apiFetchMovieAndTv({
      apiUrl: "movie/now_playing",
      page: 1,
      language: language,
      adult: adult,
      region: region,
      callback: () => {},
    });
  }

  async function fetchMoviesPopular() {
    return await apiFetchMovieAndTv({
      apiUrl: "movie/popular",
      page: 1,
      language: language,
      adult: adult,
      region: region,
      callback: () => {},
    });
  }
  async function fetchMoviesUpcoming() {
    return await apiFetchMovieAndTv({
      apiUrl: "movie/upcoming",
      page: 1,
      language: language,
      adult: adult,
      region: region,
      callback: () => {},
    });
  }
  async function fetchMoviesTrending() {
    return await apiFetchMovieAndTv({
      apiUrl: "trending/movie/day",
      page: 1,
      language: language,
      adult: adult,
      region: region,
      callback: () => {},
    });
  }
  async function fetchTvPopular() {
    return await apiFetchMovieAndTv({
      apiUrl: "tv/popular",
      page: 1,
      language: language,
      adult: adult,
      region: region,
      callback: () => {},
    });
  }
  async function fetchTvTrending() {
    return await apiFetchMovieAndTv({
      apiUrl: "trending/tv/day",
      page: 1,
      language: language,
      adult: adult,
      region: region,
      callback: () => {},
    });
  }

  const handleSeeMore = useCallback(
    (type: UrlsIsValidProps, title: string) => {
      //@ts-ignore
      navigation.navigate("SeeMore", {
        path: type,
        title,
      });
    },
    [navigation]
  );

  const handleDetail = useCallback(
    (id: Number, type: TypeDetailProps) => {
      //@ts-ignore
      navigation.navigate("Detail", {
        id: id,
        type: type,
      });
    },
    [navigation]
  );

  if (onLoad) {
    return (
      <View
        style={{ flex: 1, backgroundColor: theme.colors.backgroundPrimary }}
      >
        <LoadPage />
      </View>
    );
  }

  const listCarousel = nowPlaying?.slice(0, 10);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <StatusBar translucent style={themeText == "light" ? "dark" : "light"} />
      {listCarousel.length > 0 && (
        <ListCarousel
          deviceType={deviceType}
          data={listCarousel}
          onPress={handleDetail}
        />
      )}

      <ListCardHorizontal
        movies={nowPlaying}
        deviceType={deviceType}
        doubleSize={false}
        title="Filmes laçamentos"
        onPressSeeMore={() =>
          handleSeeMore("movie/now_playing", "Filmes Laçamentos")
        }
        onPressDetail={(item) => handleDetail(item, "movie")}
        marginHorizontal={theme.space.marginHorizontal}
      />

      <ListCardHorizontal
        movies={trendingMovie}
        deviceType={deviceType}
        doubleSize={false}
        title="Tendências filmes"
        marginHorizontal={theme.space.marginHorizontal}
        onPressSeeMore={() =>
          handleSeeMore("trending/movie/day", "Tendências Diarias")
        }
        onPressDetail={(id) => handleDetail(id, "movie")}
      />
      <ListCardHorizontal
        movies={trendingTv}
        deviceType={deviceType}
        title="Tendências séries"
        doubleSize={true}
        marginHorizontal={theme.space.marginHorizontal}
        onPressSeeMore={() =>
          handleSeeMore("trending/tv/day", "Tendências séries")
        }
        onPressDetail={(id) => handleDetail(id, "tv")}
      />
      <ListCardHorizontal
        movies={popularTv}
        doubleSize={true}
        deviceType={deviceType}
        title="Popular tv series"
        marginHorizontal={theme.space.marginHorizontal}
        onPressSeeMore={() => handleSeeMore("tv/popular", "Popular tv series")}
        onPressDetail={(id) => handleDetail(id, "tv")}
      />
      <ListCardHorizontal
        movies={popularMovie}
        deviceType={deviceType}
        doubleSize={false}
        title="Filmes Popular"
        marginHorizontal={theme.space.marginHorizontal}
        onPressSeeMore={() => handleSeeMore("movie/popular", "Filmes Popular")}
        onPressDetail={(id) => handleDetail(id, "movie")}
      />
      <ListCardHorizontal
        movies={upcomingMovie}
        deviceType={deviceType}
        doubleSize={false}
        title="Em breve nos cinemas"
        marginHorizontal={theme.space.marginHorizontal}
        onPressSeeMore={() =>
          handleSeeMore("movie/upcoming", "Em breve nos cinemas")
        }
        onPressDetail={(id) => handleDetail(id, "movie")}
      />
      <Footer deviceType={deviceType} />
    </Container>
  );
}
