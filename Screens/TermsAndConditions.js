import React from 'react'
import { View, Text , StyleSheet , Linking} from 'react-native'

import { useNavigation , useRoute } from '@react-navigation/native';

const TermsAndConditions = () => {

    const navigation = useNavigation()
    const route = useRoute()

    return (
        <View>
          
            <Text style = {styles.text}>Best practices to be followed:</Text>
            <Text style = {styles.text}>
            1) Please respect community members 
            </Text> 
            <Text style = {styles.text}>
            2) All items being uploaded for community should be in good condition         
            </Text>   
            <Text style = {styles.text}>
            3) No Descrimination whatsoever         
            </Text>  
            <Text style = {styles.text}>
            4) Lowballing can lead to bad reputation.       
            </Text>   
            <Text style = {styles.text}>
            P.S - Non Adherence to any of the above rules can lead to suspension of the account    
            </Text>   
            <Text style = {styles.text}>For T&C , refer to the below link : </Text>
            <Text style={{color: 'blue' , padding : 10}}
                onPress={() => Linking.openURL('https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/MISHFIT-Terms.docx')}>
                Terms and Conditions
            </Text>

         
        </View>
    )
}

const styles = StyleSheet.create({
    text : {
        padding : 10 ,
        color : "#E64852"

    }
})

export default TermsAndConditions
