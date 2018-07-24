import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { createStackNavigator, createTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import TrackerScreen from './screens/TrackerScreen';
import MarketScreen from './screens/MarketScreen';
import DictionaryScreen from './screens/DictionaryScreen';

class App extends Component {
  render() {
    return (
      <AppStackNavigator/>
    );
  }
}
export default App;

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: createTabNavigator({
      Tracker: {
        screen: TrackerScreen,
        navigationOptions: {
          tabBarIcon: () => (
            <Ionicons name="ios-leaf" size={25} color={'white'} />
          )
        }
      },
      Market: {
        screen: MarketScreen,
        navigationOptions: {
          tabBarIcon: () => (
            <SimpleLineIcons name="graph" size={25} color={'white'} />
          )
        }
      },
      Dictionary: {
        screen: DictionaryScreen,
        navigationOptions: {
          tabBarIcon: () => (
            <Ionicons name="ios-book" size={25} color={'white'} />
          )
        }
      },
    },
    {
      tabBarOptions: {
        activeTintColor: '#fff',
        labelStyle: {
          fontSize: 8,
          marginBottom: 1
        },
        iconStyle: {
          marginBottom: -6
        },
        style:{
          backgroundColor: '#183224'
        },
        showIcon: true
      }
    }),
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <View style={{width: 100, flex: 1}}>

        </View>
      ),
      headerRight: (
          <View style={{width: 100, flex: 1}}>

          </View>
      ),
      headerTitle: (
        <View style={{width: '100%',marginTop: 10, alignItems: 'center'}}>
          <Image source={require('./Artwork/Logo_Small_White.png')} resizeMode={'contain'} style={{height: 40}}/>
        </View>
      ),
      headerStyle: {
          height: 45,
          elevation: 0,
          backgroundColor: '#183224',
      },
  })
  }
})

