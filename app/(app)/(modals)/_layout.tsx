import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="complaint"
        options={{
          title: "Make a Complaint",
          presentation: "modal",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
