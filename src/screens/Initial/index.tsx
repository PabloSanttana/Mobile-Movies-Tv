import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
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
import { isValid } from "date-fns";

export function Initial() {
  const navigation = useNavigation();
  const { deviceType, saveUser, language, adult, region } = useSettings();
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  function navigate() {
    if (firstName.length < 2 || birthDate.length < 10) {
      return alert("Nome muito curto ou data invalida!");
    }
    let [day, month, year] = birthDate.split("/");
    let verifyDate = new Date(Number(year), Number(month), Number(day));
    if (!isValid(verifyDate)) {
      return alert("Data invalida!");
    }
    saveUser({ firstName: firstName, birthDate: birthDate });
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

  function handleChangeBirthDate(value: string) {
    if (birthDate.length > value.length) {
      setBirthDate(value);
    } else if (value.length === 2) {
      setBirthDate(value + "/");
    } else if (value.length === 5) {
      setBirthDate(value + "/");
    } else {
      setBirthDate(value);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Content>
          <Title deviceType={deviceType}>MovieVerse</Title>
          <Text deviceType={deviceType}>
            Explore os seus filmes e séries favoritos, descubra novos
            lançamentos e mergulhe em um mundo de entretenimento com nosso
            aplicativo de catálogo de cinema.
          </Text>
          <View>
            <Text deviceType={deviceType} style={{ marginBottom: 10 }}>
              Como podemos chamar você?
            </Text>
            <InputText
              value={firstName}
              placeholder="Seu nome"
              onChangeText={setFirstName}
              deviceType={deviceType}
              style={{ marginBottom: 10 }}
            />
            <Text deviceType={deviceType} style={{ marginBottom: 10 }}>
              Data de Nascimento
            </Text>
            <InputText
              value={birthDate}
              placeholder="00/00/0000"
              onChangeText={handleChangeBirthDate}
              deviceType={deviceType}
              keyboardType="number-pad"
              maxLength={10}
            />
            <ButtonAccess onPress={navigate} activeOpacity={0.7}>
              <ButtonTitle deviceType={deviceType}>Acessar</ButtonTitle>
            </ButtonAccess>
          </View>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
