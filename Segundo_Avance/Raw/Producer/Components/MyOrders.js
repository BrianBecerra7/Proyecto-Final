"use client"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { Card, IconButton, Text, useTheme } from "react-native-paper"

const ProductManagementScreen = () => {
    const theme = useTheme()
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" iconColor="#FFFFFF" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.title}>Product Management</Text>
            </View>

            <View style={styles.actionCards}>
                <Card style={styles.card} onPress={() => navigation.navigate("AddProduct")}>
                    <Card.Content style={styles.cardContent}>
                        <IconButton icon="plus-circle" iconColor="#0D47A1" size={40} style={styles.cardIcon} />
                        <Text style={styles.cardTitle}>Add Product</Text>
                        <Text style={styles.cardDescription}>Create a new product listing with details and specifications</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card} onPress={() => navigation.navigate("EditProduct")}>
                    <Card.Content style={styles.cardContent}>
                        <IconButton icon="pencil-circle" iconColor="#0D47A1" size={40} style={styles.cardIcon} />
                        <Text style={styles.cardTitle}>Edit Product</Text>
                        <Text style={styles.cardDescription}>Modify existing product information and specifications</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card} onPress={() => navigation.navigate("DeleteProduct")}>
                    <Card.Content style={styles.cardContent}>
                        <IconButton icon="delete-circle" iconColor="#0D47A1" size={40} style={styles.cardIcon} />
                        <Text style={styles.cardTitle}>Delete Product</Text>
                        <Text style={styles.cardDescription}>Remove products that are no longer available</Text>
                    </Card.Content>
                </Card>
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
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 10,
    },
    actionCards: {
        flex: 1,
        gap: 20,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        elevation: 4,
    },
    cardContent: {
        padding: 10,
        alignItems: "center",
    },
    cardIcon: {
        margin: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#263238",
    },
    cardDescription: {
        fontSize: 14,
        color: "#546E7A",
        textAlign: "center",
    },
})

export default ProductManagementScreen

