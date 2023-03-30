import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { convertScale } from "@src/utils/utils";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconFontAwesome = styled(FontAwesome)`
  color: ${(props) => props.theme.colors.star};
  margin-right: 5px;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => convertScale(props.theme.size.average)};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-left: 5px;
`;
