import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../../context/auth";
import { Button } from "../../etc/button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StatusBar } from "react-native";



export default function SignIn() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const router = useRouter()
    return (

        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <View style={styles.container}>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder={'Email'}
                    placeholderTextColor={'white'}
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder={'Password'}
                    placeholderTextColor={'white'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button
                    onPress={() => signIn(email, password)}
                    buttonStyle={{ backgroundColor: "dodgerblue", paddingHorizontal: 24 }}
                    textStyle={{ fontSize: 24 }}
                >
                    Sign In
                </Button>
                <Pressable
                    onPress={() => router.push('/sign-up')}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'black',
                            marginTop: 50
                        },

                    ]}>
                    <Text style={styles.text}>Don't have an account? sign up</Text>
                </Pressable>


            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 50,
        color: 'white',
        borderRadius: 5,
    },
    text: {
        color: 'white'
    }
});