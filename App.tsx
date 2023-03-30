import React, { useEffect } from "react";
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import * as SplashScreen from "expo-splash-screen";

import Routes from "@src/routes";
import { SettingsProvider } from "@src/hooks/settings";

export default function App() {
  // const { TESTE_KEY } = process.env;
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Prevent rendering until the font has loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SettingsProvider>
      <Routes />
    </SettingsProvider>
  );
}
