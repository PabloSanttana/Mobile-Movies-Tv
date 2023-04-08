import React from "react";

import { BelongsToCollectionProps, DeviceTypeProps } from "@src/interfaces";
import HeaderList from "@src/components/HeaderList";
import { Image } from "@src/components/CardPrimaryMovie/styles";

import {
  BackgroundImageCollection,
  ButtonCollection,
  ButtonCollectionTitle,
  Gradient,
} from "./styles";
import { imagePathIsValid } from "@src/utils/utils";

type SectionCollectionProps = {
  data: BelongsToCollectionProps;
  deviceType: DeviceTypeProps;
  onPress: (id: number) => void;
};

function SectionCollection({
  data,
  deviceType,
  onPress,
}: SectionCollectionProps) {
  const backdrop_path_small = imagePathIsValid(data.backdrop_path);
  const backdrop_path = imagePathIsValid(data.backdrop_path);
  const poster_path = imagePathIsValid(data.poster_path);

  return (
    <>
      <HeaderList
        title={data.name}
        deviceType={deviceType}
        isMore={false}
        onPress={() => {}}
      />
      <BackgroundImageCollection
        deviceType={deviceType}
        source={backdrop_path_small}
      >
        <BackgroundImageCollection
          deviceType={deviceType}
          source={backdrop_path}
        >
          <Gradient colors={["rgba(0, 0, 0,0.5)", "rgba(0, 0, 0,0.5)"]}>
            <Image
              deviceType={deviceType}
              doubleSize={false}
              source={poster_path}
            />
            <ButtonCollection
              activeOpacity={0.7}
              onPress={() => onPress(data.id)}
            >
              <ButtonCollectionTitle deviceType={deviceType}>
                Mostrar Coletânea
              </ButtonCollectionTitle>
            </ButtonCollection>
          </Gradient>
        </BackgroundImageCollection>
      </BackgroundImageCollection>
    </>
  );
}

function arePropsEqual(
  prevProps: SectionCollectionProps,
  nextProps: SectionCollectionProps
) {
  return prevProps.data === nextProps.data;
}

export default React.memo(SectionCollection, arePropsEqual);
