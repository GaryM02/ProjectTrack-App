
import React from "react";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'


const ProjectContext = React.createContext(null);

export function useProjectContext() {
    return React.useContext(ProjectContext);
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

export function ProjectProvider(props) {
    // const { getItem, setItem, removeItem } = useAsyncStorage("USER");
    const [projects, setProjects] = React.useState(undefined);

    const base_url = process.env.LOCAL_URL

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


    const createProject = (authtoken, user, name, description, duration, startdate, completiondate, cost, status) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        // dates need to be in y-m-d format
        const newStartdate = startdate.replace(/\//g, '-');
        const newCompletiondate = completiondate.replace(/\//g, '-');
        console.log(newStartdate, newCompletiondate)
        const data = {
            user,
            name,
            description,
            duration,
            startdate: newStartdate,
            completiondate: newCompletiondate,
            cost,
            status,
        }
        var config = {
            method: 'POST',
            url: `${base_url}/createproject/`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify(data)

        };

        axios(config)
            .then(async function (response) {
                console.log(response.data)
                // try {
                //     await AsyncStorage.setItem("current_user", JSON.stringify(response.data));
                // } catch (error) {
                //     console.log(error);
                // }
            })
            .catch(function (response) {
                console.log(response.data);
            });
    }

    const getProjects = (authtoken) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        var config = {
            method: 'GET',
            url: `${base_url}/projects/`,
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
                setProjects(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const delete_project = (authtoken, id) => {
        const token = 'JWT ' + authtoken//need to get token from auth.tsx
        //need to get user id to set ownership 
        //later on i will add migration to set relationship and who can view the project
        console.log(id)
        var config = {
            method: 'POST',
            url: `${base_url}/deleteproject/`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Authorization': token,
            },
            data: JSON.stringify({
                "id": id
            })

        };

        axios(config)
            .then(async function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <ProjectContext.Provider
            value={{
                createProject,
                getProjects,
                projects,
                delete_project
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
}


