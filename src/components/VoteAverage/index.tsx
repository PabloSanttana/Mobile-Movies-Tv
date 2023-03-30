import React from "react";
import Svg, { Circle, Text } from "react-native-svg";

const circumference = 2 * Math.PI * 40;
const circumferenceFormatted = circumference / 10;

export type VoteAverageProps = {
  progressValue: number;
  titleColor: string;
  progressValueColor: string;
  backgroundColor: string;
};

function VoteAverage({
  backgroundColor,
  progressValueColor,
  titleColor,
  progressValue,
}: VoteAverageProps) {
  return (
    <Svg height={"100%"} width={"100%"} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="50" fill={backgroundColor} />
      <Circle
        cx="50"
        cy="50"
        r="40"
        stroke={progressValueColor}
        strokeWidth="7"
        fill="transparent"
        strokeOpacity={0.4}
      />
      <Circle
        cx="50"
        cy="50"
        r="40"
        strokeLinecap="round"
        fill="transparent"
        stroke={progressValueColor}
        strokeWidth="7"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={
          circumference - circumferenceFormatted * progressValue
        }
        transform={{ rotation: -90, originX: 50, originY: 50 }}
      />
      <Text
        fill={titleColor}
        fontSize="30"
        fontWeight="bold"
        x="48"
        y="60"
        textAnchor="middle"
      >
        {(progressValue * 10).toFixed(0)}
      </Text>
      <Text
        fill={titleColor}
        fontSize="15"
        fontWeight="bold"
        x="75"
        y="45"
        textAnchor="middle"
      >
        %
      </Text>
    </Svg>
  );
}

function arePropsEqual(
  prevProps: VoteAverageProps,
  nextProps: VoteAverageProps
) {
  if (
    prevProps.progressValue === nextProps.progressValue ||
    prevProps.backgroundColor === nextProps.backgroundColor
  ) {
    return true;
  }
  return false;
}

export default React.memo(VoteAverage, arePropsEqual);
