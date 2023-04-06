import React from 'react';
import { View, Text, Image, StyleSheet, Button, ImageBackground } from 'react-native';
import { useAuth } from "../../../context/auth";

const Myprofile = () => {
    const { user } = useAuth()

    console.log(user)

    if (user) {
        return (
            <View style={styles.container}>
                <View style={styles.coverPhoto} />
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar} />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>{user.email}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Share" onPress={() => { }} />
                </View>
            </View>
        );
    } else {
        return <Text>No User</Text>
    }


}

export default Myprofile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -75,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: 'white',
    },
    name: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '60%',
        justifyContent: 'center',
    },
});