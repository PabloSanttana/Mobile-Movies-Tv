import { flatrateRentBuyProps } from "@src/interfaces";
import React from "react";
import { View, Image } from "react-native";
import { scale } from "react-native-size-matters";

type WatchProps = {
  data: flatrateRentBuyProps;
};

export default function Watch({ data }: WatchProps) {
  return (
    <View>
      <Image
        style={{
          width: scale(50),
          height: scale(50),
          borderRadius: scale(3),
          marginRight: 10,
          marginBottom: 10,
        }}
        source={{ uri: data.logo_path }}
      />
    </View>
  );
}
