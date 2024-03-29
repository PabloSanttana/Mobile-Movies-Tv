import React, { useCallback, useEffect, useState, useRef } from "react";
import { NativeScrollEvent } from "react-native";
import { scale } from "react-native-size-matters";
import {
  Animated,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container } from "./styles";
import ListCategory from "@src/components/ListCategory";
import {
  apiFetchGenres,
  TypeGenreProps,
  apiFetchMovieAndTv,
  TypeDetailProps,
} from "@src/services/services";
import { CardProps, RenderItemProps, UrlsIsValidProps } from "@src/interfaces";
import CardGeneric from "@src/components/CardGeneric";
import Header from "@src/components/Header";
import { useSettings } from "@src/hooks/settings";

import NotFound from "@src/components/NotFound";
import LoadItem from "@src/components/LoadItem";
import LoadPage from "@src/components/LoadPage";

type ParamsProps = {
  path: UrlsIsValidProps;
  title: string;
};

export type ObjectGenresProps = {
  [id: string]: string;
};

var count = 0;
var isHeaderHider = false;
var page = 1;
var totalPages = 0;
var genre: string = "";
const { height } = Dimensions.get("screen");
export default function SeeMore() {
  const navigation = useNavigation();
  const { deviceType, language, adult, region, orientation } = useSettings();
  const router = useRoute().params as ParamsProps;
  const [genres, setGenres] = useState<ObjectGenresProps>({});
  const [genreSelected, setGenreSelected] = useState<string>("");
  const [data, setData] = useState<CardProps[]>([]);
  const toggleHeader = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGenre, setIsLoadingGenre] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isTablet = deviceType === "tablet";

  useEffect(() => {
    page = 1;
    count = 0;
    isHeaderHider = false;
    totalPages = 0;
    fetchListGenres();
    return () => {
      page = 1;
      count = 0;
      isHeaderHider = false;
      totalPages = 0;
      genre = "";
    };
  }, [language]);

  useEffect(() => {
    ApiFetchData();
  }, [genreSelected, language, router]);

  //console.log("seemore", router.path);

  async function fetchListGenres() {
    setIsLoadingGenre(true);
    const mediaType: TypeGenreProps = router.path.includes("movie")
      ? "movie"
      : "tv";
    const response = await apiFetchGenres({
      type: mediaType,
      language: language,
    });
    if (response) {
      var objectGenres: ObjectGenresProps = {};
      response?.genres.forEach((item) => {
        objectGenres[item.id] = item.name;
      });
      setGenres(objectGenres);
    }
    setIsLoadingGenre(false);
  }
  async function ApiFetchData(NumPage = page, ValueGenre = genre) {
    if (isLoading || isLoadingMore) return;
    if (totalPages && page > totalPages) return;
    page === 1 ? setIsLoading(true) : setIsLoadingMore(true);
    try {
      const response = await apiFetchMovieAndTv({
        apiUrl: router.path,
        page: NumPage,
        genre: ValueGenre,
        language: language,
        adult: adult,
        region: region,
      });

      if (response) {
        setData((oldValue) =>
          page === 1 ? response?.results : [...oldValue, ...response?.results]
        );
        page = page + 1;
        totalPages = response.total_pages;
      }
    } catch (error) {
      alert("Não foi possivel carregar a lista");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }

  function handleSelectGenre(value: string) {
    page = 1;
    genre = genre === value ? "" : value;
    setGenreSelected((oldValue) => (oldValue === value ? "" : value));
  }

  const closeHeader = useCallback(() => {
    Animated.timing(toggleHeader, {
      toValue: -scale(75),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const openHeader = useCallback(() => {
    Animated.timing(toggleHeader, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  function handleToggleHeader(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const value = event.nativeEvent.contentOffset.y;
    if (value < 0) return;
    if (value > count) {
      count = value;
      if (!isHeaderHider) {
        closeHeader();
        isHeaderHider = true;
      }
    } else {
      count = value;
      if (isHeaderHider) {
        isHeaderHider = false;
        openHeader();
      }
    }
  }
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

  const MARGIN_TOP = 20;
  const ITEM_HEIGHT = isTablet
    ? scale(90) + MARGIN_TOP
    : scale(140) + MARGIN_TOP;

  const getItemLayout = useCallback(
    (data: CardProps[] | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index: index,
    }),
    []
  );

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => (
      <CardGeneric
        deviceType={deviceType}
        data={item}
        dictionary={genres}
        onPress={() => handleDetail(item.id, item.media_type)}
        sizeStar={isTablet ? 8 : 12}
        sizeText={isTablet ? 8 : 12}
      />
    ),
    [deviceType, genres]
  );

  const KeyExtractor = useCallback((item: CardProps) => item.id.toString(), []);

  if (!data || isLoadingGenre) {
    return <LoadPage />;
  }

  return (
    <Container>
      <StatusBar />

      <Header deviceType={deviceType} title={router.title} />
      <Animated.View
        style={{
          width: "100%",
          height: height + 40,
          transform: [{ translateY: toggleHeader }],
        }}
      >
        {genres && (
          <ListCategory
            deviceType={deviceType}
            data={genres}
            genreSelected={genreSelected}
            selectGenre={handleSelectGenre}
          />
        )}
        {isLoading ? (
          <LoadItem />
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={KeyExtractor}
            renderItem={renderItem}
            onScroll={handleToggleHeader}
            bounces={false}
            numColumns={isTablet ? 2 : 1}
            contentContainerStyle={{
              paddingBottom: scale(60),
              paddingHorizontal: 10,
            }}
            ListFooterComponent={
              isLoadingMore ? (
                <ActivityIndicator
                  size="small"
                  color="#999"
                  style={{ marginVertical: 30 }}
                />
              ) : null
            }
            onEndReached={() => ApiFetchData()}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            viewabilityConfig={{
              waitForInteraction: true,
              itemVisiblePercentThreshold: 50,
              minimumViewTime: 300,
            }}
            getItemLayout={getItemLayout}
          />
        ) : (
          <NotFound />
        )}
      </Animated.View>
    </Container>
  );
}
