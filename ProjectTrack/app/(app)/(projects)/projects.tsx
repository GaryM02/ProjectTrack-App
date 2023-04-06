import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from "../../../context/auth";
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'


const projects = () => {
    const { refresh_token } = useAuth()

    React.useEffect(() => {
        refresh_token()
    }, [])

    const router = useRouter()
    return (
        <View style={styles.container}>

            <View style={{ marginTop: 100, marginBottom: 100 }}>

                <Pressable
                    onPress={() => router.push('/myprojects')}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                        },
                        styles.wrapperCustom,
                    ]}>
                    <Text style={styles.text}>My Projects</Text>
                </Pressable>
                <Pressable
                    onPress={() => router.push('/createproject')}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                        },
                        styles.wrapperCustom,
                    ]}>
                    <Text style={styles.text}>Create Project</Text>
                </Pressable>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

        </View>
    )
}

export default projects


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    wrapperCustom: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8,
        padding: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

})