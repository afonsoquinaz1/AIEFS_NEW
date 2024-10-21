import React, { useRef } from "react";
import { ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import MessageBubble from "./MessageBubble";

interface ChatProps {
  messages: { text: string; fromUser: boolean }[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const scrollViewRef = useRef(null);

  return (
    <ScrollView
      style={tw`flex-1 w-full`}
      contentContainerStyle={tw`py-4`}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    >
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
    </ScrollView>
  );
};

export default Chat;
