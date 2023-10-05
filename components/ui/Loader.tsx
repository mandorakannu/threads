import React from "react";
import { ThreeDots } from "react-loader-spinner";

type Props = {
  width?: number;
  height?: number;
  radius?: number;
  color?: string;
  wrapperStyle?: {};
  visible?: boolean;
};

export default function Loader({
  width,
  height,
  radius,
  color,
  wrapperStyle,
  visible = true,
}: Props) {
  return (
    <ThreeDots
      height={height || 20}
      width={width}
      radius={radius || 5}
      color={color || "white"}
      ariaLabel="three-dots-loading"
      wrapperStyle={wrapperStyle || {}}
      visible={true}
    />
  );
}
