import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px ${(props) => props.theme.space.marginHorizontal + "px"};
  margin-top: ${convertScale(25)};
  margin-bottom: ${convertScale(15)};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => convertScale(props.theme.size.big)};
  color: ${(props) => props.theme.colors.textSession};
`;

export const Button = styled.TouchableOpacity`
  border: ${convertScale(1)} solid
    ${(props) => props.theme.colors.textSecondary};
  padding: ${convertScale(2)} ${convertScale(10)};
  border-radius: ${convertScale(10)};
`;

export const ButtonText = styled.Text`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => convertScale(props.theme.size.small)};
  color: ${(props) => props.theme.colors.textSecondary};
`;
