import React from 'react'
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View, FlatList , Image } from 'react-native'
import axios from 'axios'
import { AuthContext , theme , background, LoadingPage, ErrorPage, URL, borderColor, width, height} from './exports'
import { useNavigation } from '@react-navigation/native'
import { header1 } from './styles'
import { ModernHeader } from "@freakycoder/react-native-header-view";


const Brands = () => {

    const navigation = useNavigation()

    const [brandsData,setBrandsData] = React.useState([])
    const [firstLoaded,setFirstLoaded]=React.useState(false)
    const [userId] = React.useContext(AuthContext)
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [refreshing,setRefreshing] = React.useState(false)

    const getAllBrands = () => {
        axios.get(URL + "/brands/getfollowingbrands", {
            params: {
            user_id : userId.slice(1,13)
            }
          }, {timeout : 5000})
        .then(res => res.data)
        .then(function (responseData) {
          //  console.log(responseData)
            setBrandsData(responseData)
            setLoading(false)
            setFirstLoaded(true)
        })
        .catch(function (error) {
          console.log(error);
          setError(true);      
        })
    }

    React.useEffect(() => {
        setError(false)
        setLoading(true)
        getAllBrands()
        
    },[])

    const onFollow = (item, following) => {



        const body = {
            "user_brand_id": userId.slice(1,13) + "_" + item.brand_id,
            "user_id": userId.slice(1,13),
            "brand_id": item.brand_id,
            "brand_name": item.brand_name,
            "brand_image": item.brand_image,
            "follow": following ? 1 : 0 
          }
    
          console.log("BODY" , body)
    
        axios({
          method: 'post',
          url: URL + '/brands/getuserbrandinfo',
          data: body
        })
        .then(res => {
          
          })
        .catch((e) => console.log(e))
    
    }

    const BrandItem = ({item}) => {
        const [clicked,setClicked] = React.useState(false)
        const [brandFollowing,setBrandFollowing] = React.useState(item.following == 0 ? false : true)
        return ( 
                <TouchableOpacity 
                    style = {{ 
                        flexDirection : 'row' , alignItems : 'center',padding : 10,
                        marginLeft : 0, elevation : 1, borderColor : "#666"
                    
                    }}
                    onPress = {()=> navigation.navigate("FeedSearch",{varValue : "brand_id" , id : item.brand_id, value : item.brand_name  })} >
                    <View style = {{marginRight : 10 , width :50, height : 50 , backgroundColor : '#EEE'}}>
                    {item && item.brand_image && item.brand_image != "None" && item.brand_image != "" ?
                        <Image source = {{uri: item.brand_image ? item.brand_image : "None"}} style = {{width :50, height : 50  }} /> : null}
                    </View>
                    <View style = {{marginRight : 10 , flex : 1 }}>
                        <Text style = {{fontWeight : 'bold'}}>{item.brand_name ? item.brand_name : ""}</Text> 
                        <Text>{item.content.length > 50 ? item.content.slice(0,50) + "..." : item.content}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress = {()=>{
                            setBrandFollowing(!brandFollowing)
                            onFollow(item, !brandFollowing)}}
                        // disabled = {clicked || item.following}
                        style = {{borderRadius : 2 , padding : 5, borderRadius : 5, paddingHorizontal : 15,
                        backgroundColor : brandFollowing ? background : theme,}}>
                        <Text style = {{color : brandFollowing ? "#666" : "#FFF"}}>{brandFollowing ? "Unfollow" : "Follow"}</Text> 
                    </TouchableOpacity>
                </TouchableOpacity>
        )
    }

    const items = ({item,index}) => (
        <View>
            <BrandItem item = {item}/>
        </View>
        
    )

  
          
    

    return (
        <View style = {{}}>
            <View style = {header1.headerView}>
                <ModernHeader
                        title="Brands"
                        height = {50}
                        titleStyle = {header1.headerText}
                        backgroundColor= {'white'}
                        leftIconColor = {borderColor}
                        leftIconOnPress={() => navigation.popToTop()}
                        leftIconComponent = {
                        <View>
                            <Image style={{height : 30 , width : 30}}
                                source={require('../assets/LogoTransparentSolidColorLine.png')}
                            />
                        </View>
                        }
                        rightDisable
                        />
            </View>
            <View style = {{width : width, height : height}}>
               { error ? <ErrorPage duration = {3000} /> :
                firstLoaded ? 
                <FlatList 
                    keyExtractor={item => item.brand_id.toString()} 
                    style = {{}}
                    contentContainerStyle = {{paddingRight : 5 , paddingLeft : 5,}}
                    showsVerticalScrollIndicator={false}
                    data = {brandsData}            
                    renderItem = {items}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getAllBrands} />}
                /> : <LoadingPage duration = {3000}/>}
            </View>
        </View>
    )
}

export default Brands

const styles = StyleSheet.create({})
