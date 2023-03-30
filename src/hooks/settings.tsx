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

import { dark } from "../theme/dark";
import { light } from "../theme/light";
import { ThemeProps, DeviceTypeProps, UserProps } from "@src/interfaces";

interface SettingsContextData {
  user: UserProps;
  changeTheme: (value: ThemeProps) => void;
  saveUser: (value: UserProps) => void;
  deviceType: DeviceTypeProps;
  themeText: ThemeProps;
}

interface SettingsContextProvider {
  children: JSX.Element;
}

const SettingsContext = createContext({} as SettingsContextData);

function SettingsProvider({ children }: SettingsContextProvider) {
  const [theme, setTheme] = useState<ThemeProps>("dark");
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [deviceType, setDeviceType] = useState<DeviceTypeProps>("phone");

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
