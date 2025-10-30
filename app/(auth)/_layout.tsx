// app/(auth)/_layout.jsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >

      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#C62828",
          },
        }}
      />

      
      <Stack.Screen name="register" options={{ headerShown: false }} />

    </Stack>
  );
}
