import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useAuth } from "@/lib/auth-context";
import { Location as LocationType } from "@/lib/types";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

export default function ComplaintModal() {
  const { user } = useAuth();
  const [complaintText, setComplaintText] = useState("");
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentLocation();
  }, []);

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

  const handleSubmit = async () => {
    if (!complaintText.trim()) {
      setError("Please enter your complaint");
      return;
    }

    if (!location) {
      setError("Location is required. Please try again.");
      return;
    }

    if (!user) {
      setError("You must be logged in to submit a complaint");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock complaint submission - store locally
      const complaint = {
        id: Date.now().toString(),
        guard_id: "mock-guard-id",
        complaint_text: complaintText.trim(),
        created_at: new Date().toISOString(),
        latitude: location.latitude,
        longitude: location.longitude,
      };

      // Store in local storage (AsyncStorage would be better for persistence)
      console.log("Complaint submitted:", complaint);

      Alert.alert("Success", "Your complaint has been submitted successfully", [
        {
          text: "OK",
          onPress: () => router.dismiss(),
        },
      ]);
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError(
        err instanceof Error ? err.message : "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.dismiss();
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-2">
            Submit a Complaint
          </Text>
          <Text className="text-gray-600">
            Please describe the issue you encountered
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Current Location
          </Text>
          {location ? (
            <View className="bg-gray-50 p-3 rounded-lg">
              <Text className="text-gray-600">
                Latitude: {location.latitude.toFixed(6)}
              </Text>
              <Text className="text-gray-600">
                Longitude: {location.longitude.toFixed(6)}
              </Text>
            </View>
          ) : (
            <Text className="text-gray-500">Getting location...</Text>
          )}
        </View>

        <TextField
          label="Complaint Details"
          value={complaintText}
          onChangeText={setComplaintText}
          placeholder="Describe the issue you encountered..."
          multiline
          numberOfLines={6}
          error={error}
        />

        <View className="flex-row space-x-4 mt-6 items-center gap-3">
          <View className="flex-1">
            <Button title="Cancel" onPress={handleCancel} variant="secondary" />
          </View>
          <View className="flex-1">
            <Button
              title="Submit"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading || !complaintText.trim() || !location}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
