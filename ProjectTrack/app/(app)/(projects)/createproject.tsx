import { TextInput, Text, View, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProjectContext } from '../../../context/projects'
import { useAuth } from '../../../context/auth'
import { Stack } from 'expo-router'

// datemodal
import DateModal from '../../../etc/dateModal'

export default function createproject() {

    const { authtoken } = useAuth()
    const { get_token } = useAuth()
    const { user } = useAuth()


    //need to get user id and auth token
    const { createProject } = useProjectContext()
    const [name, setName] = useState('')
    const [description, setDes] = useState('')
    const [duration, setDur] = useState('')
    const [startdate, setStartdate] = useState('')
    const [completiondate, setCompletiondate] = useState('')
    const [cost, setCost] = useState('')
    const [status, setStatus] = useState('')
    // const [updated, setUpdated] = useState('null')

    // datemodal

    const chooseStartDate = (newdate) => {
        setStartdate(newdate)
        console.log(newdate)
    }
    const chooseCompletionDate = (newdate) => {
        setCompletiondate(newdate)
        console.log(newdate)
    }

    useEffect(() => {
        get_token()
    }, [])


    return (

        <View style={styles.container}>
            <View style={styles.container}>
                <TextInput
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder={'Name'}
                    placeholderTextColor={'white'}
                    style={styles.input}
                />
                <TextInput
                    value={description}
                    onChangeText={text => setDes(text)}
                    placeholder={'Description'}
                    placeholderTextColor={'white'}
                    style={styles.input}
                />
                <TextInput
                    value={duration}
                    onChangeText={text => setDur(text)}
                    placeholder={'Duration'}
                    placeholderTextColor={'white'}
                    style={styles.input}
                />
                {/* <TextInput
                    value={startdate}
                    onChangeText={text => setStartdate(text)}
                    placeholder={'Start Date'}
                    style={styles.input}
                /> */}
                <DateModal placeholder='Select Start-Date' chooseDate={chooseStartDate} selectedDate={startdate} />
                {/* <TextInput
                    value={completiondate}
                    onChangeText={text => setCompletiondate(text)}
                    placeholder={'Completion Date'}
                    style={styles.input}
                /> */}
                <DateModal placeholder='Select Completion-Date' chooseDate={chooseCompletionDate} selectedDate={completiondate} />
                <TextInput
                    value={cost}
                    onChangeText={text => setCost(text)}
                    placeholder={'Cost'}
                    placeholderTextColor={'white'}
                    style={styles.input}
                />
                <TextInput
                    value={status}
                    onChangeText={text => setStatus(text)}
                    placeholder={'Status'}
                    placeholderTextColor={'white'}
                    style={styles.input}
                />

                {/* <TextInput
                    value={updated}
                    onChangeText={text => setUpdated(text)}
                    placeholder={'updated'}
                    style={styles.input}
                /> */}



                <Pressable
                    onPress={() => createProject(
                        authtoken['access'],
                        user.id,
                        name,
                        description,
                        duration,
                        startdate,
                        completiondate,
                        cost,
                        status,
                        // updated
                    )}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'black',
                        },
                    ]}>
                    <Text style={styles.text}>Create Project</Text>
                </Pressable>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 50,
        color: 'white',
        borderRadius: 5,
    },
    text: {
        color: 'white'
    }
});