import { useRouter, useSegments } from "expo-router";
import React from "react";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'






const AuthContext = React.createContext(null);

export function useAuth() {
    return React.useContext(AuthContext);
}

function useProtectedRoute(user) {
    const rootSegment = useSegments()[0];
    const router = useRouter();


    React.useEffect(() => {
        if (user === undefined) {
            return;
        }

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !user &&
            rootSegment !== "(auth)"
        ) {
            // Redirect to the sign-in page.
            router.replace("/(auth)/sign-in");
        } else if (user && rootSegment !== "(app)") {
            // Redirect away from the sign-in page.
            router.replace("/");
        }
    }, [user, rootSegment]);
}

export function Provider(props) {
    // const { getItem, setItem, removeItem } = useAsyncStorage("USER");
    const [user, setAuth] = React.useState(undefined);
    const [authtoken, setAuthtoken] = React.useState(() => { AsyncStorage.getItem('tokens') })
    const [refresh, setRefresh] = React.useState(undefined)

    const base_url = process.env.LOCAL_URL

    React.useEffect(() => {

        AsyncStorage.getItem('current_user').then((json) => {

            if (json != null) {
                console.log(json)
                setAuth(JSON.parse(json));
            } else {
                setAuth(null);
            }
        });
        AsyncStorage.getItem('tokens').then((json) => {

            if (json != null) {
                const res = JSON.parse(json)
                console.log(res['refresh'])
                setAuthtoken(res)
                setRefresh(res['refresh'])

            } else {
                setAuthtoken(null);
            }
        });
    }, []);

    useProtectedRoute(user);



    const signIn = (email, password) => {
        console.log(base_url)
        axios.post(`${base_url}/auth/jwt/create`, {
            email,
            password
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            }
        }).then(async res => {

            verifyToken(res.data.access)
            // setItem(JSON.stringify(res.data));
            try {
                await AsyncStorage.setItem("tokens", JSON.stringify(res.data));
            } catch (error) {
                console.log(error);
            }
        }).catch(e => {
            console.log('Log In Failed...')
        })

    }

    const verifyToken = (accessToken) => {
        var data = JSON.stringify({
            "token": accessToken
        });

        var config = {
            method: 'post',
            url: `${base_url}/auth/jwt/verify`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data


        };

        axios(config)
            .then(function (response) {
                console.log(response.status + ':token was verified');
                loadUser(accessToken)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const refresh_token = () => {
        AsyncStorage.getItem('tokens').then((json) => {

            if (json != null) {
                console.log(JSON.parse(json))
                const tokens = JSON.parse(json)
                var data = JSON.stringify({
                    'refresh': tokens['refresh']
                });

                var config = {
                    method: 'post',
                    url: `${base_url}/auth/jwt/refresh`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data


                };

                axios(config)
                    .then(async function (response) {
                        try {
                            console.log('new tokens: ' + response.data)
                            await AsyncStorage.setItem("tokens", JSON.stringify(response.data));
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log('could not refresh token')
            }
        });

    }


    React.useEffect(() => {
        const interval = setInterval(() => {
            refresh_token()
        }, 60000);
        return () => clearInterval(interval);
    }, []);


    const get_token = () => {
        AsyncStorage.getItem('tokens').then((json) => {

            if (json != null) {
                // console.log(json)
                setAuthtoken(JSON.parse(json))
            } else {
                setAuthtoken(null);
            }
        });
    }





    const loadUser = (accessToken) => {
        const token = 'JWT ' + accessToken

        var config = {
            method: 'GET',
            url: `${base_url}/auth/users/me`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },


        };

        axios(config)
            .then(async function (response) {
                // setAuth(JSON.stringify(response.data.email))
                setAuth(response.data)
                try {
                    await AsyncStorage.setItem("current_user", JSON.stringify(response.data));
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const signUp = (name, email, password, re_password) => {
        axios.post(`${base_url}/auth/users/`, {
            name,
            email,
            password,
            re_password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.status)
        }).catch(e => {
            console.log('Sign Up Failed...')
        })

    }

    const signOut = async () => {
        setAuth(null);
        try {
            AsyncStorage.clear();
        } catch (error) {
            console.log('no user');
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                signUp,
                user,
                get_token,
                refresh_token,
                authtoken
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}


