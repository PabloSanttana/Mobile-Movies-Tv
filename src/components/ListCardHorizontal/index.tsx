import React, { useCallback } from "react";
import { View, FlatList } from "react-native";
import HeaderList from "@src/components/HeaderList";
import { CardProps, DeviceTypeProps, RenderItemProps } from "@src/interfaces";
import CardPrimaryMovie from "@src/components/CardPrimaryMovie";
import { TypeDetailProps } from "@src/services/services";
import { scale } from "react-native-size-matters";

export type ListCardTvProps = {
  movies: CardProps[];
  title: string;
  deviceType: DeviceTypeProps;
  marginHorizontal: number;
  onPressSeeMore: () => void;
  onPressDetail: (id: Number, type: TypeDetailProps) => void;
  doubleSize: boolean;
};

function ListCardHorizontal(data: ListCardTvProps) {
  const LengthCardMovie = useCallback(
    (lengthDefault: number, doubleSize: boolean) => {
      const marginRight = 20;
      if (doubleSize) {
        return scale(lengthDefault * 2) + 2 * marginRight;
      } else {
        return scale(lengthDefault) + marginRight;
      }
    },
    []
  );

  const ITEM_HEIGHT =
    data.deviceType === "tablet"
      ? LengthCardMovie(100, data.doubleSize)
      : LengthCardMovie(140, data.doubleSize);

  const getItemLayout = useCallback(
    (data: CardProps[] | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index: index,
    }),
    []
  );
  const KeyExtractor = useCallback(
    (item: CardProps, index: number) => `${item.id}-${index}`,
    []
  );

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => (
      <CardPrimaryMovie
        data={item}
        deviceType={data.deviceType}
        onPress={() => data.onPressDetail(item.id, item.media_type)}
        doubleSize={data.doubleSize}
      />
    ),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderList
        deviceType={data.deviceType}
        title={data.title}
        onPress={data.onPressSeeMore}
      />
      <FlatList
        testID="flatList"
        data={data.movies}
        keyExtractor={KeyExtractor}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: data.marginHorizontal }}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 300,
        }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={9}
        initialNumToRender={9}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

export function arePropsEqualListCardHorizontal(
  prevProps: ListCardTvProps,
  nextProps: ListCardTvProps
) {
  if (
    prevProps.movies === nextProps.movies &&
    prevProps.doubleSize === nextProps.doubleSize
  ) {
    return true;
  }
  return false;
}

export default React.memo(ListCardHorizontal, arePropsEqualListCardHorizontal);
