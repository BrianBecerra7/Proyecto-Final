"use client"

import { useState } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { MaskedTextInput } from "react-native-mask-text"
import { Avatar, Button, Divider, Text, TextInput, useTheme } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const ProfileScreen = () => {
    const theme = useTheme()
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState({
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        address: "123 Main St, City, Country",
    })

    const handleEdit = () => {
        if (isEditing) {

            handleSave()
        }
        setIsEditing(!isEditing)
    }

    const handleSave = () => {

        setIsEditing(false)
    }

    const handleResetPassword = () => {
        
        console.log("Restablecer contraseña")
    }

    const renderField = (icon, label, value, key) => (
        <View style={styles.fieldContainer}>
            <Icon name={icon} size={24} color={theme.colors.primary} style={styles.fieldIcon} />
            <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>{label}</Text>
                {isEditing && key !== "email" ? (
                    key === "phone" ? (
                        <MaskedTextInput
                            mask="(999) 999-9999"
                            onChangeText={(text, rawText) => setUserData({ ...userData, [key]: rawText })}
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
                        />
                    )
                ) : (
                    <Text style={styles.fieldValue}>{value}</Text>
                )}
            </View>
        </View>
    )

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Avatar.Image size={120} source={require("../../assets/default-avatar.png")} />
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Icon name={isEditing ? "check" : "pencil"} size={24} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {renderField("account", "Nombre completo", userData.fullName, "fullName")}
                {renderField("email", "Email", userData.email, "email")}
                {renderField("phone", "Teléfono", userData.phone, "phone")}
                {renderField("map-marker", "Dirección", userData.address, "address")}
                {renderField("lock", "Contraseña", "••••••••", "password")}
                <Divider style={styles.divider} />
                <Button mode="contained" onPress={handleResetPassword} style={styles.resetButton}>
                    Restablecer Contraseña
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
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
        alignItems: "center",
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
    },
})

export default ProfileScreen

