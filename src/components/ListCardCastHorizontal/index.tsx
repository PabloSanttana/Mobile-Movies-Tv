import React, { useCallback } from "react";
import { FlatList } from "react-native";

import { CrewProps, DeviceTypeProps } from "@src/interfaces";
import CardCast from "@src/components/CardCast";
import { Container, Title } from "./styles";

type ListCardCastHorizontalProps = {
  data: CrewProps[];
  title: string;
  deviceType: DeviceTypeProps;
};

type RenderItemCrewProps = {
  item: CrewProps;
};

function ListCardCastHorizontal({
  data,
  title,
  deviceType,
}: ListCardCastHorizontalProps) {
  const KeyExtractor = useCallback(
    (item: CrewProps) => item.credit_id.toString(),
    []
  );
  const renderItem = useCallback(
    ({ item }: RenderItemCrewProps) => (
      <CardCast data={item} deviceType={deviceType} />
    ),
    [deviceType]
  );
  return (
    <Container>
      <Title deviceType={deviceType}>{title}</Title>
      <FlatList
        data={data}
        keyExtractor={KeyExtractor}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingLeft: 20 }}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 300,
        }}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}

function arePropsEqual(
  prevProps: ListCardCastHorizontalProps,
  nextProps: ListCardCastHorizontalProps
) {
  if (prevProps.data === nextProps.data) {
    return true;
  }
  return false;
}

export default React.memo(ListCardCastHorizontal, arePropsEqual);
