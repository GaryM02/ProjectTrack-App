import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker'

export default function DateModal({ placeholder, chooseDate, selectedDate }) {
    const [open, setOpen] = useState(false)


    function handleOnPress() {
        setOpen(!open)
    }



    return (
        <View>
            <TouchableOpacity onPress={handleOnPress}>
                <Text style={styles.button}>{placeholder}</Text>
                <Text style={styles.button}>{selectedDate}</Text>

            </TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={true}
                visible={open}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <DatePicker
                            mode='calendar'
                            selected={selectedDate}
                            onSelectedChange={date => chooseDate(date)}
                        // style

                        />


                        <TouchableOpacity onPress={handleOnPress}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    centeredView: {
        flex: 1,
        marginTop: 22,
        alignItems: 'center',
        justifyContent: 'center'
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
    button: {
        textAlign: 'center',
        height: 20,
        color: 'white',
        marginBottom: 10,
        padding: 0,
        fontWeight: 'bold'
    }
})