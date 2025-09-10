import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        router.replace("/(app)/home");
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Guard Login
        </Text>
        <Text className="text-gray-600">
          Sign in to access your guard dashboard
        </Text>
      </View>

      <View className="space-y-4">
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          error={error && !email ? error : ""}
        />

        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          error={error && !password ? error : ""}
        />

        {error && email && password && (
          <Text className="text-red-500 text-sm mb-4">{error}</Text>
        )}

        <Button
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
}
