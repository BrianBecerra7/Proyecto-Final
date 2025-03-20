import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Avatar, Button, Card, Text, useTheme } from "react-native-paper"
import { auth, db, doc, getDoc } from "../config/fb.js"

const MainProducer = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.email)
          const userDoc = await getDoc(userDocRef)

          if (userDoc.exists()) {
            setUserData({
              email: currentUser.email,
              ...userDoc.data(),
            })
          } else {
            setUserData({
              email: currentUser.email,
              fullName: currentUser.displayName || "Producer",
            })
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Producer Dashboard</Text>

        {!loading && (
          <Card style={styles.userCard}>
            <Card.Content style={styles.userCardContent}>
              {userData?.profileImage ? (
                <Avatar.Image
                  size={50}
                  source={{ uri: userData.profileImage }}
                />
              ) : (
                <Avatar.Text
                  size={50}
                  label={userData?.fullName?.charAt(0) || userData?.email?.charAt(0) || "P"}
                  backgroundColor="#0D47A1"
                />
              )}
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userData?.fullName || "Producer"}</Text>
                <Text style={styles.userEmail}>{userData?.email}</Text>
              </View>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("ProfileScreen", { userData })}
                style={styles.profileButton}
              >
                Profile
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="package-variant"
          contentStyle={styles.buttonContent}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate("ProductManagement")}
        >
          Manage Products
        </Button>

        <Button
          mode="contained"
          icon="clipboard-list"
          contentStyle={styles.buttonContent}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate("MyOrders")}
        >
          Manage Orders
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238",
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  userCard: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#37474F",
    borderRadius: 12,
  },
  userCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userEmail: {
    fontSize: 14,
    color: "#B0BEC5",
  },
  profileButton: {
    backgroundColor: "#0D47A1",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 30,
  },
  button: {
    backgroundColor: "#0D47A1",
    borderRadius: 12,
    elevation: 4,
  },
  buttonContent: {
    height: 100,
    justifyContent: "center",
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
export default MainProducer
