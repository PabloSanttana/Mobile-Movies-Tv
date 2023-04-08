import { View, LogBox } from "react-native";

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
  SubTitle,
  TitleH6,
  TextSmall,
  BackgroundContainer,
} from "@src/screens/Detail/styles";

import { useTheme } from "styled-components";
import StarRating from "@src/components/StarRating";
import { apiFetchCollection, TypeDetailProps } from "@src/services/services";

import LoadPage from "@src/components/LoadPage";
import HeaderDetail from "@src/components/HeaderDetail";
import { useSettings } from "@src/hooks/settings";
import { scale } from "react-native-size-matters";
import CardGeneric from "@src/components/CardGeneric";
import { Image } from "@src/components/CardPrimaryMovie/styles";
import { imagePathIsValid } from "@src/utils/utils";

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

export default function Collection() {
  LogBox.ignoreLogs([
    "Did not receive response to shouldStartLoad in time, defaulting to YES",
    "startLoadWithResult invoked with invalid lockIdentifier",
    "Task orphaned for request <NSMutableURLRequest",
  ]);
  const navigation = useNavigation();
  const { language, region, adult, deviceType, orientation } = useSettings();
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
  }, [id, context, language]);

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
      <View key={item.id} style={{ marginHorizontal: 10 }}>
        <CardGeneric
          key={item.id}
          deviceType={deviceType}
          data={item}
          isOverview
          onPress={() =>
            handleDetail(item.id, item.media_type, item.season_number)
          }
        />
      </View>
    ),
    [deviceType]
  );

  const imagePathIsValidMemorized = useCallback(
    (path: string) => imagePathIsValid(path),
    []
  );

  if (!data) return <LoadPage />;

  const title = context
    ? `Números de Temporadas: ${data.parts.length}`
    : `Números de Filmes: ${data.parts.length}`;

  const isTablet = deviceType === "tablet";

  const backdrop_path_small = imagePathIsValidMemorized(
    data.backdrop_path_small
  );
  const backdrop_path = imagePathIsValidMemorized(data.backdrop_path);
  const poster_path = imagePathIsValidMemorized(data.poster_path);

  return (
    <Container showsVerticalScrollIndicator={false} bounces={false}>
      <BackgroundContainer deviceType={deviceType} orientation={orientation}>
        <BackgroundImage source={backdrop_path_small} blurRadius={1}>
          <BackgroundImage source={backdrop_path}>
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
              <View
                style={{
                  marginBottom:
                    orientation === 1
                      ? isTablet
                        ? scale(30)
                        : scale(60)
                      : isTablet
                      ? scale(30)
                      : scale(2),

                  marginLeft: orientation !== 1 && !isTablet ? "5%" : 0,
                }}
              >
                <Image
                  source={poster_path}
                  deviceType={deviceType}
                  doubleSize={false}
                />
              </View>

              <ContainerTitle>
                <Title deviceType={deviceType}>{data.name}</Title>
              </ContainerTitle>
              <DivRow style={{ marginBottom: 10, flexWrap: "wrap" }}>
                <Text deviceType={deviceType}>{data.genresStr}</Text>
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
        <View style={{ marginBottom: 20 }}>
          <SubTitle deviceType={deviceType}>Sinopse</SubTitle>
          <Text deviceType={deviceType}>{data.overview}</Text>
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

      {data.parts.map(renderItem)}

      <View style={{ height: 50 }}></View>
    </Container>
  );
}
