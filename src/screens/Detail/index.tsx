import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  View,
  LogBox,
  Dimensions,
  TouchableOpacity,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import {
  useSharedValue,
  useAnimatedRef,
  scrollTo,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import {
  DeviceTypeProps,
  ResponseFormattedDetailMovieProps,
  UrlsIsValidProps,
} from "@src/interfaces";

import {
  Container,
  BackgroundImage,
  Gradient,
  Title,
  Text,
  DivRow,
  ContainerTitle,
  Content,
  Tagline,
  SubTitle,
  TitleH6,
  TextSmall,
  ButtonTrailer,
  ButtonTrailerText,
  BackgroundContainer,
} from "./styles";

import StarRating from "@src/components/StarRating";
import { apiFetchDetail, TypeDetailProps } from "@src/services/services";

import ListCardCastHorizontal from "@src/components/ListCardCastHorizontal";
import { scale } from "react-native-size-matters";
import HeaderList from "@src/components/HeaderList";
import ListCardHorizontal from "@src/components/ListCardHorizontal";
import { useSettings } from "@src/hooks/settings";

import SectionCollection from "@src/components/SectionCollection";
import SectionSeasons from "@src/components/SectionSeasons";
import LoadPage from "@src/components/LoadPage";
import HeaderDetail from "@src/components/HeaderDetail";
import FavoriteAnimation from "@src/components/FavoriteAnimation";
import {
  convertDataFavoriteToCard,
  formatDataDetailToSessions,
  imagePathIsValid,
  youtubeHTML,
} from "@src/utils/utils";
import { useDerivedValue } from "react-native-reanimated";

import ListWatch from "@src/components/ListWatch";

type ParamsProps = {
  params: {
    id: number;
    type: TypeDetailProps;
  };
};

type GroupTitleDescriptionProps = {
  title: string;
  description: string;
  deviceType: DeviceTypeProps;
};

const GroupTitleDescription = ({
  title,
  description,
  deviceType,
}: GroupTitleDescriptionProps) => {
  return (
    <View>
      <TitleH6 deviceType={deviceType}>{title}</TitleH6>
      <TextSmall deviceType={deviceType}>{description}</TextSmall>
    </View>
  );
};

var indexNextTrailer = 1;
var positionSessionTrailer = 0;
const { width, height } = Dimensions.get("screen");
export default function Detail() {
  LogBox.ignoreLogs([
    "Did not receive response to shouldStartLoad in time, defaulting to YES",
    "startLoadWithResult invoked with invalid lockIdentifier",
    "Task orphaned for request <NSMutableURLRequest",
  ]);
  const navigation = useNavigation();
  const {
    deviceType,
    favoritesIds,
    changeFavorite,
    language,
    region,
    adult,
    orientation,
  } = useSettings();
  const router = useRoute() as ParamsProps;
  const { id, type } = router.params;
  const webViewRef = useRef<WebView[]>([]);
  const scrollViewRef = useAnimatedRef();
  const scroll = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const theme = useTheme();

  const [data, setData] = useState<ResponseFormattedDetailMovieProps | null>();

  useEffect(() => {
    fetchDetail();
    return () => {
      indexNextTrailer = 1;
      positionSessionTrailer = 0;
    };
  }, [id, type]);

  async function fetchDetail(typeName = type, ValueId = id) {
    try {
      const response = await apiFetchDetail({
        type: typeName,
        id: ValueId,
        language,
        region,
        adult,
      });
      setData(response);
      scroll.value = withTiming(0, {
        duration: 1000,
        easing: Easing.ease,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useDerivedValue(() => {
    scrollTo(scrollViewRef, 0, scroll.value, true);
  });

  function play() {
    if (Platform.OS === "android") {
      scroll.value = withTiming(positionSessionTrailer, {
        duration: 2500,
        easing: Easing.ease,
      });
    }
    const run = `setTimeout(() => {
          playVideo();
           true
         }, 50);`;
    webViewRef.current[0].injectJavaScript(run);
  }

  function toggleFavorite(value: ResponseFormattedDetailMovieProps) {
    const genre_ids = value.genres.map((item) => item.id);
    const newDate = convertDataFavoriteToCard(value, genre_ids, type);
    changeFavorite(newDate);
    if (!favoritesIds.includes(id)) {
      setHeartAnimation(true);
      setTimeout(() => {
        setHeartAnimation(false);
      }, 1200);
    }
  }

  function nextTrailer(length: number) {
    if (length > indexNextTrailer)
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: indexNextTrailer,
      });
    indexNextTrailer++;
  }
  const handleDetail = useCallback(
    (id: Number) => {
      //@ts-ignore
      navigation.push("Detail", {
        id: id,
        type: type,
      });
    },
    [navigation]
  );
  const handleNavigateToDetailPerson = useCallback(
    (id: number) => {
      //@ts-ignore
      navigation.push("DetailPerson", {
        id: id,
      });
    },
    [navigation]
  );
  const handleSeeMore = useCallback(
    (path: UrlsIsValidProps, title: string) => {
      //@ts-ignore
      navigation.push("SeeMore", {
        path: path,
        title: title,
      });
    },
    [navigation]
  );

  const handleCollection = useCallback(
    (id: number) => {
      //@ts-ignore
      navigation.push("Collection", {
        id: id,
      });
    },
    [navigation]
  );
  const handleSessions = useCallback(() => {
    if (!data) return;
    const context = formatDataDetailToSessions(data);
    //@ts-ignore
    navigation.push("Collection", {
      id: id,
      context: context,
    });
  }, [data, navigation]);

  const imagePathIsValidMemorized = useCallback(
    (path: string) => imagePathIsValid(path),
    []
  );

  const gerPositionSessionTrailer = useCallback(
    (event: LayoutChangeEvent) =>
      (positionSessionTrailer = event.nativeEvent.layout.y),
    []
  );

  if (!data) return <LoadPage />;

  const trailerWidth =
    orientation === 1 ? width : deviceType === "tablet" ? height : width;
  // const trailerHeight = orientation === 1 ? width * 0.56 : height * 0.56;

  const poster_path_small = imagePathIsValidMemorized(
    data.poster_path_small ?? ""
  );
  const poster_path = imagePathIsValidMemorized(data.poster_path);

  const providers = data["watch/providers"].results?.[region];
  const isWatch =
    (providers?.buy?.length ?? 0) > 0 ||
    (providers?.flatrate?.length ?? 0) > 0 ||
    (providers?.rent?.length ?? 0) > 0;

  return (
    <Container
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      bounces={false}
      decelerationRate="normal"
      scrollEventThrottle={16}
    >
      <BackgroundContainer deviceType={deviceType} orientation={orientation}>
        <BackgroundImage source={poster_path_small} blurRadius={1}>
          <BackgroundImage source={poster_path} resizeMode="contain">
            <HeaderDetail
              deviceType={deviceType}
              onPressLeft={() => navigation.goBack()}
              //@ts-ignore
              onPressRight={() => navigation.navigate("Home")}
            />
            <Gradient
              colors={[
                "transparent",
                "transparent",
                theme.colors.backgroundPrimary,
              ]}
            >
              {heartAnimation && <FavoriteAnimation />}
              {data.videos.results.length > 0 && (
                <ButtonTrailer onPress={() => play()}>
                  <FontAwesome
                    name="youtube-play"
                    size={deviceType === "tablet" ? scale(35) : scale(50)}
                    color={theme.colors.red}
                  />
                  <ButtonTrailerText deviceType={deviceType}>
                    Trailer
                  </ButtonTrailerText>
                </ButtonTrailer>
              )}

              <ContainerTitle>
                <Title deviceType={deviceType}>{data.title}</Title>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleFavorite(data)}
                >
                  <AntDesign
                    name="heart"
                    size={deviceType === "tablet" ? scale(17) : scale(23)}
                    color={
                      favoritesIds.includes(id) ? theme.colors.red : "gray"
                    }
                    style={{ marginLeft: 5, transform: [{ translateY: 6 }] }}
                  />
                </TouchableOpacity>
              </ContainerTitle>
              <DivRow style={{ marginBottom: scale(10), flexWrap: "wrap" }}>
                <Text deviceType={deviceType}>{data.release_date}</Text>
                <Text
                  deviceType={deviceType}
                  style={{ marginHorizontal: scale(10) }}
                >
                  •
                </Text>
                <Fontisto
                  name="clock"
                  size={deviceType === "tablet" ? scale(10) : scale(13)}
                  color={theme.colors.textPrimary}
                  style={{ marginBottom: 7 }}
                />
                <Text
                  deviceType={deviceType}
                  style={{ marginHorizontal: scale(5) }}
                >
                  {data.runtimeStr}
                </Text>
                <Text deviceType={deviceType}>• {data.genresStr}</Text>
              </DivRow>
            </Gradient>
          </BackgroundImage>
        </BackgroundImage>
      </BackgroundContainer>
      <Content>
        <DivRow style={{ marginVertical: 10 }}>
          <StarRating
            sizeStar={deviceType === "tablet" ? 12 : 15}
            sizeText={deviceType === "tablet" ? 12 : 15}
            value={data.vote_average}
          />
          <Text deviceType={deviceType}> (Avaliação dos usuários)</Text>
        </DivRow>
      </Content>
      <Content>
        {data.tagline.length > 0 && (
          <Tagline deviceType={deviceType}> {data.tagline}</Tagline>
        )}
        <View style={{ marginBottom: scale(17) }}>
          <SubTitle deviceType={deviceType}>Sinopse</SubTitle>
          <Text deviceType={deviceType}>{data.overview}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: scale(17),
          }}
        >
          <GroupTitleDescription
            title="Título original"
            description={data.original_title}
            deviceType={deviceType}
          />
          <GroupTitleDescription
            title="Idioma original"
            description={data.original_language}
            deviceType={deviceType}
          />
        </View>

        <SubTitle deviceType={deviceType}>Informações</SubTitle>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: scale(17),
          }}
        >
          <GroupTitleDescription
            title="Situação"
            description={data.status}
            deviceType={deviceType}
          />
          <GroupTitleDescription
            title="Orcamento"
            description={new Intl.NumberFormat("de-DE").format(data.budget)}
            deviceType={deviceType}
          />
          <GroupTitleDescription
            title="Receita"
            description={new Intl.NumberFormat("de-DE").format(data.revenue)}
            deviceType={deviceType}
          />
        </View>
      </Content>

      {isWatch && (
        <Content>
          <SubTitle deviceType={deviceType}>Onde assistir</SubTitle>

          <ListWatch
            data={data["watch/providers"].results?.[region]?.flatrate}
            title="Stream"
            deviceType={deviceType}
          />
          <ListWatch
            data={data["watch/providers"].results?.[region]?.rent}
            title="Alugar"
            deviceType={deviceType}
          />
          <ListWatch
            data={data["watch/providers"].results?.[region]?.buy}
            title="Comprar"
            deviceType={deviceType}
          />
        </Content>
      )}

      <ListCardCastHorizontal
        deviceType={deviceType}
        data={data.credits.cast}
        title="Elenco"
        onPress={handleNavigateToDetailPerson}
      />
      <ListCardCastHorizontal
        deviceType={deviceType}
        data={data.credits.crew}
        title="Produção"
        onPress={handleNavigateToDetailPerson}
      />

      {data.videos.results.length > 0 && (
        <View style={{ flex: 1 }} onLayout={gerPositionSessionTrailer}>
          <HeaderList
            title="Trailers"
            isMore={data.videos.results.length > 1}
            onPress={() => nextTrailer(data.videos.results.length)}
            deviceType={deviceType}
          />
          <FlatList
            ref={flatListRef}
            style={{
              height: deviceType === "tablet" ? scale(240) : scale(270),
              flex: 1,
              paddingBottom: scale(20),
              backgroundColor: theme.colors.backgroundSecondary,
            }}
            data={data.videos.results}
            horizontal
            keyExtractor={(item) => item.key}
            pagingEnabled={true}
            renderItem={({ item, index }) => (
              <WebView
                key={item.key}
                style={{
                  width: trailerWidth,
                }}
                //@ts-ignore
                ref={(r) => (webViewRef.current[index] = r)}
                javaScriptEnabled={true}
                source={{
                  html: youtubeHTML(
                    item.key,
                    deviceType === "tablet" ? scale(230) : scale(260),
                    trailerWidth
                  ),
                }}
                startInLoadingState={true}
                onShouldStartLoadWithRequest={() => true}
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={true}
                androidLayerType="hardware"
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                bounces={false}
                // onMessage={(event) => {
                //   console.log("evente", event.nativeEvent.data);
                // }}
              />
            )}
            ListEmptyComponent={
              <SubTitle deviceType={deviceType}>
                Trailers não encontrados
              </SubTitle>
            }
          />
        </View>
      )}

      {data.seasons && (
        <SectionSeasons
          data={data.seasons[0]}
          deviceType={deviceType}
          onPress={handleSessions}
        />
      )}

      {data.belongs_to_collection !== null && (
        <SectionCollection
          data={data.belongs_to_collection}
          deviceType={deviceType}
          onPress={handleCollection}
        />
      )}

      {data.recommendations.results.length > 0 && (
        <>
          <ListCardHorizontal
            movies={data.recommendations.results}
            deviceType={deviceType}
            doubleSize={type === "tv" ? true : false}
            title="Recomendação"
            onPressSeeMore={() =>
              handleSeeMore(`${type}/${id}/recommendations`, "Recomendação")
            }
            onPressDetail={(id) => handleDetail(id)}
            marginHorizontal={theme.space.marginHorizontal}
          />
        </>
      )}

      <View style={{ height: 50 }}></View>
    </Container>
  );
}
