import React from "react";

import { Container, Search, ButtonSearch, IconSearch } from "./styles";
import { useTheme } from "styled-components";

type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
  onPress: () => void;
};

export default function SearchInput({
  value,
  setValue,
  onPress,
}: SearchInputProps) {
  const theme = useTheme();
  return (
    <Container>
      <Search
        value={value}
        onChangeText={setValue}
        placeholder="Pesquisar..."
        placeholderTextColor={theme.colors.textSecondary}
        numberOfLines={1}
      />
      <ButtonSearch onPress={onPress} activeOpacity={0.7}>
        <IconSearch name="search" size={24} color="black" />
      </ButtonSearch>
    </Container>
  );
}
