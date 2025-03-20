"use client"
import { useNavigation } from "@react-navigation/native"
import { ScrollView, StyleSheet, View } from "react-native"
import { Card, IconButton, Text, useTheme } from "react-native-paper"

const MyOrdersScreen = () => {
    const theme = useTheme()
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" iconColor="#FFFFFF" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.title}>My Orders</Text>
            </View>

            <ScrollView contentContainerStyle={styles.ordersContainer}>
                <Card style={styles.orderCard}>
                    <Card.Content>
                        <Text style={styles.orderTitle}>Order #12345</Text>
                        <Text>Date: 2024-01-20</Text>
                        <Text>Status: Processing</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.orderCard}>
                    <Card.Content>
                        <Text style={styles.orderTitle}>Order #67890</Text>
                        <Text>Date: 2024-01-15</Text>
                        <Text>Status: Shipped</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.orderCard}>
                    <Card.Content>
                        <Text style={styles.orderTitle}>Order #24680</Text>
                        <Text>Date: 2024-01-10</Text>
                        <Text>Status: Delivered</Text>
                    </Card.Content>
                </Card>
            </ScrollView>
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
    ordersContainer: {
        paddingBottom: 20,
    },
    orderCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginBottom: 15,
        elevation: 2,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
})

export default MyOrdersScreen

