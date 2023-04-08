import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSettings } from "@src/hooks/settings";
import {
  TypeDetailProps,
  apiFetchGenres,
  apiFetchPersonDetail,
  apiFetchPersonMovies,
} from "@src/services/services";
import { CardProps, DetailPersonProps, RenderItemProps } from "@src/interfaces";
import LoadPage from "@src/components/LoadPage";
import {
  BackgroundContainer,
  BackgroundImage,
  ContainerTitle,
  Gradient,
  SubTitle,
  Title,
  Text,
  Content,
  Container,
} from "../Detail/styles";
import HeaderDetail from "@src/components/HeaderDetail";
import { imagePathIsValid } from "@src/utils/utils";
import { useTheme } from "styled-components";
import { scale } from "react-native-size-matters";
import CardGeneric from "@src/components/CardGeneric";
import { ObjectGenresProps } from "../Favorites";
import ListCardHorizontal from "@src/components/ListCardHorizontal";

type ParamsProps = {
  params: {
    id: number;
  };
};

export default function DetailPerson() {
  const router = useRoute() as ParamsProps;
  const { id } = router.params;
  const navigation = useNavigation();
  const theme = useTheme();
  const { region, deviceType, language, adult, orientation } = useSettings();
  const [person, setPerson] = useState<DetailPersonProps>();
  const [genres, setGenres] = useState<ObjectGenresProps>({});
  const [movies, setMovies] = useState<CardProps[]>([]);
  const [tv, setTv] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isTablet = deviceType === "tablet";

  console.log(id);
  useEffect(() => {
    fetchListGenres();
  }, [id]);

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
    getAll();
  }

  async function getAll() {
    const [personDetail, personMovies] = await Promise.all([
      getPersonDetail(),
      getPersonMovies(),
    ]);

    if (personDetail && personMovies) {
      setPerson(personDetail);
      setMovies(personMovies.movie);
      setTv(personMovies.tv);
      setIsLoading(false);
    }
  }

  async function getPersonDetail() {
    return apiFetchPersonDetail({
      id: router.params.id,
      region,
      language,
      adult,
    });
  }
  async function getPersonMovies() {
    return apiFetchPersonMovies({
      id,
      region,
      language,
      adult,
    });
  }

  const imagePathIsValidMemorized = useCallback(
    (path: string) => imagePathIsValid(path),
    []
  );

  function handleDetail(id: Number, type: TypeDetailProps) {
    //@ts-ignore
    navigation.push("Detail", {
      id: id,
      type: type,
    });
  }

  const profile_path_small = imagePathIsValidMemorized(
    person?.profile_path_small ?? ""
  );
  const profile_path = imagePathIsValidMemorized(person?.profile_path ?? "");

  if (isLoading) return <LoadPage />;

  const HeaderPerson = () => {
    return (
      <>
        <BackgroundContainer deviceType={deviceType} orientation={orientation}>
          <BackgroundImage source={profile_path_small} blurRadius={1}>
            <BackgroundImage source={profile_path} resizeMode="contain">
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
                <ContainerTitle>
                  <Title deviceType={deviceType}>{person?.name}</Title>
                </ContainerTitle>
              </Gradient>
            </BackgroundImage>
          </BackgroundImage>
        </BackgroundContainer>
        <Content>
          <View style={{ marginBottom: scale(17) }}>
            <SubTitle deviceType={deviceType}>Bibliografia</SubTitle>
            <Text deviceType={deviceType}>{person?.biography}</Text>
          </View>
        </Content>
      </>
    );
  };

  return (
    <Container>
      <HeaderPerson />
      <ListCardHorizontal
        movies={movies}
        deviceType={deviceType}
        doubleSize={false}
        title={`filmes`}
        onPressSeeMore={() => {}}
        onPressDetail={(item) => handleDetail(item, "movie")}
        marginHorizontal={theme.space.marginHorizontal}
      />
      <ListCardHorizontal
        movies={tv}
        deviceType={deviceType}
        doubleSize={true}
        title={`Séries`}
        onPressSeeMore={() => {}}
        onPressDetail={(item) => handleDetail(item, "tv")}
        marginHorizontal={theme.space.marginHorizontal}
      />
      <View style={{ height: 100 }}></View>
    </Container>
  );
}
