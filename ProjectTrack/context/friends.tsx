
import React from "react";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'


const FriendContext = React.createContext(null);

export function useFriendContext() {
    return React.useContext(FriendContext);
}

// function useProtectedRoute(user) {
//     const rootSegment = useSegments()[0];
//     const router = useRouter();

//     React.useEffect(() => {
//         if (user === undefined) {
//             return;
//         }

//         if (
//             // If the user is not signed in and the initial segment is not anything in the auth group.
//             !user &&
//             rootSegment !== "(auth)"
//         ) {
//             // Redirect to the sign-in page.
//             router.replace("/(auth)/sign-in");
//         } else if (user && rootSegment !== "(app)") {
//             // Redirect away from the sign-in page.
//             router.replace("/");
//         }
//     }, [user, rootSegment]);
// }

export function FriendProvider(props) {
    // const { getItem, setItem, removeItem } = useAsyncStorage("USER");
    const [friends, setFriends] = React.useState(undefined);
    const [users, setUsers] = React.useState(undefined);
    const [status, setStatus] = React.useState(undefined)

    // React.useEffect(() => {
    //     AsyncStorage.getItem('projects').then((json) => {

    //         if (json != null) {
    //             console.log(json)
    //             setProjects(JSON.parse(json));
    //         } else {
    //             setProjects(null);
    //         }
    //     });
    // }, []);

    // useProtectedRoute(user);




    const getFriends = (authtoken) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'GET',
            url: 'http://127.0.0.1:8000/friends/',
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
                setFriends(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }


    const getUsers = (authtoken) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'GET',
            url: 'http://127.0.0.1:8000/all-users/',
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
                setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    const addFriend = (authtoken, receiverId) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/add-friend/',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify({
                "user": receiverId
            })


        };

        axios(config)
            .then(async function (response) {
                console.log(response)
                // setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }


    const check_request_status = (authtoken, receiverId) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/check-if-friend/',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify({
                "user": receiverId
            })


        };

        axios(config)
            .then(async function (response) {

                setStatus(response.data)
                // setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }


    const accept_request = (authtoken, receiverId) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/accept-friend/',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify({
                "user": receiverId
            })


        };

        axios(config)
            .then(async function (response) {

                console.log(response.data)
                // setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    const delete_friend = (authtoken, receiverId) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/delete-friend/',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify({
                "user": receiverId
            })


        };

        axios(config)
            .then(async function (response) {

                console.log(response.data)
                // setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    const decline_friend = (authtoken, receiverId) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/decline-request/',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify({
                "user": receiverId
            })


        };

        axios(config)
            .then(async function (response) {

                console.log(response.data)
                // setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    const cancel_friend = (authtoken, receiverId) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/cancel-request/',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify({
                "user": receiverId
            })


        };

        axios(config)
            .then(async function (response) {

                console.log(response.data)
                // setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }



    return (
        <FriendContext.Provider
            value={{
                getFriends,
                friends,
                getUsers,
                users,
                addFriend,
                check_request_status,
                status,
                accept_request,
                delete_friend,
                decline_friend,
                cancel_friend
            }}
        >
            {props.children}
        </FriendContext.Provider>
    );
}


