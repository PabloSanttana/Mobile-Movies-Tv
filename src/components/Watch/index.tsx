import { flatrateRentBuyProps } from "@src/interfaces";
import React from "react";
import { View, Image } from "react-native";
import { scale } from "react-native-size-matters";

type WatchProps = {
  data: flatrateRentBuyProps;
};

function Watch({ data }: WatchProps) {
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
        accessibilityLabel={data.provider_name}
        source={{ uri: data.logo_path }}
        testID="watch-image"
      />
    </View>
  );
}

export default React.memo(Watch);
