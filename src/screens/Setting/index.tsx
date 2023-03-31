import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Switch } from "react-native";

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

type GroupFormProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  deviceType: DeviceTypeProps;
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
  const [switchAdult, setSwitchAdult] = useState(data.adult);
  const [switchLanguage, setSwitchLanguage] = useState(
    data.language === "pt-BR" ? true : false
  );

  useEffect(() => {
    fetchTrendingImages();
  }, []);

  async function fetchTrendingImages() {
    const response = await apiFetchMovieAndTv({
      apiUrl: "trending/movie/day",
      page: 1,
      language: data.language,
      adult: data.adult,
      region: data.region,
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

  function handleThemeChange(value: boolean) {
    if (value) {
      data.changeTheme("light");
    } else {
      data.changeTheme("dark");
    }
    setSwitchThem(value);
  }
  function handleAdultChange(value: boolean) {
    data.changeAdult(value);
    setSwitchAdult(value);
  }
  function handleLanguageChange(value: boolean) {
    if (value) {
      data.changeLanguage("pt-BR");
      data.changeRegion("BR");
    } else {
      data.changeLanguage("en-US");
      data.changeRegion("US");
    }
    setSwitchLanguage(value);
  }

  function handleSettingSave() {
    data.saveUser({
      firstName: firstName,
      lastName: lastName,
    });
    alert("Configuração Salvada com sucesso.");
  }

  return (
    <Container
      source={{
        uri: image,
      }}
    >
      <Content>
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
            <Switch
              style={{ width: 300 }}
              onValueChange={handleThemeChange}
              value={switchTheme}
            />
          </Div>
          <Div>
            <Text deviceType={data.deviceType}>Adult</Text>
            <Switch
              style={{ width: 300 }}
              onValueChange={handleAdultChange}
              value={switchAdult}
            />
          </Div>
        </Group>
        <Group>
          <Div>
            <Text deviceType={data.deviceType}>
              Movie languages - {data.language}
            </Text>

            <Switch
              style={{ width: 300 }}
              onValueChange={handleLanguageChange}
              value={switchLanguage}
            />
          </Div>
        </Group>
        <ButtonAccess onPress={handleSettingSave}>
          <ButtonTitle deviceType={data.deviceType}>Save</ButtonTitle>
        </ButtonAccess>
      </Content>
    </Container>
  );
}
