import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";

export const Container = styled.View`
  flex: 1;
  margin-bottom: ${convertScale(10)};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => convertScale(props.theme.size.big)};
  color: ${(props) => props.theme.colors.textSession};
  text-align: center;
  margin-bottom: ${convertScale(10)};
`;
