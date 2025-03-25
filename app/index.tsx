import React from "react";
import { registerRootComponent } from "expo";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}

registerRootComponent(App);
