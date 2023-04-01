import { FlatList, View, LogBox, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CardProps,
  ResponseDetailSeasonProps,
  ResponseFormattedDetailMovieProps,
  UrlsIsValidProps,
} from "@src/interfaces";

import { FontAwesome } from "@expo/vector-icons";

import {
  Container,
  BackgroundImage,
  Gradient,
  Title,
  Text,
  ContainerTitle,
  Content,
  SubTitle,
  ButtonTrailer,
  ButtonTrailerText,
} from "./styles";

import { useTheme } from "styled-components";

import {
  apiFetchDetail,
  apiFetchDetailSeason,
  TypeDetailProps,
} from "@src/services/services";

import { scale } from "react-native-size-matters";
import HeaderList from "@src/components/HeaderList";

import { useSettings } from "@src/hooks/settings";

import LoadPage from "@src/components/LoadPage";
import HeaderDetail from "@src/components/HeaderDetail";
import ListCardCastHorizontal from "@src/components/ListCardCastHorizontal";
import StarRating from "@src/components/StarRating";
import { DivRow } from "../Collection/styles";
import CardGeneric from "@src/components/CardGeneric";

type ParamsProps = {
  params: {
    id: number;
    title: string;
    seasonId: number;
    genresStr: string;
  };
};

var indexNextTrailer = 1;
const { width } = Dimensions.get("screen");
export function DetailSeason() {
  LogBox.ignoreLogs([
    "Did not receive response to shouldStartLoad in time, defaulting to YES",
    "startLoadWithResult invoked with invalid lockIdentifier",
    "Task orphaned for request <NSMutableURLRequest",
  ]);
  const navigation = useNavigation();
  const { deviceType, language, region, adult } = useSettings();
  const router = useRoute() as ParamsProps;
  const { id, seasonId, title, genresStr } = router.params;
  const webViewRef = useRef<WebView[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const theme = useTheme();

  const [data, setData] = useState<ResponseDetailSeasonProps | null>();
  console.log(id);
  console.log("Temporada", seasonId);
  useEffect(() => {
    fetchDetail();
    return () => {
      indexNextTrailer = 1;
    };
  }, [id]);

  async function fetchDetail() {
    try {
      const response = await apiFetchDetailSeason({
        seasonId: seasonId,
        id: id,
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
    const run = `setTimeout(() => {
      document.querySelector(".ytp-play-button").click();
      true
    }, 50);`;
    webViewRef.current[0].injectJavaScript(run);
  }

  function nextTrailer(length: number) {
    if (length > indexNextTrailer)
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: indexNextTrailer,
      });
    indexNextTrailer++;
  }

  const renderItem = useCallback(
    (item: CardProps) => (
      <CardGeneric
        key={item.id}
        deviceType={deviceType}
        data={item}
        isOverview
        onPress={() => {}}
      />
    ),
    [deviceType]
  );

  if (!data) return <LoadPage />;

  return (
    <Container showsVerticalScrollIndicator={false} bounces={false}>
      <BackgroundImage
        source={{
          uri: data.poster_path_small,
        }}
      >
        <BackgroundImage
          source={{
            uri: data.poster_path,
          }}
        >
          <HeaderDetail
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
            {data.videos.results.length > 0 && (
              <ButtonTrailer onPress={play}>
                <FontAwesome
                  name="youtube-play"
                  size={scale(50)}
                  color={theme.colors.red}
                />
                <ButtonTrailerText>Trailer</ButtonTrailerText>
              </ButtonTrailer>
            )}

            <ContainerTitle>
              <Title deviceType="phone">
                {title} {data.name}
              </Title>
            </ContainerTitle>
            <DivRow style={{ marginBottom: 10, flexWrap: "wrap" }}>
              <Text deviceType="phone">{genresStr}</Text>
            </DivRow>
          </Gradient>
        </BackgroundImage>
      </BackgroundImage>
      <Content>
        <DivRow style={{ marginVertical: 10 }}>
          <StarRating value={data.vote_average} />
          <Text deviceType="phone"> (Avaliação dos usuários)</Text>
        </DivRow>
      </Content>
      <Content>
        <View style={{ marginBottom: 20 }}>
          <SubTitle deviceType="phone">Sinopse</SubTitle>
          <Text deviceType="phone">{data.overview}</Text>
        </View>
      </Content>

      <ListCardCastHorizontal data={data.credits.cast} title="Elenco" />
      <ListCardCastHorizontal data={data.credits.crew} title="Produção" />

      <HeaderList
        title="Trailers"
        isMore={data.videos.results.length > 1}
        onPress={() => nextTrailer(data.videos.results.length)}
      />
      <FlatList
        ref={flatListRef}
        style={{ height: width * 0.56, flex: 1 }}
        data={data.videos.results}
        horizontal
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <WebView
            key={item.key}
            style={{ width: width, height: width * 0.56 }}
            //@ts-ignore
            ref={(r) => (webViewRef.current[index] = r)}
            javaScriptEnabled={true}
            source={{
              uri: `https://www.youtube.com/embed/${item.key}?rel=0&autoplay=1&showinfo=0&controls=1`,
            }}
            startInLoadingState={true}
            onShouldStartLoadWithRequest={() => true}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ListEmptyComponent={
          <SubTitle deviceType="phone">Trailers não encontrados</SubTitle>
        }
      />
      <HeaderList title="Episódios" isMore={false} onPress={() => {}} />
      {data.episodes.map((ep) => renderItem(ep))}

      <View style={{ height: 50 }}></View>
    </Container>
  );
}
