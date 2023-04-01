import React, { useState, useEffect, useCallback } from "react";
import { Switch, KeyboardAvoidingView, Platform, View } from "react-native";

import {
  Container,
  Title,
  Content,
  Text,
  InputText,
  Div,
  Group,
  ButtonAccess,
  ButtonTitle,
} from "./styles";
import { useSettings } from "@src/hooks/settings";
import { apiFetchMovieAndTv } from "@src/services/services";
import LoadPage from "@src/components/LoadPage";
import { DeviceTypeProps } from "@src/interfaces";
import { isValid } from "date-fns";

type GroupFormProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  deviceType: DeviceTypeProps;
};
type fetchTrendingImagesProps = {
  language: string;
  adult: boolean;
  region: string;
};
const GroupForm = ({ label, setValue, value, deviceType }: GroupFormProps) => {
  return (
    <Div>
      <Text deviceType={deviceType}>{label}</Text>
      <InputText
        value={value}
        onChangeText={setValue}
        deviceType={deviceType}
      />
    </Div>
  );
};

export default function Setting() {
  const data = useSettings();

  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState(data.user.firstName);
  const [lastName, setLastName] = useState(data.user.lastName ?? "");
  const [switchTheme, setSwitchThem] = useState(
    data.themeText === "light" ? true : false
  );
  const [birthDate, setBirthDate] = useState(data.user.birthDate);
  const [switchAdult, setSwitchAdult] = useState(data.adult);
  const [switchLanguage, setSwitchLanguage] = useState(
    data.language === "pt-BR" ? true : false
  );

  useEffect(() => {
    fetchTrendingImages({
      language: data.language,
      region: data.region,
      adult: data.adult,
    });
  }, []);

  const fetchTrendingImages = useCallback(
    async ({ language, region, adult }: fetchTrendingImagesProps) => {
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

        const index = Math.ceil(
          Math.random() * (imagesArray.length - 1 - 0) + 0
        );
        setImage(imagesArray[index]);
      }
    },
    []
  );

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

  const handleThemeChange = useCallback(
    (value: boolean) => {
      const theme = value ? "light" : "dark";
      data.changeTheme(theme);
      setSwitchThem(value);
    },
    [data, setSwitchThem]
  );

  const handleAdultChange = useCallback(
    (value: boolean) => {
      data.changeAdult(value);
      setSwitchAdult(value);
    },
    [data, setSwitchAdult]
  );

  const handleLanguageChange = useCallback(
    (value: boolean) => {
      const language = value ? "pt-BR" : "en-US";
      const region = value ? "BR" : "US";

      data.changeLanguage(language);
      data.changeRegion(region);
      setSwitchLanguage(value);
    },
    [data, setSwitchLanguage]
  );

  function handleSettingSave() {
    const MIN_NAME_LENGTH = 2;
    const VALID_DATE_LENGTH = 10;
    if (
      firstName.length < MIN_NAME_LENGTH ||
      birthDate.length < VALID_DATE_LENGTH
    ) {
      alert("Nome muito curto ou data invalida!");
      return;
    }
    const [day, month, year] = birthDate.split("/");
    const verifyDate = new Date(Number(year), Number(month), Number(day));
    if (!isValid(verifyDate)) {
      alert("Data invalida!");
      return;
    }

    data.saveUser({
      firstName,
      lastName,
      birthDate,
    });

    alert("Configuração Salvada com sucesso.");
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
        style={{ flex: 1 }}
      >
        <Content style={{ flex: 1 }}>
          <Title deviceType={data.deviceType}>Setting</Title>
          <Group>
            <GroupForm
              label="First Name"
              setValue={setFirstName}
              value={firstName}
              deviceType={data.deviceType}
            />
            <GroupForm
              label="Last Name"
              setValue={setLastName}
              value={lastName}
              deviceType={data.deviceType}
            />
          </Group>

          <Group>
            <Div>
              <Text deviceType={data.deviceType}>Theme</Text>
              <Switch onValueChange={handleThemeChange} value={switchTheme} />
            </Div>
            <Div style={{ width: 200 }}>
              <GroupForm
                label="Birth date"
                setValue={handleChangeBirthDate}
                value={birthDate}
                deviceType={data.deviceType}
              />
            </Div>
          </Group>
          <Group>
            <Div>
              <Text deviceType={data.deviceType}>
                Todas as classificações etárias
              </Text>
              <Switch onValueChange={handleAdultChange} value={switchAdult} />
            </Div>
          </Group>
          <Group>
            <Div>
              <Text deviceType={data.deviceType}>
                Movie languages - {data.language}
              </Text>

              <Switch
                onValueChange={handleLanguageChange}
                value={switchLanguage}
              />
            </Div>
          </Group>
          <ButtonAccess onPress={handleSettingSave}>
            <ButtonTitle deviceType={data.deviceType}>Save</ButtonTitle>
          </ButtonAccess>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
