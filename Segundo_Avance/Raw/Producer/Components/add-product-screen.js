"use client"

import { useNavigation } from "@react-navigation/native"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { Alert, ScrollView, StyleSheet, View } from "react-native"
import ImageUploader from "../../components/ImageUploader"
import { Button, HelperText, IconButton, Menu, Text, TextInput, useTheme } from "react-native-paper"
import { db } from "../../firebase/config"

const categories = ["Forestal", "Chemical", "Mineral", "Agricultural"]

const AddProductScreen = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)

    const [product, setProduct] = useState({
        imageUrl: "", 
        name: "",
        category: "",
        description: "",
        specifications: "",
        price: "",
        minimumOrder: "",
        deliveryOptions: "",
    })

    const updateProduct = (field, value) => {
        setProduct({ ...product, [field]: value })
    }

    const validateForm = () => {
        if (!product.name || !product.category || !product.price) {
            Alert.alert("Validation Error", "Name, category and price are required fields")
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        if (!validateForm()) return

        try {
            setLoading(true)


            const productData = {
                ...product,
                price: Number.parseFloat(product.price),
                minimumOrder: Number.parseInt(product.minimumOrder, 10) || 1,
                createdAt: new Date(),
                imageUrl: product.imageUrl, 
            }


            await addDoc(collection(db, "products"), productData)

            Alert.alert("Success", "Product added successfully", [{ text: "OK", onPress: () => navigation.goBack() }])
        } catch (error) {
            console.error("Error adding product:", error)
            Alert.alert("Error", "Failed to add product. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" iconColor="#FFFFFF" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.title}>Add New Product</Text>
            </View>

            <ScrollView style={styles.form}>
                <TextInput
                    label="Product Name"
                    value={product.name}
                    onChangeText={(text) => updateProduct("name", text)}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#0D47A1"
                    activeOutlineColor="#1565C0"
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Category"
                        value={product.category}
                        onChangeText={(text) => updateProduct("category", text)}
                        mode="outlined"
                        style={styles.input}
                        outlineColor="#0D47A1"
                        activeOutlineColor="#1565C0"
                        right={<TextInput.Icon icon="menu-down" onPress={() => setMenuVisible(true)} />}
                    />
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={{ x: 0, y: 0 }}
                        style={styles.menu}
                    >
                        {categories.map((category) => (
                            <Menu.Item
                                key={category}
                                onPress={() => {
                                    updateProduct("category", category)
                                    setMenuVisible(false)
                                }}
                                title={category}
                            />
                        ))}
                    </Menu>
                    <HelperText type="info">Choose from: Forestal, Chemical, Mineral, Agricultural</HelperText>
                </View>

                <TextInput
                    label="Description"
                    value={product.description}
                    onChangeText={(text) => updateProduct("description", text)}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#0D47A1"
                    activeOutlineColor="#1565C0"
                    multiline
                    numberOfLines={3}
                />

                <TextInput
                    label="Specifications"
                    value={product.specifications}
                    onChangeText={(text) => updateProduct("specifications", text)}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#0D47A1"
                    activeOutlineColor="#1565C0"
                    multiline
                    numberOfLines={3}
                />

                <TextInput
                    label="Price"
                    value={product.price}
                    onChangeText={(text) => updateProduct("price", text)}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#0D47A1"
                    activeOutlineColor="#1565C0"
                    keyboardType="numeric"
                />

                <TextInput
                    label="Minimum Order Quantity"
                    value={product.minimumOrder}
                    onChangeText={(text) => updateProduct("minimumOrder", text)}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#0D47A1"
                    activeOutlineColor="#1565C0"
                    keyboardType="numeric"
                />

                <TextInput
                    label="Delivery Options"
                    value={product.deliveryOptions}
                    onChangeText={(text) => updateProduct("deliveryOptions", text)}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#0D47A1"
                    activeOutlineColor="#1565C0"
                    multiline
                    numberOfLines={2}
                />

                <ImageUploader
                    uploadPreset="rawcn_products" 
                    onUploadComplete={(url) => updateProduct("imageUrl", url)} 
                />
                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.submitButton}
                    loading={loading}
                    disabled={loading}
                >
                    Add Product
                </Button>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#263238",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 10,
    },
    form: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        marginBottom: 15,
        backgroundColor: "#FFFFFF",
    },
    menu: {
        marginTop: 70,
    },
    submitButton: {
        marginTop: 20,
        marginBottom: 40,
        backgroundColor: "#0D47A1",
        paddingVertical: 8,
    },
})

export default AddProductScreen
