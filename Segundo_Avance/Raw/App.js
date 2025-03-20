import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet, TouchableOpacity } from "react-native"
import { DefaultTheme, Provider as PaperProvider, Text } from "react-native-paper"
import Agricultural from "./Buyer/Components/Agricultural"
import Chemicals from "./Buyer/Components/Chemicals"
import Forestry from "./Buyer/Components/Forestry"
import Minerals from "./Buyer/Components/Minerals"
import ProductDetails from "./Buyer/Components/ProductDetails"

import MainBuyer from "./Buyer/MainBuyer"
import MainProducer from "./Producer/MainProducer"
import Login from "./screens/login"
import Principal from "./screens/principal"
import Register from "./screens/register"

// Import the new producer screens
import AddProductScreen from "./Producer/Components/add-product-screen"
import MyOrdersScreen from "./Producer/Components/my-orders-screen"
import ProductManagementScreen from "./Producer/Components/product-management-screen"
import ProfileScreen from "./Producer/Components/profile-screen"
import HomeScreen from "./Producer/MainProducer"



const Stack = createStackNavigator()

// Define the theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0D47A1",
    accent: "#1976D2",
    background: "#263238",
    surface: "#FFFFFF",
  },
}

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Principal">
          <Stack.Screen
            name="Principal"
            component={Principal}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.link}>Login/Register</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="MainProducer"
            component={MainProducer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainBuyer"
            component={MainBuyer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Agricultural" component={Agricultural} />
          <Stack.Screen name="Chemicals" component={Chemicals} />
          <Stack.Screen name="Forestry" component={Forestry} />
          <Stack.Screen name="Minerals" component={Minerals} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: "My Profile",
              headerStyle: {
                backgroundColor: "#263238",
              },
              headerTintColor: "#fff",
            }}
          />

          <Stack.Screen
            name="ProducerHome"
            component={HomeScreen}
            options={{
              headerShown: false,
              title: "Producer Dashboard",
            }}
          />
          <Stack.Screen
            name="ProductManagement"
            component={ProductManagementScreen}
            options={{
              headerShown: false,
              title: "Product Management",
            }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{
              headerShown: false,
              title: "Add Product",
            }}
          />
          <Stack.Screen
            name="MyOrders"
            component={MyOrdersScreen}
            options={{
              headerShown: false,
              title: "My Orders",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  link: {
    color: "#444141",
    marginHorizontal: 20,
    textDecorationLine: "underline",
  },
})
