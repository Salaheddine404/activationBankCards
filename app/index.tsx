import React from "react";
import { registerRootComponent } from "expo";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return <LoginScreen />;
}

registerRootComponent(App);
