import React from "react";
import { Button, ButtonText, Container, Title } from "./styles";

export type HeaderListProps = {
  title: string;
  onPress: () => void;
  isMore?: boolean;
};

function HeaderList({ title, onPress, isMore = true }: HeaderListProps) {
  return (
    <Container>
      <Title>{title}</Title>
      {isMore && (
        <Button onPress={() => onPress()} activeOpacity={0.7}>
          <ButtonText>Ver mais</ButtonText>
        </Button>
      )}
    </Container>
  );
}

export default React.memo(HeaderList);
