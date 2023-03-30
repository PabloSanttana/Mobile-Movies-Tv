import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Platform } from "react-native";
import { ThemeProvider } from "styled-components";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import * as NavigationBar from "expo-navigation-bar";
const { BASE_IMAGE_URL } = process.env;
import { dark } from "../theme/dark";
import { light } from "../theme/light";
import {
  ThemeProps,
  DeviceTypeProps,
  UserProps,
  CardProps,
} from "@src/interfaces";

interface SettingsContextData {
  user: UserProps;
  changeTheme: (value: ThemeProps) => void;
  saveUser: (value: UserProps) => void;
  deviceType: DeviceTypeProps;
  themeText: ThemeProps;
  favorites: CardProps[];
}

interface SettingsContextProvider {
  children: JSX.Element;
}

var data: CardProps[] = [
  {
    adult: false,
    backdrop_path: `${BASE_IMAGE_URL}w780/ouB7hwclG7QI3INoYJHaZL4vOaa.jpg`,
    id: 315162,
    title: "Gato de Botas 2: O Último Pedido",
    original_language: "en",
    original_title: "Puss in Boots: The Last Wish",
    overview:
      "O Gato de Botas descobre que sua paixão pela aventura cobrou seu preço: ele queimou oito de suas nove vidas, deixando-o com apenas uma vida restante. Gato parte em uma jornada épica para encontrar o mítico Último Desejo e restaurar suas nove vidas.",
    poster_path: `${BASE_IMAGE_URL}w500/atJxZfCaQ7kXRFSfbm8cqAKkns7.jpg`,
    media_type: "movie",
    genre_ids: [16, 12, 35, 10751],
    popularity: 1556.815,
    release_date: "2023-01-05",
    video: false,
    vote_average: 8.316,
    vote_count: 4880,
    origin_country: [""],
    backdrop_path_small: `${BASE_IMAGE_URL}w300/ouB7hwclG7QI3INoYJHaZL4vOaa.jpg`,
    poster_path_small: `${BASE_IMAGE_URL}w92/atJxZfCaQ7kXRFSfbm8cqAKkns7.jpg`,
  },
  {
    adult: false,
    backdrop_path: `${BASE_IMAGE_URL}w780/muu7SpWpMpObzccAgaRcuB4RHbk.jpg`,
    id: 65733,
    title: "Doraemon: O Gato do Futuro",
    original_language: "en",
    original_title: "Puss in Boots: The Last Wish",
    overview:
      "A série é sobre um gato robótico chamado Doraemon que voltou dois séculos no passado para ajudar um estudante: Nobita Nobi.",
    poster_path: `${BASE_IMAGE_URL}w500/aL9BRFZuLzbuvhtrlTYs1ix1apu.jpg`,
    media_type: "tv",
    genre_ids: [10759, 16, 35, 10765],
    popularity: 273.438,
    release_date: "2005-04-22",
    video: false,
    vote_average: 7.882,
    vote_count: 55,
    origin_country: [""],
    backdrop_path_small: `${BASE_IMAGE_URL}w300/muu7SpWpMpObzccAgaRcuB4RHbk.jpg`,
    poster_path_small: `${BASE_IMAGE_URL}w92/aL9BRFZuLzbuvhtrlTYs1ix1apu.jpg`,
  },
];

const SettingsContext = createContext({} as SettingsContextData);

function SettingsProvider({ children }: SettingsContextProvider) {
  const [theme, setTheme] = useState<ThemeProps>("dark");
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [deviceType, setDeviceType] = useState<DeviceTypeProps>("phone");
  const [favorites, setFavorites] = useState<CardProps[]>([]);

  const getDeviceType = useCallback(async () => {
    const deviceTypeMap = {
      [DeviceType.UNKNOWN]: "unknown",
      [DeviceType.PHONE]: "phone",
      [DeviceType.TABLET]: "tablet",
      [DeviceType.DESKTOP]: "desktop",
      [DeviceType.TV]: "tv",
    };

    try {
      const deviceType = await getDeviceTypeAsync();
      const type = deviceTypeMap[deviceType] as DeviceTypeProps;
      setDeviceType(type);
    } catch (error) {
      console.error("Failed to get device type", error); // Handle errors.
    }
  }, []);

  useEffect(() => {
    getDeviceType();
    for (let index = 3; index < 100; index++) {
      if (index % 2 === 0) {
        data.push({
          ...data[0],
          id: data[0].id + index,
        });
      } else {
        data.push({
          ...data[1],
          id: data[1].id + index,
        });
      }
    }
    setFavorites(data);
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync(theme);
    }
  }, [theme]);

  const setBackgroundColorAsync = useCallback(async (value: ThemeProps) => {
    const backgroundColor = selectedTheme(value).colors.backgroundSecondary;
    await NavigationBar.setBackgroundColorAsync(backgroundColor);
  }, []);

  const selectedTheme = useCallback((value: ThemeProps) => {
    const themes = {
      light: light,
      dark: dark,
    };
    return themes[value] || light;
  }, []);

  const changeTheme = useCallback((value: ThemeProps) => {
    setTheme(value);
  }, []);
  const saveUser = useCallback((value: UserProps) => {
    setUser(value);
  }, []);

  const themeText = theme;
  return (
    <SettingsContext.Provider
      value={{
        user,
        changeTheme,
        saveUser,
        deviceType,
        themeText,
        favorites,
      }}
    >
      <ThemeProvider theme={() => selectedTheme(theme)}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);

  return context;
}

export { useSettings, SettingsProvider };
