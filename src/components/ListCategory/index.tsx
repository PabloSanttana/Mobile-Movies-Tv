import React from "react";
import { FlatList } from "react-native";
import ButtonSmall from "@src/components/ButtonSmall";

import { Title, Container } from "./styles";
import { ObjectGenresProps } from "@src/screens/SeeMore";
import { DeviceTypeProps } from "@src/interfaces";

type ListCategoryProps = {
  data: ObjectGenresProps;
  genreSelected: string;
  selectGenre: (value: string) => void;
  deviceType: DeviceTypeProps;
};

function ListCategory({
  data,
  genreSelected,
  selectGenre,
  deviceType,
}: ListCategoryProps) {
  const genres = Object.entries(data);
  return (
    <Container
      style={{
        shadowOpacity: 0.75,
        shadowRadius: 9,
        shadowColor: "rgba(0, 0, 0,0.3)",
        shadowOffset: { height: 17, width: 0 },
        elevation: 2,
        zIndex: 1,
      }}
    >
      <Title deviceType={deviceType}>Categorias</Title>
      <FlatList
        data={genres}
        keyExtractor={(item) => String(item[0])}
        renderItem={({ item }) => (
          <ButtonSmall
            data={item}
            isActive={item[0] === genreSelected}
            onPress={() => selectGenre(item[0])}
            deviceType={deviceType}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
      />
    </Container>
  );
}

function arePropsEqual(
  prevProps: ListCategoryProps,
  nextProps: ListCategoryProps
) {
  if (
    prevProps.data === nextProps.data &&
    prevProps.genreSelected === nextProps.genreSelected
  ) {
    return true;
  }
  return false;
}

export default React.memo(ListCategory, arePropsEqual);
