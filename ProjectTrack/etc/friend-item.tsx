import { StyleSheet, TouchableOpacity, Text, View, Modal, Pressable, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useFriendContext } from '../context/friends'
import { useAuth } from '../context/auth'

const FriendItem = ({ id, name, email, authtoken }) => {
    const [open, setOpen] = React.useState(false)
    const { addFriend } = useFriendContext()
    const { check_request_status } = useFriendContext()
    const { status } = useFriendContext()
    const { accept_request } = useFriendContext()
    const { delete_friend } = useFriendContext()
    const { decline_friend } = useFriendContext()
    const { cancel_friend } = useFriendContext()


    function handleOnPress() {

        setOpen(!open)
        check_request_status(authtoken, id)

        console.log(status)
    }


    const renderText = () => {
        switch (status) {
            case 'sent':
                return (
                    <View>
                        <Text>Freind request is pending</Text>
                        <Button onPress={() => cancel_friend(authtoken, id)} title='Cancel Request' />
                    </View>
                );
            case 'received':
                return (
                    <View>
                        <Button onPress={() => accept_request(authtoken, id)} title='Accept' />
                        <Button onPress={() => decline_friend(authtoken, id)} title='Decline' />
                    </View>
                );
            case 'friends':
                return <Button onPress={() => delete_friend(authtoken, id)} title='Delete' />

            case 'Not Found':
                return <Button onPress={() => addFriend(authtoken, id)} title='Add' />

        }
    }




    return (
        <View>
            <TouchableOpacity style={styles.card} onPress={handleOnPress}>
                <Text>{name}</Text>

            </TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={true}
                visible={open}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Name:  {name}</Text>
                        <Text>E-Mail:  {email}</Text>

                        {renderText()}





                        <TouchableOpacity onPress={handleOnPress}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

export default FriendItem

const styles = StyleSheet.create({
    card: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        marginTop: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },

})