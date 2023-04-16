import React, { useCallback } from "react";

import { DeviceTypeProps, flatrateRentBuyProps } from "@src/interfaces";

import {
  Container,
  Title,
} from "@src/components/ListCardCastHorizontal/styles";
import Watch from "@src/components/Watch";
import { View } from "react-native";

export type ListWatchProps = {
  data?: flatrateRentBuyProps[];
  title: string;
  deviceType: DeviceTypeProps;
};

function ListWatch({ data, title, deviceType }: ListWatchProps) {
  if (data?.length === 0) {
    return <></>;
  }

  const renderItem = useCallback(
    (item: flatrateRentBuyProps) => (
      <Watch key={item.provider_id} data={item} />
    ),
    [deviceType]
  );

  return (
    <Container>
      <Title deviceType={deviceType}>{title}</Title>
      <View
        testID="watch-list"
        style={{ flexDirection: "row", flexWrap: "wrap", paddingLeft: 20 }}
      >
        {data?.map((item) => renderItem(item))}
      </View>
    </Container>
  );
}

export function arePropsEqualListWatch(
  prevProps: ListWatchProps,
  nextProps: ListWatchProps
) {
  if (prevProps.data === nextProps.data) {
    return true;
  }
  return false;
}

export default React.memo(ListWatch, arePropsEqualListWatch);
