import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { scale } from "react-native-size-matters";

export const Container = styled.ScrollView`
  flex: 1;
  padding-top: ${(getStatusBarHeight() || scale(20)) + scale(10) + "px"};
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
`;
