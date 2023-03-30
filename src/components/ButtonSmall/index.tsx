import React from "react";

import { CategoryButton, CategoryTitle } from "./styles";
import { TouchableOpacityProps } from "react-native";

export type ButtonSmallProps = TouchableOpacityProps & {
  data: [string, string];
  isActive?: boolean;
};

function ButtonSmall({ data, isActive = false, ...rest }: ButtonSmallProps) {
  return (
    <CategoryButton
      key={data[0]}
      active={isActive}
      activeOpacity={0.7}
      {...rest}
    >
      <CategoryTitle active={isActive}>{data[1]}</CategoryTitle>
    </CategoryButton>
  );
}

function arePropsEqual(
  prevProps: ButtonSmallProps,
  nextProps: ButtonSmallProps
) {
  if (prevProps.isActive === nextProps.isActive) {
    return true;
  }
  return false;
}

export default React.memo(ButtonSmall, arePropsEqual);
