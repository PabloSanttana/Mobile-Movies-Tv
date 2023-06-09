import { DeviceTypeProps } from "@src/interfaces";
import React from "react";
import { Button, ButtonText, Container, Title } from "./styles";

export type HeaderListProps = {
  title: string;
  onPress: () => void;
  isMore?: boolean;
  deviceType: DeviceTypeProps;
};

function HeaderList({
  title,
  onPress,
  isMore = true,
  deviceType,
}: HeaderListProps) {
  return (
    <Container testID="container">
      <Title testID="title" deviceType={deviceType}>
        {title}
      </Title>
      {isMore && (
        <Button onPress={() => onPress()} activeOpacity={0.7}>
          <ButtonText deviceType={deviceType}>Ver mais</ButtonText>
        </Button>
      )}
    </Container>
  );
}

export function arePropsEqualHeaderList(
  prevProps: HeaderListProps,
  nextProps: HeaderListProps
) {
  if (prevProps.title === nextProps.title) {
    return true;
  }
  return false;
}

export default React.memo(HeaderList, arePropsEqualHeaderList);
