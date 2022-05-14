import * as React from 'react';
import {SafeAreaView,Text} from 'react-native';
export const Done = () =>{
    return(
        <SafeAreaView>
            <Text style={{fontSize:40,textAlign: 'center',
            alignContent:'center',marginTop:50,color:'red' , fontWeight:'bold'}}>Chúc mừng bạn đã hoàn thành</Text>
        </SafeAreaView>
    )
}