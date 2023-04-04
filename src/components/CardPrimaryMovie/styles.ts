import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";
import { scale } from "react-native-size-matters";

type DeviceType = {
  deviceType: DeviceTypeProps;
  doubleSize: boolean;
};

function LengthCardMovie(lengthDefault: number, doubleSize: boolean): string {
  if (doubleSize) {
    return scale(lengthDefault * 2) + 20 + "px";
  } else {
    return convertScale(lengthDefault);
  }
}

export const Container = styled.View<DeviceType>`
  margin-right: 20px;
  width: ${(props) =>
    props.deviceType === "tablet"
      ? LengthCardMovie(100, props.doubleSize)
      : LengthCardMovie(140, props.doubleSize)};
  margin-top: 5px;
`;
export const ContainerButton = styled.TouchableOpacity``;

export const ContainerImage = styled.View`
  position: relative;
  border-radius: ${convertScale(5)};
`;

export const Image = styled.Image<DeviceType>`
  width: ${(props) =>
    props.deviceType === "tablet"
      ? LengthCardMovie(100, props.doubleSize)
      : LengthCardMovie(140, props.doubleSize)};
  height: ${(props) =>
    props.deviceType === "tablet" ? convertScale(150) : convertScale(210)};
  border-radius: ${convertScale(5)};
`;

export const Title = styled.Text<DeviceType>`
  margin-top: ${(props) =>
    props.deviceType === "tablet" ? convertScale(10) : convertScale(16)};
  margin-bottom: 15px;
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet"
      ? convertScale(11)
      : convertScale(props.theme.size.average)};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const ContainerVote = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet"
      ? convertScale(9)
      : convertScale(props.theme.size.small)};
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const ContainerVoteAverage = styled.View<DeviceType>`
  width: ${(props) =>
    props.deviceType === "tablet" ? convertScale(25) : convertScale(35)};
  height: ${(props) =>
    props.deviceType === "tablet" ? convertScale(25) : convertScale(35)};
  position: absolute;
  bottom: ${(props) =>
    props.deviceType === "tablet" ? convertScale(-10) : convertScale(-15)};
  left: ${(props) =>
    props.deviceType === "tablet" ? convertScale(10) : convertScale(10)};
`;
