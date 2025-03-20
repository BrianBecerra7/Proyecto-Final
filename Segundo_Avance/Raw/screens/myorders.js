import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const MyOrdersScreen = () => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Orders</Text>
            <View style={styles.orderCard}>
                <Text style={styles.producer}>Producer</Text>
                <Button mode="contained" style={styles.button}>Logo</Button>
                <Button mode="contained" style={styles.button}>User Icon</Button>
                <Button mode="contained" style={styles.button}>View Details of Order</Button>
                <Button mode="contained" style={[styles.button, styles.acceptButton]}>Accept Order</Button>
                <Button mode="contained" style={[styles.button, styles.rejectButton]}>Reject Order</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    orderCard: {
        backgroundColor: "#2c3e50",
        padding: 10,
        borderRadius: 8,
    },
    producer: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 10,
    },
    button: {
        marginVertical: 5,
        backgroundColor: "#3b5998",
    },
    acceptButton: {
        backgroundColor: "#3498db",
    },
    rejectButton: {
        backgroundColor: "#2980b9",
    },
});

export default MyOrdersScreen;
