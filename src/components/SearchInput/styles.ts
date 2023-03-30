import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";
import { FontAwesome } from "@expo/vector-icons";

export const Container = styled.View`
  background-color: red;
  margin: 0px 20px;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  flex-direction: row;
  align-items: center;
  height: ${convertScale(40)};
  border-radius: ${convertScale(5)};
  margin-bottom: 10px;
`;

export const Search = styled.TextInput`
  flex: 1;
  height: ${convertScale(35)};
  font-size: ${(props) => convertScale(15)};
  font-family: ${(props) => props.theme.fonts.subtitle};
  color: ${(props) => props.theme.colors.textPrimary};
  padding-left: 20px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.backgroundCategory};
  height: ${convertScale(40)};
  width: ${convertScale(40)};
  border-top-right-radius: ${convertScale(5)};
  border-bottom-right-radius: ${convertScale(5)};
`;

export const IconSearch = styled(FontAwesome)`
  color: ${(props) => props.theme.colors.textCategory};
`;
