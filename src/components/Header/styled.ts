import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { convertScale } from "@src/utils/utils";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { scale } from "react-native-size-matters";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  padding-top: ${(getStatusBarHeight() || scale(20)) + scale(5) + "px"};
  height: ${convertScale(80)};
  z-index: 1;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
`;

export const Button = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => convertScale(props.theme.size.big)};
  color: ${(props) => props.theme.colors.textSession};
`;

export const Icon = styled(AntDesign)`
  color: ${(props) => props.theme.colors.textSession};
`;
