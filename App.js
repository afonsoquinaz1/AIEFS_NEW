import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]); // Array to store all chat messages
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState("EFS Consulting");
  const screenWidth = Dimensions.get("window").width;

  const animatedWidth = useRef(new Animated.Value(screenWidth - 40)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef(null);

  const loadingButtonWidth = 50;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isLoading ? loadingButtonWidth : screenWidth - 40,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: Platform.OS !== "web", // Only use the native driver on mobile
    }).start();
  }, [isLoading, screenWidth]);

  const animateTextChange = () => {
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCompanyName(
        companyName === "EFS Consulting" ? "EFS AI" : "EFS Consulting"
      );

      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const user = {
    name: "Afonso Quinaz",
    image: "https://via.placeholder.com/50",
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "You have been signed out.");
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      Alert.alert("Input Required", "Please enter a message.");
      return;
    }

    setIsLoading(true);
    animateTextChange();

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, fromUser: true },
    ]);
    setInputText("");

    try {
      const response = await axios.post(
        "https://taktik.app.n8n.cloud/webhook/invoke_agent",
        {
          message: inputText,
        }
      );

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
      <View style={[tw`flex-row items-center px-4 py-3`, styles.navbar]}>
        <TouchableOpacity
          onPress={() => Alert.alert("Home", "Navigate to Home")}
        ></TouchableOpacity>

        <Animated.Text
          style={[
            tw`ml-4 text-lg font-semibold text-white`,
            { opacity: textOpacity },
          ]}
        >
          {companyName}
        </Animated.Text>

        <View style={tw`flex-1`} />
        <Text style={tw`text-lg text-white mr-4`}>{user.name}</Text>

        <TouchableOpacity onPress={handleSignOut}>
          {user.image ? (
            <Image
              source={{ uri: user.image }}
              style={tw`h-9 w-9 rounded-full`}
              resizeMode="cover"
            />
          ) : (
            <View
              style={tw`h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center`}
            >
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="#FFFFFF"
              />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 justify-between px-4 py-2`}>
        <ScrollView
          style={tw`flex-1 w-full`}
          contentContainerStyle={tw`py-4`}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                tw`mb-2`,
                message.fromUser ? tw`items-end` : tw`items-start`,
              ]}
            >
              <View
                style={[
                  tw`p-4 rounded-lg max-w-3/4`,
                  message.fromUser ? tw`bg-blue-500` : tw`bg-gray-200`,
                ]}
              >
                <Text
                  style={message.fromUser ? tw`text-white` : tw`text-gray-700`}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

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
              styles.animatedButtonContainer,
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#213B5E",
  },
  animatedButtonContainer: {
    overflow: "hidden",
    borderRadius: 8,
  },
});
