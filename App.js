import * as React from 'react';
import {SafeAreaView,Text} from 'react-native';
import {Login} from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Home  from './Home';
import {Cau2} from './Cau2';
import {Cau3} from './Cau3';
import {Done} from './Done';
const stack = createNativeStackNavigator();
export default  App = ()=>
{
  return(
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown :false}}
            />
            <stack.Screen
                name="Home"
                component={Home}
            />      
             <stack.Screen
           name="Done"
           component={Done}
           options={{title : "Done"}}/>
             
        </stack.Navigator>
      
    </NavigationContainer>
  )
}