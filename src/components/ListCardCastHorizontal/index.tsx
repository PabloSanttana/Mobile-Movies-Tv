import React, { useCallback } from "react";
import { FlatList } from "react-native";

import { CrewProps, DeviceTypeProps } from "@src/interfaces";
import CardCast from "@src/components/CardCast";
import { Container, Title } from "./styles";
import { scale } from "react-native-size-matters";

type ListCardCastHorizontalProps = {
  data: CrewProps[];
  title: string;
  deviceType: DeviceTypeProps;
  onPress: (id: number) => void;
};

type RenderItemCrewProps = {
  item: CrewProps;
};

function ListCardCastHorizontal({
  data,
  title,
  deviceType,
  onPress,
}: ListCardCastHorizontalProps) {
  const KeyExtractor = useCallback(
    (item: CrewProps) => item.credit_id.toString(),
    []
  );

  const renderItem = useCallback(
    ({ item }: RenderItemCrewProps) => (
      <CardCast data={item} deviceType={deviceType} onPress={onPress} />
    ),
    [deviceType]
  );
  const ITEM_HEIGHT = deviceType === "tablet" ? scale(80) : scale(100);

  const getItemLayout = useCallback(
    (data: CrewProps[] | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index: index,
    }),
    []
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
        getItemLayout={getItemLayout}
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
