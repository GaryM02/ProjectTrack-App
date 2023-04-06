import { View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/auth'
import { useProjectContext } from '../../../context/projects'
import ProjectItem from '../../../etc/project-item'
import { Stack } from 'expo-router'

const myprojects = () => {
    const { getProjects } = useProjectContext()
    const { projects } = useProjectContext()
    const { authtoken } = useAuth()
    const { get_token } = useAuth()

    useEffect(() => {
        get_token()
        getProjects(authtoken['access'])
    }, [])

    const renderItem = ({ item }) => {
        return <ProjectItem
            id={item.id}
            name={item.name}
            description={item.description}
            duration={item.duration}
            startdate={item.startdate}
            completiondate={item.completiondate}
            cost={item.cost}
            status={item.status}
            authtoken={authtoken['access']} />
    }

    return (
        <View>

            <FlatList
                data={projects}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default myprojects

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});