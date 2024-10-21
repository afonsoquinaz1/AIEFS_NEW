import React from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

interface MessageBubbleProps {
  message: {
    text: string;
    fromUser: boolean;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View
      style={[tw`mb-2`, message.fromUser ? tw`items-end` : tw`items-start`]}
    >
      <View
        style={[
          tw`p-4 rounded-lg`,
          message.fromUser ? tw`bg-blue-500` : tw`bg-gray-200`,
          { maxWidth: "75%" },
        ]}
      >
        <Text style={message.fromUser ? tw`text-white` : tw`text-gray-700`}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;
