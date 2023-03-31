import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  ButtonAccess,
  ButtonTitle,
  Container,
  Title,
  Content,
  Text,
  InputText,
} from "./styles";
import { useSettings } from "@src/hooks/settings";
import { apiFetchMovieAndTv } from "@src/services/services";
import LoadPage from "@src/components/LoadPage";

export function Initial() {
  const navigation = useNavigation();
  const { deviceType, saveUser, language, adult, region } = useSettings();
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");

  function navigate() {
    if (firstName.length < 2) {
      return alert("Por favor, informe seu nome.");
    }
    saveUser({ firstName: firstName });
    //@ts-ignore
    navigation.navigate(`HomePage`);
  }

  useEffect(() => {
    fetchTrendingImages();
  }, []);

  async function fetchTrendingImages() {
    const response = await apiFetchMovieAndTv({
      apiUrl: "trending/movie/day",
      page: 1,
      language: language,
      adult: adult,
      region: region,
      callback: () => {},
    });
    if (response) {
      const imagesArray = response?.results.map((item) => item.poster_path);

      const index = Math.ceil(Math.random() * (imagesArray.length - 1 - 0) + 0);
      console.log(index);
      setImage(imagesArray[index]);
    }
  }
  if (image === "") {
    return <LoadPage />;
  }
  return (
    <Container
      source={{
        uri: image,
      }}
    >
      <Content>
        <Title deviceType={deviceType}>MovieVerse</Title>
        <Text deviceType={deviceType}>
          Explore os seus filmes e séries favoritos, descubra novos lançamentos
          e mergulhe em um mundo de entretenimento com nosso aplicativo de
          catálogo de cinema.
        </Text>
        <Text deviceType={deviceType}>Como podemos chamar você?</Text>
        <InputText
          value={firstName}
          onChangeText={setFirstName}
          deviceType={deviceType}
        />
        <ButtonAccess onPress={navigate} activeOpacity={0.7}>
          <ButtonTitle deviceType={deviceType}>Acessar</ButtonTitle>
        </ButtonAccess>
      </Content>
    </Container>
  );
}
