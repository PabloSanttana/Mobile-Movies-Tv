import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { scale } from "react-native-size-matters";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import { convertScale } from "@src/utils/utils";

const { width } = Dimensions.get("screen");
export const Container = styled.View`
  z-index: 1;
  position: absolute;
  width: ${width + "px"};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  top: ${(getStatusBarHeight() || scale(20)) + scale(20) + "px"};
  padding: 0px 20px;
`;

export const ButtonIcon = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  width: ${convertScale(30)};
  height: ${convertScale(30)};
  border-radius: ${convertScale(20)};
  align-items: center;
  justify-content: center;
  opacity: 0.8;
`;

export const ArrowLeft = styled(AntDesign)`
  color: ${(props) => props.theme.colors.textSession};
`;
export const HomeIcon = styled(Octicons)`
  color: ${(props) => props.theme.colors.textSession};
`;
