import { Button } from "@/components/Button";
import { useAuth } from "@/lib/auth-context";
import { Guard, Location as LocationType } from "@/lib/types";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const [guard, setGuard] = useState<Guard | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/sign-in");
      return;
    }

    fetchGuardInfo();
    getCurrentLocation();
  }, [user]);

  const fetchGuardInfo = async () => {
    if (!user) return;

    try {
      // Mock guard data
      const mockGuard: Guard = {
        id: "mock-guard-id",
        auth_user_id: user.id,
        name: "John Doe",
        guard_post: "Main Gate Security",
      };

      setGuard(mockGuard);
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get current location");
    }
  };

  const handleMakeComplaint = () => {
    router.push("/(app)/(modals)/complaint");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white p-6 justify-center items-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {guard?.name || "Guard"}
        </Text>
        <Text className="text-gray-600">
          {guard?.guard_post || "Guard Post"}
        </Text>
      </View>

      <View className="bg-gray-50 p-4 rounded-lg mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Current Location
        </Text>
        {location ? (
          <View>
            <Text className="text-gray-600">
              Latitude: {location.latitude.toFixed(6)}
            </Text>
            <Text className="text-gray-600">
              Longitude: {location.longitude.toFixed(6)}
            </Text>
          </View>
        ) : (
          <Text className="text-gray-500">Location not available</Text>
        )}
      </View>

      <View className="space-y-4">
        <Button
          title="Make a Complaint"
          onPress={handleMakeComplaint}
          className="mb-4"
        />

        <Button title="Sign Out" onPress={handleSignOut} variant="secondary" />
      </View>
    </View>
  );
}
