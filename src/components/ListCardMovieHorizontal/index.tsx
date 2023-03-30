import React, { useCallback, useMemo } from "react";
import { View, FlatList } from "react-native";
import { scale } from "react-native-size-matters";

import CardPrimaryMovie from "@src/components/CardPrimaryMovie";
import HeaderList from "@src/components/HeaderList";
import { DeviceTypeProps, CardProps } from "@src/interfaces";
import { TypeDetailProps } from "@src/services/services";

export type ListCardProps = {
  movies: CardProps[];
  title: string;
  deviceType: DeviceTypeProps;
  marginHorizontal: number;
  onPressSeeMore: () => void;
  onPressDetail: (id: number, type: TypeDetailProps) => void;
};

function ListCardMovieHorizontal(data: ListCardProps) {
  // const length = useMemo(
  //   () => (data.deviceType === "tablet" ? scale(100) : scale(140)),
  //   [data.deviceType]
  // );

  const renderItem = useCallback(
    (item: CardProps) => (
      <CardPrimaryMovie
        data={item}
        deviceType={data.deviceType}
        onPress={() =>
          data.onPressDetail(
            item.id,
            item.media_type === "Filme" ? "movie" : "tv"
          )
        }
      />
    ),
    []
  );

  return (
    <View>
      <HeaderList title={data.title} onPress={data.onPressSeeMore} />
      <FlatList
        data={data.movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderItem(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: data.marginHorizontal }}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 40,
          minimumViewTime: 300,
        }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={5}
      />
    </View>
  );
}

function arePropsEqual(prevProps: ListCardProps, nextProps: ListCardProps) {
  if (prevProps.movies === nextProps.movies) {
    return true;
  }
  return false;
}

export default React.memo(ListCardMovieHorizontal, arePropsEqual);
