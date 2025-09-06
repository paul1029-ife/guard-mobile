import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function IndexScreen() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (session) {
      router.replace("/(app)/home");
    } else {
      router.replace("/(auth)/sign-in");
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  return null;
}
