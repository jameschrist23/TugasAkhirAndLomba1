import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView
} from "react-native";
import * as firebase from 'firebase'

class DictionaryScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            DictData: null
        }
    }

    componentDidMount() {
        firebase.database().ref('dictionary/').on('value', (snapshot) => {
            this.setState({DictData: snapshot.val()})
            console.log(snapshot.val())
        }) 
    }

    renderDictionary() {
        const DictData = !this.state.DictData ? [] : Object.keys(this.state.DictData).map( key => {
            return {
                Text: key,
                Arti: this.state.DictData[key].Arti
            }
        })
        if (this.state.DictData !== null){
            return(
                <FlatList
                    data={DictData}
                    renderItem={({item}) =>
                    <View style={{ margin: 10, marginTop: 3, padding: 10, paddingLeft: 20, elevation: 5, borderWidth: 0, backgroundColor: 'white'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={{ fontSize: 20, color: 'black', fontFamily: 'roboto', fontWeight: '600' }}>{item.Text}</Text>
                                <Text style={{ fontSize: 14, color: 'black', fontFamily: 'roboto', fontWeight: '400', padding: 10 }}>{item.Arti}</Text>
                            </View>
                        </View>
                    </View>
                    }
                />
            )
        } else {
            return(
            <View style={[styles.predPlantsStyle, {height: 100, alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={{color: 'black', fontSize: 13}}>Getting Dictionary Data</Text>
                <ActivityIndicator color={'black'} size={30}/>
            </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{height: 10}}/>
                {this.renderDictionary()}
            </ScrollView>
        );
    }
}
export default DictionaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});