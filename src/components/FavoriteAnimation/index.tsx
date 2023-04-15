import React from "react";
import LottieView from "lottie-react-native";
import Heart from "@src/assets/favoriteheart.json";

import Animated, { ZoomIn } from "react-native-reanimated";

import { scale } from "react-native-size-matters";

export default function FavoriteAnimation() {
  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
      testID="Heart"
      entering={ZoomIn.duration(350)}
    >
      <LottieView
        autoPlay={true}
        style={{
          height: scale(200),
          borderRadius: 5,
          backgroundColor: "transparent",
        }}
        source={Heart}
        loop={false}
        testID="Heart_Animation"
      />
    </Animated.View>
  );
}
