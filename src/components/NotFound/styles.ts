import { convertScale } from "@src/utils/utils";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => convertScale(props.theme.size.average)};
  color: ${(props) => props.theme.colors.textPrimary};
  margin-top: ${convertScale(20)};
`;
