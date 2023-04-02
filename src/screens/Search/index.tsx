import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Animated,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  FlatList,
  View,
} from "react-native";

import { Container } from "./styles";
import {
  apiFetchGenres,
  apiFetchSearchAll,
  TypeDetailProps,
} from "@src/services/services";
import { CardProps } from "@src/interfaces";
import CardGeneric from "@src/components/CardGeneric";
import Header from "@src/components/Header";
import { useSettings } from "@src/hooks/settings";
import { scale } from "react-native-size-matters";
import NotFound from "@src/components/NotFound";
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
const { height, width } = Dimensions.get("screen");
export default function Search() {
  const navigation = useNavigation();
  const { deviceType, language, region, adult } = useSettings();
  const [genres, setGenres] = useState<ObjectGenresProps>({});
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<CardProps[]>([]);
  const toggleHeader = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    };
  }, []);

  async function fetchListGenres() {
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
  }
  async function ApiFetchData(NumPage = page, searchValue = search) {
    if (isLoading || isLoadingMore) return;
    if (totalPages && page > totalPages) return;
    page === 1 ? setIsLoading(true) : setIsLoadingMore(true);
    try {
      const response = await apiFetchSearchAll({
        page: NumPage,
        search: searchValue,
        language: language,
        region: region,
        adult: adult,
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

  const closeHeader = useCallback(() => {
    Animated.timing(toggleHeader, {
      toValue: scale(-45),
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
  function handleToggleHeader(value: number) {
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

  const renderItem = useCallback(
    (item: CardProps) => (
      <CardGeneric
        deviceType={deviceType}
        data={item}
        dictionary={genres}
        onPress={() => handleDetail(item.id, item.media_type)}
        sizeStar={deviceType === "tablet" ? 8 : 15}
        sizeText={deviceType === "tablet" ? 8 : 15}
      />
    ),
    [deviceType, genres]
  );

  function handleSearch() {
    page = 1;
    ApiFetchData();
  }

  async function handleDetail(id: Number, type: TypeDetailProps) {
    //@ts-ignore
    navigation.navigate("Detail", {
      id: id,
      type: type,
    });
  }

  return (
    <Container>
      <StatusBar />

      <Header deviceType={deviceType} title="Search" />
      <Animated.View
        style={{
          width,
          height: height + 40,
          transform: [{ translateY: toggleHeader }],
        }}
      >
        <SearchInput
          value={search}
          setValue={setSearch}
          onPress={() => handleSearch()}
          deviceType={deviceType}
        />
        {isLoading ? (
          <LoadItem />
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => renderItem(item)}
            onScroll={(e) => handleToggleHeader(e.nativeEvent.contentOffset.y)}
            bounces={false}
            numColumns={deviceType === "tablet" ? 2 : 1}
            contentContainerStyle={{
              paddingBottom: scale(170),
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
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            viewabilityConfig={{
              waitForInteraction: true,
              itemVisiblePercentThreshold: 50,
              minimumViewTime: 300,
            }}
          />
        ) : (
          <NotFound />
        )}
      </Animated.View>
    </Container>
  );
}
