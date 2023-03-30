import React from "react";
import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import LoadingPage from "@src/assets/loadingPage.json";
import { useTheme } from "styled-components";
import { scale } from "react-native-size-matters";

export default function LoadPage() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <LottieView
        autoPlay
        style={{
          height: scale(100),
          borderRadius: 5,
          backgroundColor: theme.colors.backgroundPrimary,
        }}
        source={LoadingPage}
      />
    </View>
  );
}
