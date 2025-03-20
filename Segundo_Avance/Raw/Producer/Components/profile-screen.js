"use client"

import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaskedTextInput } from "react-native-mask-text"
import { auth, db, doc, getDoc, setDoc, updateDoc, signOut } from "../../config/fb.js";

const ProfileScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    industryType: "",
    companyDescription: "",
  });

  useEffect(() => {
   
    if (route.params?.userData) {
      setUserData(route.params.userData);
      setLoading(false);
    } else {
     
      const fetchUserData = async () => {
        try {
          if (auth && auth.currentUser) {
            const currentUser = auth.currentUser;
            const userDocRef = doc(db, "users", currentUser.email);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              setUserData({
                email: currentUser.email,
                ...userDoc.data(),
              });
            } else {
              
              const defaultUserData = {
                email: currentUser.email,
                fullName: currentUser.displayName || "",
                phone: "",
                address: "",
                companyName: "",
                industryType: "",
                companyDescription: "",
              };

              setUserData(defaultUserData);

              
              try {
                await setDoc(userDocRef, {
                  ...defaultUserData,
                  createdAt: new Date(),
                });
              } catch (error) {
                console.error("Error creando el documento del usuario:", error);
              }
            }
          } else {
            
            Alert.alert("Not Logged In", "You need to be logged in to view your profile.", [
              { text: "OK", onPress: () => navigation.navigate("Login") },
            ]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [route.params?.userData, navigation]);

  const handleEdit = () => {
    if (isEditing) {
      handleSave();
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      if (auth && auth.currentUser) {
        const currentUser = auth.currentUser;
        const userDocRef = doc(db, "users", currentUser.email);

        const { email, ...dataToUpdate } = userData;

        await updateDoc(userDocRef, dataToUpdate);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "You must be logged in to update your profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleResetPassword = () => {
    
    Alert.alert("Reset Password", "Are you sure you want to reset your password?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
         
          if (auth && auth.currentUser) {
            auth
              .sendPasswordResetEmail(auth.currentUser.email)
              .then(() => {
                Alert.alert("Password Reset", "Password reset email has been sent to your email address.");
              })
              .catch((error) => {
                Alert.alert("Error", "Failed to send password reset email. Please try again.");
                console.error("Error sending password reset email:", error);
              });
          } else {
            Alert.alert("Error", "You must be logged in to reset your password");
          }
        },
      },
    ]);
  };

  const handleSignOut = () => {
    
    signOut(auth)
      .then(() => {
        Alert.alert("Success", "You have been signed out.");
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }], 
          });
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        Alert.alert("Error", "An error occurred while signing out.");
      });
  };

  const renderField = (icon, label, value, key, multiline = false) => (
    <View style={styles.fieldContainer}>
      <Icon name={icon} size={24} color={theme.colors.primary} style={styles.fieldIcon} />
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isEditing && key !== "email" ? (
          key === "phone" ? (
            <MaskedTextInput
              mask="(999) 999-9999"
              onChangeText={(text, rawText) => setUserData({ ...userData, [key]: text })}
              value={value}
              style={styles.input}
              keyboardType="numeric"
            />
          ) : (
            <TextInput
              mode="flat"
              value={value}
              onChangeText={(text) => setUserData({ ...userData, [key]: text })}
              style={styles.input}
              multiline={multiline}
              numberOfLines={multiline ? 3 : 1}
            />
          )
        ) : (
          <Text style={styles.fieldValue}>{value || "Not set"}</Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {userData?.profileImage ? (
          <Avatar.Image
            size={120}
            source={{ uri: userData.profileImage }}
          />
        ) : (
          <Avatar.Text
            size={120}
            label={userData?.fullName?.charAt(0) || userData?.email?.charAt(0) || "P"}
            backgroundColor="#0D47A1"
          />
        )}
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Icon name={isEditing ? "check" : "pencil"} size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {renderField("account", "Full Name", userData.fullName, "fullName")}
        {renderField("email", "Email", userData.email, "email")}
        {renderField("phone", "Phone Number", userData.phone, "phone")}
        {renderField("map-marker", "Address", userData.address, "address")}
        {renderField("office-building", "Company Name", userData.companyName, "companyName")}
        {renderField("factory", "Industry Type", userData.industryType, "industryType")}
        {renderField("text-box", "Company Description", userData.companyDescription, "companyDescription", true)}

        <Divider style={styles.divider} />

        <Button mode="contained" onPress={handleResetPassword} style={styles.resetButton}>
          Reset Password
        </Button>

        <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.backButton}>
          Back to Dashboard
        </Button>

        <Button 
        icon="logout"
          mode="contained" 
          onPress={handleSignOut} 
          style={styles.signOutButton}
        >
          Sign Out
        </Button>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButton: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  fieldIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  divider: {
    marginVertical: 20,
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#0D47A1",
  },
  backButton: {
    marginTop: 15,
    borderColor: "#0D47A1",
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: "#D32F2F",
  },
});

export default ProfileScreen;
