import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const AccountSettingsScreen = () => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Settings</Text>
            <View style={styles.settingsCard}>
                <Text style={styles.producer}>Producer</Text>
                <Button mode="contained" style={styles.button}>Logo</Button>
                <Button mode="contained" style={styles.button}>User Icon</Button>
                <Button mode="contained" style={[styles.button, styles.emailButton]}>Change Email Address</Button>
                <Button mode="contained" style={[styles.button, styles.passwordButton]}>Change Password</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#121212",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    settingsCard: {
        backgroundColor: "#1e1e1e",
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
        backgroundColor: "#4a70b3",
    },
    emailButton: {
        backgroundColor: "#255f8f",
    },
    passwordButton: {
        backgroundColor: "#1b4b73",
    },
});

export default AccountSettingsScreen;
