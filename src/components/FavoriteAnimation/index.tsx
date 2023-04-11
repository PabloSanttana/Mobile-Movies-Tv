import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import Heart from "@src/assets/favoriteheart.json";

import { scale } from "react-native-size-matters";

export default function FavoriteAnimation() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
      testID="Heart"
    >
      <LottieView
        autoPlay
        style={{
          height: scale(250),
          borderRadius: 5,
          backgroundColor: "transparent",
        }}
        source={Heart}
        loop={false}
        testID="Heart_Animation"
      />
    </View>
  );
}
