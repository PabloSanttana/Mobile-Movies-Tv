import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Animated,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

import { Container } from "./styles";
import { apiFetchGenres, TypeDetailProps } from "@src/services/services";
import { CardProps, RenderItemProps } from "@src/interfaces";
import CardGeneric from "@src/components/CardGeneric";
import Header from "@src/components/Header";
import { useSettings } from "@src/hooks/settings";
import { scale } from "react-native-size-matters";
import SearchInput from "@src/components/SearchInput";

import LoadItem from "@src/components/LoadItem";
import { useNavigation } from "@react-navigation/native";

export type ObjectGenresProps = {
  [id: string]: string;
};

var count = 0;
var isHeaderHider = false;
var page = 1;
var totalPages = 0;
const itemsPerPage = 10;
const { height, width } = Dimensions.get("screen");
export default function Favorites() {
  const navigation = useNavigation();
  const { deviceType, favorites, language } = useSettings();
  const [genres, setGenres] = useState<ObjectGenresProps>({});
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<CardProps[]>([]);
  const toggleHeader = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isTablet = deviceType === "tablet";

  useEffect(() => {
    page = 1;
    count = 0;
    isHeaderHider = false;
    totalPages = Math.ceil(favorites.length / 10);

    fetchListGenres();
    return () => {
      page = 1;
      count = 0;
      isHeaderHider = false;
      totalPages = 0;
    };
  }, [favorites]);

  async function fetchListGenres() {
    setIsLoading(true);
    const responseMovie = await apiFetchGenres({
      type: "movie",
      language: language,
    });
    const responseTv = await apiFetchGenres({ type: "tv", language: language });
    if (responseMovie && responseTv) {
      var objectGenres: ObjectGenresProps = {};
      responseMovie?.genres.forEach((item) => {
        objectGenres[item.id] = item.name;
      });
      responseTv?.genres.forEach((item) => {
        objectGenres[item.id] = item.name;
      });
      setGenres(objectGenres);
    }
    setIsLoading(false);
    pagination();
  }

  function pagination(_page = page) {
    if (isLoading || isLoadingMore) return;
    if (totalPages && page > totalPages) return;
    page === 1 ? setIsLoading(true) : setIsLoadingMore(true);

    try {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const { length } = data;
      const newItems =
        page === 1
          ? favorites.slice(startIndex, endIndex)
          : [...data, ...favorites.slice(length, length + itemsPerPage)];
      setData(newItems);
      page = page + 1;
    } catch (error) {
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }

  const closeHeader = useCallback(() => {
    Animated.timing(toggleHeader, {
      toValue: scale(isTablet ? -27 : -45),
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

  function handleDetail(id: Number, type: TypeDetailProps) {
    //@ts-ignore
    navigation.navigate("Detail", {
      id: id,
      type: type,
    });
  }
  function scrollToTop() {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: 0,
    });
  }

  function changeSearch(value: string) {
    if (value.length > 2 && filter.length > 0) {
      scrollToTop();
    }
    setSearch(value);
  }

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
        sizeStar={isTablet ? 8 : 15}
        sizeText={isTablet ? 8 : 15}
      />
    ),
    [deviceType, genres]
  );
  const KeyExtractor = useCallback((item: CardProps) => item.id.toString(), []);

  const filter =
    search.length > 2
      ? data.filter(({ title }) =>
          title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : data;

  return (
    <Container>
      <StatusBar />

      <Header deviceType={deviceType} title="Favoritos" />
      <Animated.View
        style={{
          width: "100%",
          height: height + 40,
          transform: [{ translateY: toggleHeader }],
        }}
      >
        <SearchInput
          value={search}
          setValue={changeSearch}
          onPress={() => console.log("")}
          deviceType={deviceType}
        />

        {isLoading ? (
          <LoadItem />
        ) : (
          <FlatList
            ref={flatListRef}
            data={filter}
            keyExtractor={KeyExtractor}
            renderItem={renderItem}
            onScroll={handleToggleHeader}
            bounces={false}
            numColumns={isTablet ? 2 : 1}
            contentContainerStyle={{
              paddingBottom: scale(170),
              marginHorizontal: 10,
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
            onEndReached={() => pagination()}
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
        )}
      </Animated.View>
    </Container>
  );
}
