import { DeviceTypeProps } from "@src/interfaces";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import styled from "styled-components/native";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.TouchableOpacity<DeviceType>`
  margin: 10px 0px;
  margin-right: ${convertScale(10)};
  width: ${(props) => sizeDeviceTypeScale(props.deviceType, 70, 90)};

  align-items: center;
`;
export const Image = styled.Image<DeviceType>`
  width: ${(props) => sizeDeviceTypeScale(props.deviceType, 70, 90)};
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 90, 110)};
  border-radius: ${convertScale(5)};
`;

export const Title = styled.Text<DeviceType>`
  margin-top: ${convertScale(4)};
  margin-bottom: ${convertScale(2)};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 9, 13)};
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: center;
`;
export const Text = styled.Text<DeviceType>`
  margin: 3px 0px;
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 9, 13)};
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
`;
