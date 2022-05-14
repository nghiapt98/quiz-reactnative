import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, Image, FlatList,
    View, StyleSheet, Text, TouchableOpacity,
    Button, ActivityIndicator, Alert, Animated
} from 'react-native'
import { Done } from './Done'


export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(true);
    const [text, setText] = useState('Đâu là máy bay ?');
    const [a, setA] = useState(2);
    const [b, setB] = useState(0);

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, 3],
        outputRange: ['0%', '100%']
    })


    useEffect(() => {
        getApi()
        return () => {
        }
    }, [])

    const getApi = () => {
        const api = "https://6278d62ed00bded55adf77f0.mockapi.io/api/game"
        fetch(api)
            .then((res) => res.json())
            .then((resJson) => setData(resJson)).finally(() => setLoading(false))
    }
    const clickItem = (item) => {
        const newData = data.map((e) => {
            if (item.id == e.id) {
                return {
                    ...e,
                    selected: true
                }
            }
            return {
                ...e,
                selected: false
            }

        })

        setData(newData);
        console.log(data)

    }

    const renderProgressBar = () => {
        return (
            <View style={{
                marginTop: 20,
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: '#66d9ff'
                }, {
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }

    const next2 = () => {
        setA(a + 1);
        const api = "https://6278d62ed00bded55adf77f0.mockapi.io/api/cau" + a;
        fetch(api)
            .then((res) => res.json())
            .then((resJson) => setData(resJson)).finally(() => setLoading(false))
        if (a == 2) {
            setText("Đâu là lá cờ Việt Nam?");
        } else if (a == 3) {
            setText("Đâu là cầu thủ Ronaldo?");
        }

    }
    const end = () => {
        setB(b + 1);
        if (a >= 4) {
            Animated.timing(progress, {
                toValue: b + 1,
                duration: 1000,
                useNativeDriver: false
            }).start();
            setInterval(() => {
                navigation.navigate('Done')
            }, 1500)
        } else {
            Animated.timing(progress, {
                toValue: b + 1,
                duration: 1000,
                useNativeDriver: false
            }).start();
            next2();
        }
        
    }

    const check = (data) => {
        const a = data.find((e) => {
            return e.answer == "true"
        })
        if (a.selected == true && a.answer == "true") {
            Alert.alert(
                "Chúc mừng bạn đã đoán đúng",
                "Bạn có muốn đi tiếp ?",
                [
                    {
                        text: "Cancel"

                    },
                    {
                        text: "Ok",
                        onPress: () => end(),
                        style: "OK",
                    },
                ],
            );
            setChange(true)

        } else if (data[0].selected == null || data[1].selected == null ||
            data[2].selected == null || data[3].selected == null) {
            alert('Vui lòng chọn đáp án');
        }
        else {
            setChange(false)
            alert("Bạn đã đoán sai, vui lòng chọn lại")
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={(
                        change ? [style.containerItem, {
                            backgroundColor: item.selected ? '#b3ffb3' : 'white'
                        }] :
                            [style.containerItem, {
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
        <View style={{ flex: 1 }}>
            {loading ? <ActivityIndicator /> : (
                <View style={{ flex: 1 }}  >
                    <View style={{ flex: 3 }}>
                        {renderProgressBar()}
                        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 30,fontWeight:'bold' }}>{text}</Text>
                        <FlatList
                            data={data}
                            numColumns={2}
                            renderItem={renderItem}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity style={style.next} onPress={next2}>
                            <Text style={{ lineHeight: 50 }}>Bỏ qua</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.check}
                            onPress={() => check(data)}>
                            <Text style={{ lineHeight: 50 }}>Kiểm tra</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
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