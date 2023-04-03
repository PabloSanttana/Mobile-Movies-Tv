import React, { useCallback } from "react";
import { View, FlatList } from "react-native";
import HeaderList from "@src/components/HeaderList";
import { CardProps, DeviceTypeProps } from "@src/interfaces";
import CardPrimaryMovie from "@src/components/CardPrimaryMovie";
import { TypeDetailProps } from "@src/services/services";

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
  const renderItem = useCallback(
    (item: CardProps) => (
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
        data={data.movies}
        keyExtractor={(item) => item.id.toLocaleString()}
        renderItem={({ item }) => renderItem(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: data.marginHorizontal }}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 300,
        }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
      />
    </View>
  );
}

function arePropsEqual(prevProps: ListCardTvProps, nextProps: ListCardTvProps) {
  if (
    prevProps.movies === nextProps.movies &&
    prevProps.doubleSize === nextProps.doubleSize
  ) {
    return true;
  }
  return false;
}

export default React.memo(ListCardHorizontal, arePropsEqual);
