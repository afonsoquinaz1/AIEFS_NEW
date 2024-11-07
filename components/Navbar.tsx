import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../Logo";
import { THEME_COLOR } from "@env";

interface NavbarProps {
  companyName: string;
  textOpacity: Animated.Value;
  user: {
    name: string;
    image: string;
  };
  handleSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  companyName,
  textOpacity,
  user,
  handleSignOut,
}) => {
  return (
    <View style={[tw`flex-row items-center px-4 py-3`, styles.navbar]}>
      <TouchableOpacity onPress={() => Alert.alert("Home", "Navigate to Home")}>
        <Logo width={50} height={50} />
      </TouchableOpacity>

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
            <Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: THEME_COLOR,
  },
});

export default Navbar;
