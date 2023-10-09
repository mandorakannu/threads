"use client";
import { AppProgressBar } from "next-nprogress-bar";
import React from "react";

export function Progressbar() {
  return (
    <AppProgressBar
      height="6px"
      color="#14b8a6"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
