import React from "react";

import { Container, Search, ButtonSearch, IconSearch } from "./styles";
import { useTheme } from "styled-components/native";
import { DeviceTypeProps } from "@src/interfaces";
import { scale } from "react-native-size-matters";

type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
  onPress: () => void;
  deviceType: DeviceTypeProps;
};

export default function SearchInput({
  value,
  setValue,
  onPress,
  deviceType,
}: SearchInputProps) {
  const theme = useTheme();
  return (
    <Container testID="container" deviceType={deviceType}>
      <Search
        testID="search"
        value={value}
        onChangeText={setValue}
        placeholder="Pesquisar..."
        placeholderTextColor={theme.colors.textSecondary}
        numberOfLines={1}
        deviceType={deviceType}
      />
      <ButtonSearch
        testID="button-search"
        deviceType={deviceType}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <IconSearch
          testID="icon-search"
          name="search"
          size={deviceType === "tablet" ? scale(13) : scale(19)}
          color="black"
        />
      </ButtonSearch>
    </Container>
  );
}
