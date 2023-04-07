import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { Platform } from "react-native";
import { ThemeProvider } from "styled-components";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import * as NavigationBar from "expo-navigation-bar";

import { dark } from "../theme/dark";
import { light } from "../theme/light";
import {
  ThemeProps,
  DeviceTypeProps,
  UserProps,
  CardProps,
  LanguageProps,
  RegionProps,
} from "@src/interfaces";
import { saveDataToStorage, getData } from "@src/services/storage";
import LoadPage from "@src/components/LoadPage";

interface SettingsContextData {
  user: UserProps;
  changeTheme: (value: ThemeProps) => void;
  saveUser: (value: UserProps) => void;
  deviceType: DeviceTypeProps;
  themeText: ThemeProps;
  favorites: CardProps[];
  changeFavorite: (value: CardProps) => void;
  favoritesIds: number[];
  adult: boolean;
  language: LanguageProps;
  region: RegionProps;
  changeLanguage: (value: LanguageProps) => void;
  changeRegion: (value: RegionProps) => void;
  changeAdult: (value: boolean) => void;
  orientation: number;
}

interface SettingsContextProvider {
  children: JSX.Element;
}

var initial = true;

const SettingsContext = createContext({} as SettingsContextData);

function SettingsProvider({ children }: SettingsContextProvider) {
  const [theme, setTheme] = useState<ThemeProps>("dark");
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [deviceType, setDeviceType] = useState<DeviceTypeProps>("phone");
  const [favorites, setFavorites] = useState<CardProps[]>([]);
  const [language, setLanguage] = useState<LanguageProps>("pt-BR");
  const [region, setRegion] = useState<RegionProps>("BR");
  const [adult, setAdult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<number>(0);

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
    changeAutomaticRotate();
    getDeviceType();
    getSettingStorage();
    getOrientationAsync();

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        console.log(evt.orientationInfo.orientation);
        setOrientation(evt.orientationInfo.orientation);
      }
    );
    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const changeAutomaticRotate = useCallback(async () => {
    await ScreenOrientation.unlockAsync();
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.OTHER);
  }, []);

  const getOrientationAsync = useCallback(async () => {
    const response = await ScreenOrientation.getOrientationAsync();
    setOrientation(response);
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync(theme);
    }
  }, [theme]);

  useEffect(() => {
    setSettingStorage();
  }, [user, favorites, adult, language, region, theme]);

  async function getSettingStorage() {
    try {
      setIsLoading(true);
      const response = await getData();
      if (!response) {
        return;
      }
      setTheme(response.theme);
      setUser(response.user);
      setFavorites(response.favorites);
      setLanguage(response.language);
      setRegion(response.region);
      setAdult(response.adult);
    } catch (error) {
      // Handle error here
    } finally {
      setIsLoading(false);
      initial = false;
    }
  }

  const setSettingStorage = async () => {
    if (!initial) {
      const data = {
        user: user,
        favorites: favorites,
        theme: theme,
        adult: adult,
        language: language,
        region: region,
      };
      await saveDataToStorage({ data });
    }
  };

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
  const changeLanguage = useCallback((value: LanguageProps) => {
    setLanguage(value);
  }, []);
  const changeAdult = useCallback((value: boolean) => {
    setAdult(value);
  }, []);
  const changeRegion = useCallback((value: RegionProps) => {
    setRegion(value);
  }, []);

  const saveUser = useCallback((value: UserProps) => {
    setUser(value);
  }, []);

  const changeFavorite = useCallback(
    (value: CardProps) => {
      const index = favorites.findIndex((favorite) => favorite.id === value.id);
      setFavorites(
        index >= 0 ? favorites.slice(0, index) : [...favorites, value]
      );
    },
    [favorites]
  );

  const favoritesIds = favorites.map(({ id }) => id);
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
        changeFavorite,
        favoritesIds,
        changeLanguage,
        adult,
        changeRegion,
        language,
        region,
        changeAdult,
        orientation,
      }}
    >
      <ThemeProvider theme={() => selectedTheme(theme)}>
        {isLoading ? <LoadPage /> : children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);

  return context;
}

export { useSettings, SettingsProvider };
