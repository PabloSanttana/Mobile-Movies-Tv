import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import LoadingCard from "@src/assets/loading-card.json";
import { scale } from "react-native-size-matters";
import { useTheme } from "styled-components/native";

export default function LoadItem() {
  const theme = useTheme();
  const data = ["1", "2", "3", "4", "5"];
  const RenderItem = (id: string) => (
    <View key={id} style={{ marginTop: 20 }}>
      <LottieView
        autoPlay
        style={{
          height: scale(133),
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: 5,
        }}
        source={LoadingCard}
      />
    </View>
  );

  return (
    <View testID="container" style={{ paddingHorizontal: 20 }}>
      {data.map((item) => RenderItem(item))}
    </View>
  );
}
