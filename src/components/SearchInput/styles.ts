import styled from "styled-components/native";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import { FontAwesome } from "@expo/vector-icons";
import { DeviceTypeProps } from "@src/interfaces";

type ContentProps = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View<ContentProps>`
  background-color: red;
  margin: 0px 20px;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  flex-direction: row;
  align-items: center;
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 25, 40)};
  border-radius: ${convertScale(3)};
  margin-bottom: 10px;
`;

export const Search = styled.TextInput<ContentProps>`
  flex: 1;
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 20, 35)};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 10, 15)};

  font-family: ${(props) => props.theme.fonts.subtitle};
  color: ${(props) => props.theme.colors.textPrimary};
  padding-left: 20px;
`;

export const ButtonSearch = styled.TouchableOpacity<ContentProps>`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.backgroundCategory};
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 25, 40)};
  width: ${(props) => sizeDeviceTypeScale(props.deviceType, 25, 40)};
  border-top-right-radius: ${convertScale(3)};
  border-bottom-right-radius: ${convertScale(3)};
`;

export const IconSearch = styled(FontAwesome)`
  color: ${(props) => props.theme.colors.textCategory};
`;
