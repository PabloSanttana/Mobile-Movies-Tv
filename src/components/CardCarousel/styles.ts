import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { convertScale } from "@src/utils/utils";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: ${width + "px"};
`;

export const CardWrapper = styled.TouchableOpacity`
  border-radius: 8px;
  overflow: hidden;
`;
export const Card = styled.Image`
  width: ${width - 40 + "px"};
  height: ${width * 0.5 + "px"};
`;

export const ContentLabel = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-top-left-radius: 8px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
`;

export const Label = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => convertScale(props.theme.size.average)};
  color: ${(props) => props.theme.colors.textSession};
`;
