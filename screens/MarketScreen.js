import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    FlatList,
    ActivityIndicator
} from "react-native";
import axios from 'axios';
import { database } from "../node_modules/firebase";

class MarketScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            Data: null
        }
    }

    componentDidMount() {
        let Data = []

        axios.get(
            'https://www.quandl.com/api/v3/datasets/TFGRAIN/CORN/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Jagung", Divider: 25.4}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PRICENPQ_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Beras", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PWHEAMT_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Gandum", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PCOFFOTM_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Kopi Arabika", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PCOFFROB_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Kopi Robusta", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PCOCO_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Kakao", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/WORLDBANK/WLD_TOBAC_US/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Tembakau", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PTEA_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Teh", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PORANG_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Jeruk", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PBANSOP_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Pisang", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/POLVOIL_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Minyak Zaitun", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PPOIL_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Minyak Kelapa", Divider: 1000}
            Data.push(res.data)
        }).catch(error => console.log(error))

        axios.get(
            'https://www.quandl.com/api/v3/datasets/ODA/PCOTTIND_USD/data.json?api_key=p9ggJtDYkTUe3UtwtioW&limit=2'
        ).then((res) => {
            res.data.dataset_data.transform = {Name: "Kapas", Divider: 1000}
            Data.push(res.data)
            console.log(Data)
            Data.sort()
            this.setState({Data: Data})
        }).catch(error => console.log(error))
    }

    renderItems() {
        if(this.state.Data !== null){
            return(
            <FlatList
                data={this.state.Data}
                renderItem={({item}) =>
                <View>
                    <ImageBackground source={require('../Artwork/Gradient_Gray.png')} style={{ height: 64, margin: 10, marginBottom: 5, padding: 10, paddingLeft: 20, elevation: 5, borderWidth: 0}} imageStyle={{  borderRadius: 5  }}>
                        <View style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{ fontSize: 20, color: 'white', fontFamily: 'roboto', fontWeight: '600' }}>{item.dataset_data.transform.Name}</Text>
                                <Text style={{ fontSize: 10, color: 'white' }}>{"\n /kg"}</Text>
                            </View>
                            {this.renderPrice(item)}
                        </View>
                    </ImageBackground>
                </View>
                }
            />
            )
        } else {
            return(
                <View style={{marginTop: 27, alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 13, marginBottom: 5}}>Getting market data</Text>
                    <ActivityIndicator color={'white'} size={30}/>
                </View>
            )
        } 
    }
    
    renderPrice(item){
        let Price = item.dataset_data.data[0][1]*28000/item.dataset_data.transform.Divider
        let Rate = ""

        let color= ''

        if (item.dataset_data.data[0][1]>item.dataset_data.data[1][1]){
            Rate = item.dataset_data.data[0][1]/item.dataset_data.data[1][1]
            Rate = "+" + Rate.toFixed(2)
            color = '#00FF88'
        } else {
            Rate = item.dataset_data.data[1][1]/item.dataset_data.data[0][1]*-1
            Rate = Rate.toFixed(2)
            color = '#FF0060'
        }
        return(
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{ fontSize: 18, color: 'white' }}> {"Rp " + Price.toFixed(0)} </Text>
                <Text style={{ fontSize: 13, color: color }}> {Rate + "%"} </Text>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#1b2125'}}>
                {this.renderItems()}
            </ScrollView>
        );
    }
}
export default MarketScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceCardStyle: {
        margin: 5,
        marginBottom: 0,
        height: 100,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        backgroundColor: '#456437'
    }
});
