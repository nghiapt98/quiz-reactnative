import React, {useState,useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image,ActivityIndicator  } from 'react-native';
export function Cau3({navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change ,setChange] = useState(true);
    useEffect(() => {
        getApi()
       
        return() =>{

        }
    },[])
    const getApi = () => {
        const api = "https://6278d62ed00bded55adf77f0.mockapi.io/api/cau3"
        fetch(api)
            .then((res) => res.json())
            .then((resJson) => setData(resJson))
            .finally(() => setLoading(false));

    }
    const clickItem = (item) =>{
        const newData = data.map((e)=>{
            if (item.id == e.id) {
                return {
                    ...e,
                    selected:true
                }        
            }
                return{
                    ...e,
                    selected:false
                }
        })
        setData(newData);
        console.log(data);
    }
    const check = (data) => {
        if (data[2].selected == true && data[2].name == 'Ronaldo') {
            alert('Bạn đã chọn đúng ')
            setChange(true)
            // navigation.navigate('Cau3')
            
        } else {
           setChange(false)
            alert('Bạn đã chọn sai, vui lòng chọn lại ')
        }
    }
    

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={(
                        change ? [style.containerItem, {
                            backgroundColor: item.selected ? '#b3ffb3' : 'white'
                        }] : [style.containerItem, {
                            backgroundColor: item.selected ? 'red' : 'white'
                        }]
                    )}
                    onPress={() => clickItem(item)}
                >
                    <Image style={style.imageItem} source={{ uri: item.url }} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View>
            {
                loading ? <ActivityIndicator /> : (
                    <View>
                        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 30 }}>Đâu là cầu thủ Ronaldo ? </Text>
                        <FlatList
                            data={data}
                            numColumns={2}
                            renderItem={renderItem}>
                        </FlatList>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity style={style.next}>
                            <Text style={{ lineHeight: 50 }}>Bỏ qua</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.check}
                            onPress={() => check(data)}>
                            <Text style={{ lineHeight: 50 }}>Kiểm tra</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                )
            }
        </View>
    )
}
const style = StyleSheet.create({
    containerItem: {
        padding: 10,
        flex: 1,
        width: 180,
        height: 180,
        marginTop: 50,
        marginLeft: 10,
        justifyContent: 'center',
        shadowColor: '#1111',
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowColor: 'grey',
        borderRadius: 10,
    },
    imageItem: {
        borderRadius: 5,
        width: 160,
        height: 160,
        alignItems: 'center',

    },
    containerFooter: {
        margin: 10,
        flexDirection: 'row',


    },
    next: {
        flex: 1,
        height: 50,
        marginStart: 20,
        backgroundColor: 'orange',

        border: 2,
        borderRadius: 20,
        alignItems: 'center'
    },
    check: {

        borderRadius: 20,
        flex: 1,
        width: 100,
        height: 50,
        marginEnd: 20,
        backgroundColor: '#40a832',
        alignItems: 'center'
    }
})