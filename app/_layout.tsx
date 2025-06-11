import { Stack } from "expo-router";

export default function RootLayout() {


  const appContents = (
  <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
  </Stack>);

  return appContents
}
