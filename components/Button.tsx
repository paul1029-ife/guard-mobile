import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  className = "",
}) => {
  const baseClasses = "px-6 py-3 rounded-lg items-center justify-center";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600"
      : "bg-gray-200 border border-gray-300";
  const disabledClasses = disabled || loading ? "opacity-50" : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "white" : "black"} />
      ) : (
        <Text
          className={`text-base font-semibold ${
            variant === "primary" ? "text-white" : "text-gray-700"
          }`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
