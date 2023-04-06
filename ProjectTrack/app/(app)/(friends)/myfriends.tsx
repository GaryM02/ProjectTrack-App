import { View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/auth'
import { useFriendContext } from '../../../context/friends'

import FriendItem from '../../../etc/friend-item'

const myfriends = () => {
    const { getFriends } = useFriendContext()
    const { friends } = useFriendContext()

    const { authtoken } = useAuth()
    const { get_token } = useAuth()


    useEffect(() => {
        get_token()
        getFriends(authtoken['access'])
    }, [])

    const renderItem = ({ item }) => {
        // get all users to see
        return <FriendItem
            id={item.id}
            name={item.name}
            email={item.email}
            authtoken={authtoken['access']}
        />
    }

    return (
        <View>
            <FlatList
                data={friends}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default myfriends

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