// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import HomeIcon from "../../assets/icons/house.svg";
import FeedIcon from "../../assets/icons/users.svg";
import RankingIcon from "../../assets/icons/ranking.svg";
import SettingsIcon from "../../assets/icons/gear.svg";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        headerStyle: { backgroundColor: "#ffffff", borderBottomWidth: 0, elevation: 0, shadowOpacity: 0, shadowColor: "transparent" },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: { height: 109, paddingTop: 12, backgroundColor: "#F1F1F1", borderTopWidth: 0 },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <HomeIcon fill={color} /> }} />
      <Tabs.Screen name="feed" options={{ title: "Feed", tabBarIcon: ({ color }) => <FeedIcon fill={color} /> }} />
      <Tabs.Screen name="ranking" options={{ title: "Ranking", tabBarIcon: ({ color }) => <RankingIcon fill={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({ color }) => <SettingsIcon fill={color} /> }} />

      
      <Tabs.Screen
        name="PreTriagem"          
        options={{ href: null, headerShown: false }}
      />
    </Tabs>
  );
}
