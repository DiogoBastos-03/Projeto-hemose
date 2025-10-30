import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false, // remove sombra (Android/iOS)
        headerTransparent: false,
        headerStyle: {
          backgroundColor: "#C62828", // vermelho do header
        },
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}
