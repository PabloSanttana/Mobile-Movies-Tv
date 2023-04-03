import {
  FlatList,
  View,
  LogBox,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  DeviceTypeProps,
  ResponseFormattedDetailMovieProps,
  UrlsIsValidProps,
} from "@src/interfaces";
import { Fontisto } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";

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

import { useTheme } from "styled-components";
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
import { formatDataDetailToSessions } from "@src/utils/utils";
import { Logo } from "@src/assets/logo.png";

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
const { width, height } = Dimensions.get("screen");
export function Detail() {
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
  const flatListRef = useRef<FlatList>(null);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const theme = useTheme();

  const [data, setData] = useState<ResponseFormattedDetailMovieProps | null>();

  useEffect(() => {
    fetchDetail();
    return () => {
      indexNextTrailer = 1;
    };
  }, [id, type]);

  async function fetchDetail(typeName = type, ValueId = id) {
    try {
      const response = await apiFetchDetail({
        type: typeName,
        id: ValueId,
        language: language,
        region: region,
        adult: adult,
      });
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  function play() {
    console.log("oi");
    const run = `setTimeout(() => {
      document.querySelector(".ytp-play-button").click();
      true
    }, 50);`;
    webViewRef.current[0].injectJavaScript(run);
  }

  function toggleFavorite(value: ResponseFormattedDetailMovieProps) {
    const genre_ids = value.genres.map((item) => item.id);
    const newDate = {
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
    changeFavorite(newDate);
    if (!favoritesIds.includes(id)) {
      setHeartAnimation(true);
      setTimeout(() => {
        setHeartAnimation(false);
      }, 1000);
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
  function handleDetail(id: Number) {
    //@ts-ignore
    navigation.push("Detail", {
      id: id,
      type: type,
    });
  }
  function handleSeeMore(path: UrlsIsValidProps, title: string) {
    //@ts-ignore
    navigation.push("SeeMore", {
      path: path,
      title: title,
    });
  }
  function handleCollection(id: number) {
    //@ts-ignore
    navigation.push("Collection", {
      id: id,
    });
  }
  function handleSessions() {
    if (!data) return;
    const context = formatDataDetailToSessions(data);
    //@ts-ignore
    navigation.push("Collection", {
      id: id,
      context: context,
    });
  }

  if (!data) return <LoadPage />;

  const trailerWidth =
    orientation === 1
      ? deviceType === "tablet"
        ? width
        : width
      : deviceType === "tablet"
      ? height
      : width;
  // const trailerHeight = orientation === 1 ? width * 0.56 : height * 0.56;

  return (
    <Container showsVerticalScrollIndicator={false} bounces={false}>
      <BackgroundContainer deviceType={deviceType} orientation={orientation}>
        <BackgroundImage
          defaultSource={Logo}
          source={{
            uri: data.poster_path_small,
          }}
          blurRadius={1}
        >
          <BackgroundImage
            defaultSource={Logo}
            source={{
              uri: data.poster_path,
            }}
            resizeMode="contain"
          >
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
                  <Fontisto
                    name="favorite"
                    size={deviceType === "tablet" ? scale(18) : scale(24)}
                    color={
                      favoritesIds.includes(id) ? theme.colors.red : "gray"
                    }
                    style={{ transform: [{ translateY: 6 }] }}
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

      <ListCardCastHorizontal
        deviceType={deviceType}
        data={data.credits.cast}
        title="Elenco"
      />
      <ListCardCastHorizontal
        deviceType={deviceType}
        data={data.credits.crew}
        title="Produção"
      />

      {data.videos.results.length > 0 && (
        <>
          <HeaderList
            title="Trailers"
            isMore={data.videos.results.length > 1}
            onPress={() => nextTrailer(data.videos.results.length)}
            deviceType={deviceType}
          />
          <FlatList
            ref={flatListRef}
            style={{
              height: deviceType === "tablet" ? scale(220) : scale(250),
              flex: 1,
            }}
            data={data.videos.results}
            horizontal
            keyExtractor={(item) => item.key}
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
                  uri: `https://www.youtube.com/embed/${item.key}?rel=0&autoplay=0&showinfo=0&controls=1`,
                }}
                startInLoadingState={true}
                onShouldStartLoadWithRequest={() => true}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ListEmptyComponent={
              <SubTitle deviceType={deviceType}>
                Trailers não encontrados
              </SubTitle>
            }
          />
        </>
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
