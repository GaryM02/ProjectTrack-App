import { View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/auth'
import { useFriendContext } from '../../../context/friends'

import FriendItem from '../../../etc/friend-item'

const findFriends = () => {
    const { getUsers } = useFriendContext()
    const { users } = useFriendContext()

    const { authtoken } = useAuth()
    const { get_token } = useAuth()


    useEffect(() => {
        get_token()
        getUsers(authtoken['access'])
    }, [])

    const renderItem = ({ item }) => {
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
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default findFriends

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