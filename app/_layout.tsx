import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen 
        name="HomeScreen" 
        options={{
          title: "Customer Cards",
        }}
      />
    </Stack>
  );
}
