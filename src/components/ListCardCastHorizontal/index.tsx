import React from "react";
import { FlatList } from "react-native";

type ListCardCastHorizontalProps = {
  data: crewProps[];
  title: string;
  deviceType: DeviceTypeProps;
};

import CardCast from "@src/components/CardCast";
import { crewProps, DeviceTypeProps } from "@src/interfaces";
import { Container, Title } from "./styles";

function ListCardCastHorizontal({
  data,
  title,
  deviceType,
}: ListCardCastHorizontalProps) {
  return (
    <Container>
      <Title deviceType={deviceType}>{title}</Title>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.credit_id)}
        renderItem={({ item }) => (
          <CardCast data={item} deviceType={deviceType} />
        )}
        horizontal
        contentContainerStyle={{ paddingLeft: 20 }}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
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
