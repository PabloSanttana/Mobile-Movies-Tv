import { convertScale } from "@src/utils/utils";
import styled from "styled-components/native";

export const Container = styled.View`
  padding-bottom: ${convertScale(10)};
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => convertScale(props.theme.size.big)};
  color: ${(props) => props.theme.colors.textSession};
  margin: 0px 0px 20px 20px;
`;
