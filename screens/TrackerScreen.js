import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    Picker
} from "react-native";
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD62emNaspZMIXj3ayx6-FdB2WbW_7y6V8",
    authDomain: "agrowapps.firebaseapp.com",
    databaseURL: "https://agrowapps.firebaseio.com",
    projectId: "agrowapps",
    storageBucket: "",
    messagingSenderId: "308552675952"
  };
firebase.initializeApp(config);


class TrackerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            data: null,
            Trackers: null
        };
    }
    
    //============================DIVIDER=============================//
    //============================DIVIDER=============================//   
    //============================DIVIDER=============================//   

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        firebase.database().ref('user1/').on('value', (snapshot) => {
            this.setState({Trackers: snapshot.val()})
            console.log(snapshot.val())
        }) 

        axios.get(
        'https://api.apixu.com/v1/forecast.json?key=a978ff0bed8c49a6a81171630181707&q=' + this.state.latitude + "," + this.state.longitude + "&days=3"
            ).then((res) => this.setState({
                data: res.data
    
            })).catch(err => console.log(err))
        
    }

    //============================DIVIDER=============================//
    //============================DIVIDER=============================//   
    //============================DIVIDER=============================//   

    renderCurrWeather() {
        if ( this.state.data !== null ){
            
            return(
            <View>
            <Text style={{fontSize: 7, fontWeight: '300', color: 'white', marginLeft: 4}}>{"di " + this.state.data.location.lat + ", " + this.state.data.location.lon + " (" + this.state.data.location.region + ")"}</Text>
            <View style={{flexDirection: 'row', marginTop: -7}}>
                <View>
                    <Text style={{fontSize: 70, fontWeight: '100', color: 'white', marginLeft: 2}}>{this.state.data.current.temp_c.toFixed(0) + "°C"}</Text>
                    <Text style={{fontSize: 25, fontWeight: '100', color: 'white', marginLeft: 10, marginTop: -20}}>{this.state.data.current.temp_f + "°F"}</Text>
                </View>
                <View style={{marginLeft: '8%', marginTop: -10}}>
                    <View style={{flexDirection: 'row', marginTop: -10, marginLeft: -35, marginBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: "http:" + this.state.data.current.condition.icon}} style={{height: 40, width: 40}}/>
                        <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>{this.state.data.current.condition.text}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, fontWeight: '100', color: 'white', marginLeft: 10, marginTop: -10}}>Kelembapan: {this.state.data.current.humidity + "%"}</Text>
                        <Text style={{fontSize: 15, fontWeight: '100', color: 'white', marginLeft: 10, marginTop: 0}}>Awan: {this.state.data.current.cloud + "%"}</Text>
                        <Text style={{fontSize: 15, fontWeight: '100', color: 'white', marginLeft: 10, marginTop: 0}}>Tekanan: {this.state.data.current.pressure_mb + " mBar"}</Text>
                        <Text style={{fontSize: 15, fontWeight: '100', color: 'white', marginLeft: 10, marginTop: 0}}>Presipitasi: {this.state.data.current.precip_mm + " mm"}</Text>
                    </View>
                </View>
            </View>
            </View>
            )
        } else {
            return(
                <View style={{marginTop: 27, alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 13}}>Getting your location</Text>
                    <ActivityIndicator color={'white'} size={30}/>
                </View>
            )
        }
    }

    //============================DIVIDER=============================//
    //============================DIVIDER=============================//
    //============================DIVIDER=============================//        

    waterOrNot(data) {
        if(data.day.totalprecip_mm === 0){
            return(
                <View style={{alignItems: 'center', position: 'absolute', top: 90}}>
                    <MaterialCommunityIcons name="water" size={40} color={'white'}/>
                    <Text style={{fontSize: 10, fontWeight: '100', color: 'white'}}>Siram tanaman!</Text>
                </View>
            )}
        else if(data.day.totalprecip_mm < 0.5){
            return(
                <View style={{alignItems: 'center', position: 'absolute', top: 90}}>
                    <MaterialCommunityIcons name="water" size={40} color={'white'}/>
                    <Text style={{fontSize: 10, fontWeight: '100', color: 'white', textAlign: 'center'}}>{"Tetap siram,\nUntuk Berjaga-jaga"}</Text>
                </View>
            )}
        else if(data.day.totalprecip_mm >= 0.5){
            return(
                <View style={{alignItems: 'center', position: 'absolute', top: 90}}>
                    <MaterialCommunityIcons name="water-off" size={40} color={'white'}/>
                    <Text style={{fontSize: 10, fontWeight: '100', color: 'white'}}>Tidak perlu menyiram</Text>
                </View>
            )}
    }

    renderForeWeather() {
        if ( this.state.data !== null /*&& this.state.currdata !== null*/ ){
            return(
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft:0}}>
                        <Text style={{fontSize: 20, fontWeight: '100', color: 'white', marginTop: -10, flex: 1, textAlign: 'center'}}>Hari ini</Text>
                        <Text style={{fontSize: 20, fontWeight: '100', color: 'white', marginTop: -10, flex: 1, textAlign: 'center'}}>Besok</Text>
                        <Text style={{fontSize: 20, fontWeight: '100', color: 'white', marginTop: -10, flex: 1, textAlign: 'center'}}>Lusa</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft: 0}}>
                        { this.state.data.forecast.forecastday.map( data => {
                            return(
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Image source={{uri: "http:" + data.day.condition.icon}} style={{height: 50, width: 50}}/>
                                    <Text style={{fontSize: 14, fontWeight: '100', color: 'white', textAlign: 'center'}}>{data.day.condition.text}</Text>
                                    {this.waterOrNot(data)}
                                </View>
                            )
                        })}
                    </View>
                </View>
            )
        } else {
            return(
                <View style={{marginTop: 27, alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 13}}>Getting your location</Text>
                    <ActivityIndicator color={'white'} size={30}/>
                </View>
            )
        }
    }

    //============================DIVIDER=============================//
    //============================DIVIDER=============================//   
    //============================DIVIDER=============================//
    
    renderTrackers() {
        const trackers = !this.state.Trackers ? [] : Object.keys(this.state.Trackers).map( key => {
            return {
                key: key,
                obj: this.state.Trackers[key]
            }
        })
        if (this.state.Trackers !== null){
            return(
                <FlatList
                    data={trackers}
                    renderItem={({item}) =>
                    <View style={styles.predPlantsStyle}>
                        <View style={{flexDirection: 'row'}}>
                        <View>
                            <TextInput
                                style={{color: 'black', fontSize: 20, fontWeight: '600'}}
                                value={item.obj.PlantName}
                                underlineColorAndroid={'transparent'}    
                                onChangeText={(text) => {
                                    firebase.database().ref("user1/" + item.key + "/").update({
                                        PlantName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={{color: 'gray', fontSize: 14, fontWeight: '100', marginTop: -25}}
                                value={item.obj.PlantType}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    firebase.database().ref("user1/" + item.key + "/").update({
                                        PlantType: text
                                    })
                                }}
                                editable={false}
                            />
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', position: 'absolute', right: 10}}>
                            <Text style={{marginTop: 15, color: 'black'}}> Jenis Tanaman? </Text>
                            <View style={{borderWidth: 1, borderColor: '#ddd'}}>
                                <Picker
                                    selectedValue={item.obj.PlantType}
                                    style={{ height: 25, width: 130, borderWidth: 1, borderColor: 'black' , marginTop: 0}}
                                    onValueChange={(itemValue, itemIndex) => {
                                            firebase.database().ref("user1/" + item.key + "/").update({
                                                PlantType: itemValue
                                            })
                                        }
                                    }>
                                    <Picker.Item label={"Normal"} value={"Normal"} />
                                    <Picker.Item label={"Kaktus"} value={"Kaktus"} />
                                    <Picker.Item label={"Paku"} value={"Paku"} />
                                    <Picker.Item label={"Pohon"} value={"Pohon"} />
                                    <Picker.Item label={"Bunga"} value={"Bunga"} />
                                </Picker>
                            </View>
                        </View>
                        </View>
                        <View>

                        </View>
                    </View>
                    }
                    renderItem={({item}) =>
                    <View style={styles.predPlantsStyle}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <TextInput
                                    style={{color: 'black', fontSize: 20, fontWeight: '600'}}
                                    value={item.obj.PlantName}
                                    underlineColorAndroid={'transparent'}    
                                    onChangeText={(text) => {
                                        firebase.database().ref("user1/" + item.key + "/").update({
                                            PlantName: text
                                        })
                                    }}
                                />
                                <TextInput
                                    style={{color: 'gray', fontSize: 14, fontWeight: '100', marginTop: -25}}
                                    value={item.obj.PlantType}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText={(text) => {
                                        firebase.database().ref("user1/" + item.key + "/").update({
                                            PlantType: text
                                        })
                                    }}
                                    editable={false}
                                />
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', position: 'absolute', right: 10}}>
                                <Text style={{marginTop: 15, color: 'black'}}> Jenis Tanaman? </Text>
                                <View style={{borderWidth: 1, borderColor: '#ddd'}}>
                                    <Picker
                                        selectedValue={item.obj.PlantType}
                                        style={{ height: 25, width: 130, borderWidth: 1, borderColor: 'black' , marginTop: 0}}
                                        onValueChange={(itemValue, itemIndex) => {
                                                firebase.database().ref("user1/" + item.key + "/").update({
                                                    PlantType: itemValue
                                                })
                                            }
                                        }>
                                        <Picker.Item label={"Normal"} value={"Normal"} />
                                        <Picker.Item label={"Kaktus"} value={"Kaktus"} />
                                        <Picker.Item label={"Paku"} value={"Paku"} />
                                        <Picker.Item label={"Pohon"} value={"Pohon"} />
                                        <Picker.Item label={"Bunga"} value={"Bunga"} />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row', marginLeft: -15}}>
                                <Text style={{flex: 1, textAlign: 'center', fontSize: 12, color: 'black'}}>Terakhir kali</Text>
                                <Text style={{flex: 1, textAlign: 'center', fontSize: 12, color: 'black'}}>Harus melakukan</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: -15, marginTop: 5}}>
                                <Text style={{flex: 1, textAlign: 'center', fontSize: 10, color: '#1c1c1c'}}>Menyiram</Text>
                                <Text style={{flex: 1, textAlign: 'center', fontSize: 10, color: '#1c1c1c'}}>Memupuk</Text>
                                <Text style={{flex: 1, textAlign: 'center', fontSize: 10, color: '#1c1c1c'}}>Menyiram</Text>
                                <Text style={{flex: 1, textAlign: 'center', fontSize: 10, color: '#1c1c1c'}}>Memupuk</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>

                                
                                    <TextInput
                                        style={{color: 'gray', fontSize: 14, fontWeight: '100', marginTop: -10, marginLeft: 5}}
                                        value={item.obj.LastWateredH}
                                        //underlineColorAndroid={'transparent'}
                                        onChangeText={(text) => {
                                            firebase.database().ref("user1/" + item.key + "/").update({
                                                LastWateredH: text
                                            })
                                        }}
                                    />
                                    <Text>:</Text>
                                    <TextInput
                                        style={{color: 'gray', fontSize: 14, fontWeight: '100', marginTop: -10, marginLeft: 2}}
                                        value={item.obj.LastWateredM}
                                        //underlineColorAndroid={'transparent'}
                                        onChangeText={(text) => {
                                            firebase.database().ref("user1/" + item.key + "/").update({
                                                LastWateredM: text
                                            })
                                        }}
                                    />
                                

                                
                                    <TextInput
                                        style={{color: 'gray', fontSize: 14, fontWeight: '100', marginTop: -10, marginLeft: 20}}
                                        value={item.obj.LastFertD}
                                        //underlineColorAndroid={'transparent'}
                                        onChangeText={(text) => {
                                            firebase.database().ref("user1/" + item.key + "/").update({
                                                LastFertD: text
                                            })
                                        }}
                                    />
                                    <Text>/</Text>
                                    <TextInput
                                        style={{color: 'gray', fontSize: 14, fontWeight: '100', marginTop: -10, marginLeft: 0}}
                                        value={item.obj.LastFertW}
                                        //underlineColorAndroid={'transparent'}
                                        onChangeText={(text) => {
                                            firebase.database().ref("user1/" + item.key + "/").update({
                                                LastFertW: text
                                            })
                                        }}
                                    />
                                    <Text>/</Text>
                                    <TextInput
                                        style={{color: 'gray', fontSize: 14, fontWeight: '100', marginTop: -10, marginLeft: 0}}
                                        value={item.obj.LastFertY}
                                        //underlineColorAndroid={'transparent'}
                                        onChangeText={(text) => {
                                            firebase.database().ref("user1/" + item.key + "/").update({
                                                LastFertY: text
                                            })
                                        }}
                                    />

                                    {this.showWater(item)}
                                    {this.showFert(item)}
                                    

                            </View>
                        </View>
                    </View>
                    }
                />
            )
        } else {
            return(
            <View style={[styles.predPlantsStyle, {height: 100, alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={{color: 'black', fontSize: 13}}>Getting your Data</Text>
                <ActivityIndicator color={'black'} size={30}/>
            </View>
            )
        }
    }
    
    showWater(item){
        if(item.obj.LastWateredH !== "00" && item.obj.LastWateredM !== "00"){
            return(
            <Text style={{marginLeft: 30, textAlign: 'center'}}>
                {(parseInt(item.obj.LastWateredH) + 4).toString() + " : " + (parseInt(item.obj.LastWateredM) + 0).toString()}
            </Text>
            )
        }
    }

    showFert(item){
        if(item.obj.LastFertD !== "00" && item.obj.LastFertW !== "00" && item.obj.LastFertY !== "00"){
            return(
                <Text style={{marginLeft: 40, textAlign: 'center'}}>
                    {(parseInt(item.obj.LastFertD) + 7).toString() + " / " + (parseInt(item.obj.LastFertW) + 0).toString() + " / " + (parseInt(item.obj.LastFertY) + 0).toString()}
                </Text>
            )
        }
    }

    addButton() {
        const newTodoKey = firebase.database().ref().child('user1').push().key
        firebase.database().ref('user1').update({
            [newTodoKey]: {
                PlantName: "Nama Tanaman",
                LastWateredH: "00",
                LastWateredM: "00",
                LastFertD: "00",
                LastFertW: "00",
                LastFertY: "00",
                PlantType: "Normal",
                isSucculent: "Tidak"
            }
        })
    }

    render() {
        
        return (
            <ScrollView style={{backgroundColor: '#dedede'}}>

                <View style={{ marginBottom: 0, height: 210, width: '100%'}}>
                    <ImageBackground source={require('../Artwork/Gradient_Weather.png')} style={{width: '100%', height: '100%' }} /*imageStyle={{ borderRadius: 5 }}*/>
                        <View style={{padding: 15}}>
                            <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>Perkebunan James</Text>
                            <Text style={{fontSize: 14, fontWeight: '300', color: 'white', marginLeft: 2}}>Kondisi sekarang</Text>
                            {this.renderCurrWeather()}
                        </View>
                    </ImageBackground>
                </View>



                <View style={{ margin: 5, marginBottom: 0, height: 250, elevation: 14}}>
                    <ImageBackground source={require('../Artwork/Gradient_Forecast.png')} style={{width: '100%', height: 250, elevation: 14 }} imageStyle={{ borderRadius: 5, borderWidth: 1, borderColor: 'gray' }}>
                        <View style={{padding: 15}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>Ramalan Cuaca</Text>
                            {this.renderForeWeather()}
                        </View>
                    </ImageBackground>
                </View>

                {this.renderTrackers()}

                <TouchableOpacity onPress={() => this.addButton()}>
                    <ImageBackground source={require('../Artwork/Gradient.png')} style={{ height: 60, margin: 5, alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 5, borderWidth: 1, borderColor: '#c4c4c4' }}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Track another plant</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
export default TrackerScreen;

const styles = StyleSheet.create({
    predPlantsStyle: {
        margin: 5,
        marginBottom: 0,
        paddingLeft: 10,
        height: 160,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'column'
    }
});