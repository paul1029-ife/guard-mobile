import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Guard System",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
