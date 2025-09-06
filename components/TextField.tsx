import React from "react";
import { Text, TextInput, View } from "react-native";

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  className = "",
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`border border-gray-300 rounded-lg px-3 py-2 text-base ${
          multiline ? "h-24" : ""
        } ${error ? "border-red-500" : ""}`}
      />

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
