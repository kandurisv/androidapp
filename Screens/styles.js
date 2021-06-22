import {StyleSheet, Dimensions} from 'react-native'
import { borderColor,theme,background } from './exports'

const {width,height} = Dimensions.get('screen')

export const header = StyleSheet.create({
    headerView : {
        
    },
    headerText : {
        fontSize: 18 , 
        color : theme
    },
})

export const header1 = StyleSheet.create({
    headerView : {

    },
    headerText :{
        fontWeight : 'bold',
        fontSize: 18 , 
        color : borderColor,
    }
})

export const home = StyleSheet.create({
    container : {
        flex : 1 , 
        backgroundColor : background
    },
    //userDetails
    userDetailsContainer : {

    },
    userDetailsElementContainer : {
        flexDirection : 'row',
        borderRadius : 5,
        borderWidth : 1,
        borderColor : 'black',
        padding : 5 , 
        margin : 5
    },
    userDetailsElementText : {
        margin : 10,
        flex : 1, 
        textAlign : 'center',
    },
    userDetailsElementTextInput : {
        flex : 1, 
        borderRadius : 5,
        borderBottomWidth : 1,
        borderColor : '#AAA',
        textAlign : 'center',
        width :width*0.5
    },
    userDetailsGenderView : {

    },
    userDetailsGenderHeading : {
        fontSize : 14, 
        fontStyle : "italic" , 
        color : 'black' , 
        margin : 10
    },
    userDetailsGenderRadioContainerStyle : {
        justifyContent : 'center' , 
        alignItems : 'center' , 
        width : Dimensions.get("window").width,
        alignItems : 'center'
    },
    userDetailsGenderRadioButtonContainerStyle: {
        borderWidth : 1, 
        borderColor : '#AAA' ,
        padding: 5 , 
        borderRadius : 10 ,     
        height : 30,
        margin : 10,
        marginTop : 0 ,
        width : 100
    },
    userDetailsGenderRadioButtonTextStyle: {
        fontSize : 12
    },
    userDetailsGenderRadioButtonContainerActiveStyle: {
        backgroundColor : theme
    },
    userDetailsGenderRadioButtonContainerInactiveStyle: {

    },
    userDetailsGenderRadioButtonTextActiveStyle: {

    },
    userDetailsGenderRadioButtonTextInactiveStyle: {

    },
    userDetailsSubmitContainer : {
        alignItems : 'flex-end'
    },
    userDetailsSubmitButton : {
        backgroundColor : theme,
        width : width*0.5,
        marginTop : 20,
        alignItems : 'center',
        padding : 10,
        borderRadius : 10,
        marginRight : 10,
    },
    userDetailsSubmitText : {
        color : background,
        textAlign : 'center'
    },
    //ScrollableMainView
    mainViewScrollableContentContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        marginBottom : 60,
    },
    mainViewScrollableContainer : {
        marginBottom : 60,
    },
    mainViewHeroBannerContainer : {
        backgroundColor : background,
        flex : 1,
        width : width,
        height : width * 0.8,
    },
    mainViewHeroBannerImage : {
        width : width,
        height : width * 0.8,
    },
    mainViewCarouselContainer : {
        width,
        margin : 10 , 
        flex : 1,
    },
    mainViewCarouselTitle : {
        fontWeight : 'bold',
        fontSize : 20,
        margin : 10,
        marginLeft : 20,
    },
    mainViewCarouselChild : {
        marginLeft : 0
    },
    mainViewCarouselScrollableItem : {

    },
    mainViewCarouselScrollableItemContainer : {
        flex: 1,
        height : 100,
        width : 100,
        justifyContent : 'center',
        alignItems :'center',
        borderRadius : 10,
        marginLeft : 10, 
        marginTop : 5,
        backgroundColor : '#666',
        opacity : 0.8,
        position : 'relative'
    },
    mainViewCarouselScrollableItemButton : {

    },
    mainViewCarouselScrollableItemImageBackground : {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        height : 100,
        width : 100,
        borderRadius : 10,
        opacity : 0.4,
        backgroundColor : 'black',
    },
    mainViewCarouselScrollableItemTextContainer : {
        ...StyleSheet.absoluteFillObject,
    },
    mainViewCarouselScrollableItemText : {
        color: "white",
        fontSize: 12,
        fontWeight: "400",
        textAlign: "center",
        marginTop : 10
    },


})

export const addPost = StyleSheet.create({
    container : {},
})

export const user = StyleSheet.create({
    container : {
        flex : 1
    },
    //mainView
    mainViewContentContainer : {

    },
    mainViewContainer : {
        flex: 1
    },
    //main view cover picture
    mainViewCoverContainer : {
        width : width , 
        height : 180,
        backgroundColor : "#ddd",
        justifyContent :'center',
        alignItems :'center',

    },
    mainViewCoverImage : {
        width : width , 
        height : 180,

    },
    //main view display picture
    mainViewDisplayContainer : {
        position : 'absolute',
        top : 140,
        left : 20,
    },
    mainViewDisplayImage : {
        width : 80,
        height : 80,
    },
    //main View Details
    mainViewDetailsContainer : {
        flexDirection : 'row',
        marginTop : 40,
        justifyContent : 'center'},
    mainViewDetailsUserNameContainer : {
        alignItems : 'center',
        padding : 5,
        marginLeft : 0,
        width : 120},
    mainViewDetailsUserNameText : {
        padding : 8,
        textAlign : 'center',
        fontWeight : 'bold',
        fontSize : 13},
    mainViewDetailsSummaryContainer : {
        flex : 1 ,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center'
    },
    mainViewDetailsSummaryButtonContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor : "#ddd"
    },
    mainViewDetailsSummaryValue : {
        marginRight : 15,
        fontWeight : 'bold'
    },
    mainViewDetailsSummaryName : {
        marginTop : 2,
        marginRight : 15,
        fontSize : 12
    },
    //main view edit button
    mainViewEditProfileContainer : {

    },
    mainViewEditProfileButton : {
        backgroundColor : "#eee",
        margin : 10 ,
        borderRadius : 5,
        padding : 5,
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : "#999",
        shadowColor : "#aaa"
    },
    mainViewEditProfileText : {
        fontWeight : 'bold',
        shadowOpacity : 2
    },
    // my posted reviews view
    myPostedReviewsContainer : {

    },
    myPostedReviewsHeading : {
        fontWeight : 'bold',
        fontSize : 18,
        marginLeft : 20,
        margin : 5
    },
    myPostedReviewsEmptyContainer : {

    },
    myPostedReviewsEmptyText : {
        fontSize : 16
    },
    myPostedReviewsItemContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor : "#ddd"
    },
    myPostedReviewsItemImageBackground : {
        flex: 1,
        width : width * 0.45,
        height : width * 0.45,
        borderColor : "black",
        borderWidth : 1,
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius : 10,
        opacity : 0.4,
        backgroundColor : 'black'
    },
    myPostedReviewsItemTextView : {
        ...StyleSheet.absoluteFillObject
    },
    myPostedReviewsItemText : {
        color: "white",
        fontSize: 18,
        fontWeight: "200",
        textAlign: "center",
        marginTop : width * 0.05
    },
    // Edit User Details
    editUserDetailsDisplayContainer : {
        position : 'absolute',
        top : 180,
        left : 20,
    },
    editUserDetailsDisplayImageButton : {
        width : 100,
        height : 100,
        borderRadius : 50,
        margin : 20,
        overflow: 'hidden'
    },
    editUserDetailsDisplayImage : {
        width : 100,
        height : 100,
    },
    editUserDetailsInputContainer : {
        marginTop : 50 ,

    }
    

})

export const editUserDetails = StyleSheet.create({
    container : {},
})

export const feed = StyleSheet.create({
    container : {},
})

export const postDetails = StyleSheet.create({
    container : {},
})

export const login = StyleSheet.create({
    contentContainer : {
        backgroundColor : background
    },
    container : {

    },
    //login screen
    loginViewContainer : {
        flex : 1
    },
    loginViewCoverContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems :'center',
        backgroundColor : background,
        height : height* 0.75,    
    },
    loginViewPhoneNumberHeaderContainer : {
        marginTop: height* 0.025 , 
        marginLeft : 10 
    },
    loginViewPhoneNumberHeaderText : {
        fontSize : 16 , 
        color : borderColor, 
        fontWeight : 'bold'
    },
    loginViewPhoneNumberInputContainer : {
        flexDirection : 'row', 
        marginBottom : 10 , 
        justifyContent:'center', 
        alignItems:'center' , 
        height : height* 0.115
    },
    loginViewPhoneNumberInputCountryContainer : {
        borderRadius : 5,
        height : 40,
        flexDirection : 'row'
    },
    loginViewPhoneNumberInputCountryText  : {
        margin : 4, 
        marginTop : 11,
        textAlign : 'center',
        fontSize : 16,
    },
    loginViewPhoneNumberInputNumberInput : {
        height: 45 ,
        borderRadius : 10,
        borderColor : "#bbb",
        borderWidth : 1,
        flex : 1,
        margin : 5 ,
        fontSize : 16, 
        padding : 10 , 
        textAlign : 'center',
        letterSpacing : 5,
    },
    loginViewFooterContainer : {
        backgroundColor : theme , 
        height : 5, 
        width : '100%', 
        position : 'absolute', 
        bottom : 0
    },
    //validation screen
    validationViewContainer : {
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center' , 
        flex : 1,
        backgroundColor : background
    },
    validationViewCoverContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems :'center',
        backgroundColor : background,
        height : height* 0.6,
    },
    validationViewOTPContainer : {
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center' , 
        flex : 1,
        margin : 10,
        backgroundColor : background
    },
    validationViewOTPHeader : {

    },
    validationViewOTPBoxesContainer : {
        flexDirection : 'row'
    },
    validationViewOTPBoxesInput : {
        borderWidth : 1,
        borderColor : 'black',
        textAlign : 'center',
        fontSize : 20,
        margin : 10,
        borderRadius : 5,
        padding : 5,
        color : theme
    },
    validationViewResendOTPInactiveText : {
        fontWeight : '500', 
    },
    validationViewResendOTPButton : {
        margin : 10
    },
    validationViewResendOTPActiveText : {
        fontWeight : '500', 
        color : 'blue'
    },
    validationViewResentOTPAttemptsText : {
        margin : 10
    },
    validationViewSubmitButton : {
        backgroundColor : theme,
        width : '98%',
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 5,
        borderRadius : 10,
        padding : 5,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : 'white',
        elevation : 1, 
        height : 40,
    },
    validationViewSubmitText : {
        color : '#FFF',
        textAlign : 'center', 
        fontSize : 20
    }



})

export const signout = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : background
    },
    signOutContainer : {
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1
    },
    signOutQuestion : {
        fontSize : 20 ,
    },
    yesButton : {
        backgroundColor : background,
        padding : 10,
        borderRadius : 3, 
        margin : 10,
        width : 100,
        alignItems : 'center'
    },
    yesText : {
        fontSize : 15,
        color : theme
    },
    noButton : {
        backgroundColor : theme,
        padding : 10,
        borderRadius : 3, 
        margin : 10,
        width : 100,
        alignItems : 'center'
    },
    noText : {
        color : background
    }
})

export const pins = StyleSheet.create({
    container : {
        flex : 1, 
        backgroundColor: background
    },
    //Main View Sub Containers
    mainViewSubContainer : {

    },
    mainViewSubContainerHeader : {
        fontWeight : '200',
        fontSize : 18,
        marginLeft : 20,
        margin : 10,
    },
    mainViewSubContainerEmptyView : {

    },
    mainViewSubContainerEmptyText : {
        fontSize : 16
    },
    mainViewSubContainerItemContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        width : width * 0.45,
        height : width * 0.45,    
    },
    mainViewSubContainerItemImageBackground : {
        flex: 1,
        width : width * 0.45,
        height : width * 0.45,
        borderColor : "black",
        borderWidth : 1,
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius : 10,
        opacity : 0.4,
        backgroundColor : 'black',
    },
    mainViewSubContainerItemTextView : {
        ...StyleSheet.absoluteFillObject,
    },
    mainViewSubContainerItemText : {
        color: "white",
        fontSize: 18,
        fontWeight: "200",
        textAlign: "center",
        marginTop : width * 0.05    
    },

    


})







