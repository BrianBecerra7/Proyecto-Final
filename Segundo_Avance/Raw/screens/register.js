"use client"

import { StatusBar } from "expo-status-bar"
import { Box, NativeBaseProvider, Pressable, Text } from "native-base"
import React from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { SceneMap, TabView } from "react-native-tab-view"

import { Card } from "react-native-paper"
import Footer from "../components/Footer"
import Reg from "../components/formReg"

export default function Register() {
  const FirstRoute = () => (
    <Box flex={1} my="4">
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Box width="100%">
              <Reg isProducer={false} />
            </Box>
          </ScrollView>
        </Card.Content>
      </Card>
    </Box>
  )

  const SecondRoute = () => (
    <Box flex={1} my="4">
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Box width="100%">
              <Reg isProducer={true} />
            </Box>
          </ScrollView>
        </Card.Content>
      </Card>
    </Box>
  )

  const initialLayout = {
    width: Dimensions.get("window").width,
  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })

  function Add() {
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
      { key: "first", title: "For a Buyer" },
      { key: "second", title: "For a Producer" },
    ])

    const renderTabBar = (props) => {
      const inputRange = props.navigationState.routes.map((x, i) => i)

      // Define colors outside the map function to avoid conditional hook calls
      const activeColor = "#000"
      const inactiveColor = "#1f2937"
      const activeBorderColor = "cyan.500"
      const inactiveBorderColor = "coolGray.200"

      return (
        <Box flexDirection="row" style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const color = index === i ? activeColor : inactiveColor
            const borderColor = index === i ? activeBorderColor : inactiveBorderColor
            return (
              <Box
                borderBottomWidth="3"
                borderColor={borderColor}
                flex={1}
                alignItems="center"
                p="3"
                cursor="pointer"
                key={i}
              >
                <Pressable onPress={() => setIndex(i)}>
                  <Text style={{ color }}>{route.title}</Text>
                </Pressable>
              </Box>
            )
          })}
        </Box>
      )
    }

    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{ marginTop: StatusBar.currentHeight }}
      />
    )
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Box>
          <Add />
        </Box>

        <Footer />
      </View>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7", // Fondo gris claro para la pantalla
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  card: {
    width: "90%",
    height: "90%",
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ajusta el contenido de la tarjeta al ancho
  },
  tabBar: {
    width: "110%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
})

