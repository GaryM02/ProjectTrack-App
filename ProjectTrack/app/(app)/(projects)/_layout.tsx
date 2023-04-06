import { Stack } from "expo-router";
import React from "react";
import { ProjectProvider } from "../../../context/projects";
import { StatusBar } from "react-native";

const ProjectLayout = () => {
    return (
        <ProjectProvider>
            <Stack screenOptions={{
                headerTransparent: false,
                headerTitleStyle: {
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'white'
                },
                headerStyle: {
                    backgroundColor: 'black'
                }
            }}>

                <Stack.Screen name='projects' options={{
                    title: 'Projects',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }} />
                <Stack.Screen name='myprojects' options={{
                    title: 'My Projects',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }} />
                <Stack.Screen name='createproject' options={{
                    title: 'New Project',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }} />

            </Stack>

        </ProjectProvider>
    )
}

export default ProjectLayout