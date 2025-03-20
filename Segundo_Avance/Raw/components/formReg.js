import { useNavigation } from "@react-navigation/native"
import ImageUploader from './ImageUploader'; // Import ImageUploader component
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { Alert, Box, Button, FormControl, Input, Select, Text, TextArea } from "native-base"
import { useState } from "react"
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { auth, db } from "../config/fb.js"

export default function Reg({ isProducer = false }) {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industryType: "Forestal",
    companyDescription: "",
  })

  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please complete all required fields.")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return false
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return false
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.")
      return false
    }

    if (isProducer && !formData.companyName) {
      setError("Company name is required for producers.")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    setError("")
    setSuccessMessage("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    let imageUrl = null
    if (image) {
      imageUrl = await uploadImageToCloudinary(image)
      if (!imageUrl) {
        setError("Image upload failed.")
        setLoading(false)
        return
      }
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      const user = userCredential.user

      // Create user document in Firestore
      const userDocRef = doc(db, "users", user.email);
      const profileImage = formData.profileImage || null; // Get the profile image URL
      await setDoc(userDocRef, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || "",
        address: formData.address || "",
        companyName: isProducer ? formData.companyName : "",
        industryType: isProducer ? formData.industryType : "",
        companyDescription: isProducer ? formData.companyDescription : "",
        profileImage: profileImage, // Save the profile image URL
        createdAt: new Date(),
      })

      // Set user role in Roles collection
      const roleDocRef = doc(db, "Roles", user.email)
      await setDoc(roleDocRef, {
        role: isProducer ? 2 : 1, // 1 for buyer, 2 for producer
      })

      setSuccessMessage("User successfully registered")

      // Navigate to login after a short delay
      setTimeout(() => {
        navigation.navigate("Login")
      }, 2000)
    } catch (error) {
      console.error("Error during registration:", error)
      setError("Error registering the user: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Box width="100%" maxWidth="400px">
          <FormControl isRequired>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input
              value={formData.fullName}
              onChangeText={(text) => updateFormData("fullName", text)}
              style={styles.input}
            />
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input
              value={formData.phone}
              onChangeText={(text) => updateFormData("phone", text)}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Address</FormControl.Label>
            <Input
              value={formData.address}
              onChangeText={(text) => updateFormData("address", text)}
              style={styles.input}
            />
          </FormControl>

          {isProducer && (
            <>
              <FormControl isRequired>
                <FormControl.Label>Company Name</FormControl.Label>
                <Input
                  value={formData.companyName}
                  onChangeText={(text) => updateFormData("companyName", text)}
                  style={styles.input}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Industry Type</FormControl.Label>
                <Select
                  selectedValue={formData.industryType}
                  minWidth="200"
                  accessibilityLabel="Choose Industry Type"
                  placeholder="Choose Industry Type"
                  onValueChange={(value) => updateFormData("industryType", value)}
                  style={styles.input}
                >
                  <Select.Item label="Forestal" value="Forestal" />
                  <Select.Item label="Chemical" value="Chemical" />
                  <Select.Item label="Mineral" value="Mineral" />
                  <Select.Item label="Agricultural" value="Agricultural" />
                </Select>
              </FormControl>

              <FormControl>
                <FormControl.Label>Company Description</FormControl.Label>
                <TextArea
                  value={formData.companyDescription}
                  onChangeText={(text) => updateFormData("companyDescription", text)}
                  style={styles.input}
                  h={20}
                  placeholder="Describe your company"
                  autoCompleteType={undefined}
                />
              </FormControl>
            </>
          )}

          <ImageUploader
            uploadPreset="rawcn_users" // Cloudinary upload preset
            onUploadComplete={(url) => updateFormData("profileImage", url)} // Update form data with image URL
          />

          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={formData.password}
              onChangeText={(text) => updateFormData("password", text)}
              secureTextEntry
              style={styles.input}
            />
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData("confirmPassword", text)}
              secureTextEntry
              style={styles.input}
            />
          </FormControl>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {successMessage ? (
            <Alert status="success" mt={3}>
              <Text>{successMessage}</Text>
            </Alert>
          ) : null}

          <Button onPress={handleSubmit} isLoading={loading} style={styles.button} mt={4}>
            <Text color="white">Register</Text>
          </Button>
        </Box>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
    fontSize: 16,
    marginHorizontal: 10,
  },
  imagePicker: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
  },
  button: {
    width: "75%",
    padding: 10,
    backgroundColor: "#0D47A1",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: "12.5%",
    borderRadius: 5,
  },
})
