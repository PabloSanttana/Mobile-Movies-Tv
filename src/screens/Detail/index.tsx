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
} from "./styles";

import { useTheme } from "styled-components";
import StarRating from "@src/components/StarRating";
import { apiFetchDetail, TypeDetailProps } from "@src/services/services";

import ListCardCastHorizontal from "@src/components/ListCardCastHorizontal";
import { scale } from "react-native-size-matters";
import HeaderList from "@src/components/HeaderList";
import ListCardMovieHorizontal from "@src/components/ListCardMovieHorizontal";
import { useSettings } from "@src/hooks/settings";

import SectionCollection from "@src/components/SectionCollection";
import SectionSeasons from "@src/components/SectionSeasons";
import LoadPage from "@src/components/LoadPage";
import HeaderDetail from "@src/components/HeaderDetail";
import FavoriteAnimation from "@src/components/FavoriteAnimation";

type ParamsProps = {
  params: {
    id: number;
    type: TypeDetailProps;
  };
};

type GroupTitleDescriptionProps = {
  title: string;
  description: string;
};

const GroupTitleDescription = ({
  title,
  description,
}: GroupTitleDescriptionProps) => {
  return (
    <View>
      <TitleH6 deviceType="phone">{title}</TitleH6>
      <TextSmall deviceType="phone">{description}</TextSmall>
    </View>
  );
};

var indexNextTrailer = 1;
const { width } = Dimensions.get("screen");
export function Detail() {
  LogBox.ignoreLogs([
    "Did not receive response to shouldStartLoad in time, defaulting to YES",
    "startLoadWithResult invoked with invalid lockIdentifier",
    "Task orphaned for request <NSMutableURLRequest",
  ]);
  const navigation = useNavigation();
  const { deviceType, favoritesIds, changeFavorite, language, region, adult } =
    useSettings();
  const router = useRoute() as ParamsProps;
  const { id, type } = router.params;
  const webViewRef = useRef<WebView[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const theme = useTheme();

  const [data, setData] = useState<ResponseFormattedDetailMovieProps | null>();
  console.log(id);
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
  async function handleDetail(id: Number) {
    //@ts-ignore
    navigation.push("Detail", {
      id: id,
      type: type,
    });
  }
  async function handleSeeMore(path: UrlsIsValidProps, title: string) {
    //@ts-ignore
    navigation.push("SeeMore", {
      path: path,
      title: title,
    });
  }
  console.log("favoritesIds", favoritesIds);

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
            {heartAnimation && <FavoriteAnimation />}
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
              <Title deviceType="phone">{data.title}</Title>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleFavorite(data)}
              >
                <Fontisto
                  name="favorite"
                  size={24}
                  color={favoritesIds.includes(id) ? theme.colors.red : "gray"}
                  style={{ transform: [{ translateY: 6 }] }}
                />
              </TouchableOpacity>
            </ContainerTitle>
            <DivRow style={{ marginBottom: 10, flexWrap: "wrap" }}>
              <Text deviceType="phone">{data.release_date}</Text>
              <Text deviceType="phone" style={{ marginHorizontal: 10 }}>
                •
              </Text>
              <Fontisto
                name="clock"
                size={20}
                color={theme.colors.textPrimary}
                style={{ marginBottom: 7 }}
              />
              <Text deviceType="phone" style={{ marginHorizontal: 5 }}>
                {data.runtimeStr}
              </Text>
              <Text deviceType="phone">{data.genresStr}</Text>
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
        {data.tagline.length > 0 && (
          <Tagline deviceType="phone"> {data.tagline}</Tagline>
        )}
        <View style={{ marginBottom: 20 }}>
          <SubTitle deviceType="phone">Sinopse</SubTitle>
          <Text deviceType="phone">{data.overview}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <GroupTitleDescription
            title="Título original"
            description={data.original_title}
          />
          <GroupTitleDescription
            title="Idioma original"
            description={data.original_language}
          />
        </View>

        <SubTitle deviceType="phone">Informações</SubTitle>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <GroupTitleDescription title="Situação" description={data.status} />
          <GroupTitleDescription
            title="Orcamento"
            description={new Intl.NumberFormat("de-DE").format(data.budget)}
          />
          <GroupTitleDescription
            title="Receita"
            description={new Intl.NumberFormat("de-DE").format(data.revenue)}
          />
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

      {data.seasons && <SectionSeasons data={data.seasons[0]} />}

      {data.belongs_to_collection !== null && (
        <SectionCollection
          data={data.belongs_to_collection}
          deviceType={deviceType}
        />
      )}

      {data.recommendations.results.length > 0 && (
        <>
          <ListCardMovieHorizontal
            movies={data.recommendations.results}
            deviceType={deviceType}
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
