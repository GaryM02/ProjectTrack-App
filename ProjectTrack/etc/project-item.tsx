import { StyleSheet, TouchableOpacity, Text, View, Modal, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useProjectContext } from '../context/projects'
import { useAuth } from '../context/auth'

const ProjectItem = ({ id, name, description, duration, startdate, completiondate, cost, status, authtoken }) => {
    const [open, setOpen] = React.useState(false)
    const { delete_project } = useProjectContext()



    function handleOnPress() {

        setOpen(!open)
    }

    const renderText = () => {
        switch (status) {
            case 0:
                return (
                    <Text>Uncomplete</Text>
                );
            case 1:
                return (
                    <Text>Complete</Text>
                );
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
                        <Text style={styles.text}>Name: {name}</Text>
                        <Text style={styles.text}>Description: {description}</Text>
                        <Text style={styles.text}>Duration: {duration}</Text>
                        <Text style={styles.text}>Start Date: {startdate}</Text>
                        <Text style={styles.text}>Completion Date: {completiondate}</Text>
                        <Text style={styles.text}>Cost: €{cost}</Text>
                        <Text style={styles.text}>Status: {renderText()}</Text>

                        <Button onPress={() => delete_project(authtoken, id)} title='Delete' />

                        <TouchableOpacity onPress={handleOnPress}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

export default ProjectItem

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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    }

})