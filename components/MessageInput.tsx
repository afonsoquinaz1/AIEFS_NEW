import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";

interface MessageInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputText,
  setInputText,
  handleSendMessage,
  isLoading,
}) => {
  return (
    <View style={tw`w-full relative`}>
      <TextInput
        style={tw`w-full p-4 pr-14 border border-gray-400 rounded-lg`}
        placeholder="Type your message..."
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={handleSendMessage}
      />

      <Animated.View
        style={[
          {
            position: "absolute",
            right: 10,
            top: "50%",
            transform: [{ translateY: -12 }],
            width: isLoading ? 40 : 24,
            height: 24,
            alignItems: "center",
            justifyContent: "center",
          },
          { overflow: "hidden", borderRadius: 8 },
        ]}
      >
        <TouchableOpacity
          style={tw`p-2`}
          onPress={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#213B5E" />
          ) : (
            <Ionicons name="paper-plane" size={20} color="#213B5E" />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default MessageInput;
