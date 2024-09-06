import React from "react";

interface IFProps {
  condition: boolean;
  children: React.ReactNode;
}

export default function IF({ condition, children }: IFProps) {
  if (condition) {
    return <>{children}</>;
  }
  return null;
}
