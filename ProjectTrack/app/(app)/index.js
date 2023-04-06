import { Text, View } from "@bacons/react-views";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar
} from "react-native";
import {
  LineChart,

} from "react-native-chart-kit";
import { useAuth } from "../../context/auth";
import { LinearGradient } from 'expo-linear-gradient'



export default function App() {
  const { refresh_token } = useAuth()

  useEffect(() => {
    refresh_token()
  }, [])

  return <Index />;
}

function Index() {

  return (
    // <>
    //   <Footer />
    // </>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <LinearGradient
        colors={['#A644FE', '#3173CE', '#A644FE']}
        start={{
          x: 0,
          y: 0
        }}
        end={{
          x: 1,
          y: 1
        }}
        style={styles.container}>
        <View>
          <Text style={styles.text}>ProjectTrack</Text>
        </View>

      </LinearGradient>


    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})





