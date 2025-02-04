import React, { useState, useRef, useEffect } from "react";
import { View, Alert, Animated, Easing, Dimensions } from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import MessageInput from "./components/MessageInput";
import { API_URL, USER_NAME, APP_NAME } from "@env";
export default function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState(APP_NAME);
  const [username, setUsername] = useState(USER_NAME);
  const screenWidth = Dimensions.get("window").width;

  const animatedWidth = useRef(new Animated.Value(screenWidth - 40)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const user = {
    name: username,
    image: "https://via.placeholder.com/50",
  };

  const loadingButtonWidth = 50;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isLoading ? loadingButtonWidth : screenWidth - 40,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isLoading, screenWidth]);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "You have been signed out.");
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      Alert.alert("Input Required", "Please enter a message.");
      return;
    }

    setIsLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, fromUser: true },
    ]);
    setInputText("");

    try {
      const response = await axios.post(API_URL, { message: inputText });

      const responseData = response.data;
      if (typeof responseData === "object" && responseData.output) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: responseData.output, fromUser: false },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: JSON.stringify(responseData), fromUser: false },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: " + error.message, fromUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <Navbar
        companyName={companyName}
        textOpacity={textOpacity}
        user={user}
        handleSignOut={handleSignOut}
      />
      <Chat messages={messages} />
      <MessageInput
        inputText={inputText}
        setInputText={setInputText}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </View>
  );
}
