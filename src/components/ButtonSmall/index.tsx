import React from "react";

import { CategoryButton, CategoryTitle } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { DeviceTypeProps } from "@src/interfaces";

export type ButtonSmallProps = TouchableOpacityProps & {
  data: [string, string];
  isActive?: boolean;
  deviceType: DeviceTypeProps;
};

function ButtonSmall({
  data,
  isActive = false,
  deviceType,
  ...rest
}: ButtonSmallProps) {
  return (
    <CategoryButton
      key={data[0]}
      deviceType={deviceType}
      active={isActive}
      activeOpacity={0.7}
      testID="button-small"
      {...rest}
    >
      <CategoryTitle
        testID="button-title"
        deviceType={deviceType}
        active={isActive}
      >
        {data[1]}
      </CategoryTitle>
    </CategoryButton>
  );
}

export function arePropsEqualButtonSmall(
  prevProps: ButtonSmallProps,
  nextProps: ButtonSmallProps
) {
  if (prevProps.isActive === nextProps.isActive) {
    return true;
  }
  return false;
}

export default React.memo(ButtonSmall, arePropsEqualButtonSmall);
