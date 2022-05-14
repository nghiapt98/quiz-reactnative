import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';

function stringNullOrEmpty (string){
    if(string === null || string === undefined){
        return false;
    }else if(string.length === 0){
        return false
    }
    return true;
}

export function Login({ navigation }) {

    const [user, setUser] = useState(null);
    const [pass, setPass] = useState(null);

    const validate=()=> {
       if(stringNullOrEmpty(user) && stringNullOrEmpty(pass)) {
        console.log(user,pass);
        if (user == 'admin' && pass == 'admin') {
            alert('Dang nhap thanh cong');
            navigate()
        } else {
            alert("Khong thanh cong")
        }
       }else{
           alert('Ban phai nhap User va Password')
       }
    }
    function navigate() {
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={style.container} >
            <Text style={style.textLogin} >LOGIN</Text>
            <View style={style.containerInput}>
                <TextInput
                    style={style.inputText}
                    onChangeText={(user) => setUser(user)}
                    placeholder='Email hoặc tên đăng nhập'
                />
                <TextInput
                    secureTextEntry={true}
                    onChangeText={(pass) => setPass(pass)}
                    style={style.inputText}
                    placeholder='Mật khẩu' />
            </View>
            <TouchableOpacity style={style.btn} onPress={()=>validate()}>
                <Text style={style.textBtnLogin}>Đăng nhập</Text>
            </TouchableOpacity>
            <Image source={{ uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png' }}
                style={{ width: 200, height: 200 }}
            />


        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 150
    },
    textLogin: {
        fontSize: 30
    },
    containerInput: {
        marginTop: 20,
    },
    inputText: {
        marginTop: 20,
        height: 45,
        width: 350,
        marginLeft: 10,
        paddingLeft: 20,
        borderColor: '#C8C8C8',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
    },
    textBtnLogin: {
        fontSize: 25,
        lineHeight: 45,
        color: 'white',
        textAlign: 'center'
    },
    btn: {
        marginTop: 20,
        height: 45,
        width: 350,
        marginLeft: 10,
        paddingLeft: 20,
        borderColor: '#C8C8C8',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#80dfff',
    }

})