import { View, LogBox, FlatList } from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CardProps, ResponseFormattedCollectionProps } from "@src/interfaces";

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
import { apiFetchCollection, TypeDetailProps } from "@src/services/services";

import LoadPage from "@src/components/LoadPage";
import HeaderDetail from "@src/components/HeaderDetail";
import { useSettings } from "@src/hooks/settings";
import { scale } from "react-native-size-matters";
import CardGeneric from "@src/components/CardGeneric";
import { Image } from "@src/components/CardPrimaryMovie/styles";

type ParamsProps = {
  params: {
    id: number;
    type: TypeDetailProps;
    context: ResponseFormattedCollectionProps;
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

export function Collection() {
  LogBox.ignoreLogs([
    "Did not receive response to shouldStartLoad in time, defaulting to YES",
    "startLoadWithResult invoked with invalid lockIdentifier",
    "Task orphaned for request <NSMutableURLRequest",
  ]);
  const navigation = useNavigation();
  const { language, region, adult, deviceType } = useSettings();
  const router = useRoute() as ParamsProps;
  const { id, context } = router.params;
  const theme = useTheme();

  const [data, setData] = useState<ResponseFormattedCollectionProps | null>(
    context
  );

  useEffect(() => {
    if (!context) {
      fetchCollection();
    }
  }, [id, context]);

  async function fetchCollection(ValueId = id) {
    try {
      const response = await apiFetchCollection({
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

  function handleDetail(
    cadId: Number,
    type: "movie" | "tv",
    season_number?: number
  ) {
    //Serie
    if (context) {
      //@ts-ignore
      navigation.push("DetailSeason", {
        id: id,
        title: data?.name,
        seasonId: season_number,
        genresStr: data?.genresStr,
      });
      //filmes
    } else {
      //@ts-ignore
      navigation.push("Detail", {
        id: cadId,
        type: type,
      });
    }
  }

  const renderItem = useCallback(
    (item: CardProps) => (
      <CardGeneric
        key={item.id}
        deviceType={deviceType}
        data={item}
        isOverview
        onPress={() =>
          handleDetail(item.id, item.media_type, item.season_number)
        }
      />
    ),
    [deviceType]
  );

  if (!data) return <LoadPage />;

  const title = context
    ? `Números de Temporadas: ${data.parts.length}`
    : `Números de Filmes: ${data.parts.length}`;

  return (
    <Container showsVerticalScrollIndicator={false} bounces={false}>
      <BackgroundImage
        source={{
          uri: data.backdrop_path_small,
        }}
      >
        <BackgroundImage
          source={{
            uri: data.backdrop_path,
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
            <View style={{ marginBottom: scale(45) }}>
              <Image
                source={{ uri: data.poster_path }}
                deviceType="phone"
                doubleSize={false}
              />
            </View>

            <ContainerTitle>
              <Title deviceType="phone">{data.name}</Title>
            </ContainerTitle>
            <DivRow style={{ marginBottom: 10, flexWrap: "wrap" }}>
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
          <GroupTitleDescription title={title} description="" />
        </View>
      </Content>

      {data.parts.map((movie) => renderItem(movie))}

      <View style={{ height: 50 }}></View>
    </Container>
  );
}
