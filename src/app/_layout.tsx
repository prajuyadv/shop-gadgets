import {ToastProvider} from "react-native-toast-notifications";
import AuthProvider from "../providers/auth-provider";
import { Stack } from "expo-router/stack";



export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(shop)"
          options={{ headerShown: false, title: "Shop" }}
        />
        <Stack.Screen
          name="categories"
          options={{ headerShown: false, title: "Categories" }}
        />
        <Stack.Screen
          name="product"
          options={{ headerShown: false, title: "Product Details" }}
        />
        <Stack.Screen
          name="cart"
          options={{ presentation: "modal", title: "Shopping Cart " }}
        />
        <Stack.Screen
          name="auth"
          options={{ headerShown: false }}
        />
      </Stack>
      </AuthProvider>
    </ToastProvider>
  );
}
