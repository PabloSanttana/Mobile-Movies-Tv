import React, { useCallback } from "react";
import { FlatList } from "react-native";

import { DeviceTypeProps, flatrateRentBuyProps } from "@src/interfaces";

import {
  Container,
  Title,
} from "@src/components/ListCardCastHorizontal/styles";
import { scale } from "react-native-size-matters";
import Watch from "@src/components/Watch";

type ListWatchProps = {
  data?: flatrateRentBuyProps[];
  title: string;
  deviceType: DeviceTypeProps;
};

type RenderItemWatch = {
  item: flatrateRentBuyProps;
};

function ListWatch({ data, title, deviceType }: ListWatchProps) {
  if (data?.length === 0) {
    return <></>;
  }

  const renderItem = useCallback(
    (item: flatrateRentBuyProps) => <Watch data={item} />,
    [deviceType]
  );

  return (
    <Container>
      <Title deviceType={deviceType}>{title}</Title>
      {data?.map((item) => renderItem(item))}
    </Container>
  );
}

function arePropsEqual(prevProps: ListWatchProps, nextProps: ListWatchProps) {
  if (prevProps.data === nextProps.data) {
    return true;
  }
  return false;
}

export default React.memo(ListWatch, arePropsEqual);
