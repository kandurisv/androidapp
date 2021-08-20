import {StyleSheet, Dimensions} from 'react-native'
import { borderColor,theme,background } from './exports'

const {width,height} = Dimensions.get('screen')

const HEADER_HEIGHT = 50
const HEADER_FONT = 18
const TAB_BAR_HEIGHT = 60
const TAB_SLIDER_HEIGHT = 2
const TAB_SLIDER_COLOR = "#C51E3A"


export const header1 = StyleSheet.create({
    headerView : {
        marginTop: 20,
        height : HEADER_HEIGHT,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : background,
        flexDirection : 'row',
        
    },
    headerText : {
        flex : 1 , 
        fontWeight : 'bold',
        fontSize: HEADER_FONT , 
        fontFamily : 'Roboto',
        color : theme,
        alignSelf : 'center',
        justifyContent : 'flex-start',
        marginLeft : 60,
        
    },
})

export const header = StyleSheet.create({
    headerView : {
        marginTop: 20,
        height : HEADER_HEIGHT,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : background
    },
    headerText :{
        fontWeight : 'bold',
        fontSize: HEADER_FONT , 
        fontFamily : 'Roboto',
        color : borderColor,
        justifyContent : 'center',
       
    }
})

export const home = StyleSheet.create({
    container : {
        flex : 1 , 
        backgroundColor : background
    },
    //ACTIVITY AND MODAL
    modalContainer : {
      flex : 1
    },
    modalView : {
        flex: 1 , 
        backgroundColor : background, 
        width : width , 
        height : height ,
    },
    modalHeading : {
        fontSize : 18 , 
        fontFamily : 'Roboto',
        fontWeight : 'bold' 
    },
    modalText : { 
        color : borderColor , 
    },
    


    //userDetails
    userDetailsContainer : {

    },
    userDetailsUserNameContainer : {
        margin : 10,
        alignItems : 'center'
    },
    userDetailsUserNameText : {
        fontWeight : 'bold',
        textAlign : 'center',
        fontFamily : 'Roboto'

    },
    userDetailsUserNameTextInput : {
        width , 
        marginLeft : 10,
        marginRight : 10,
        color : borderColor,
        textAlign : 'center',
        marginTop : 20,
        borderBottomColor : "#DDD",
        borderBottomWidth : 1,
        fontSize : 20,
        fontFamily : 'Roboto',
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
        fontFamily : 'Roboto',
    },
    userDetailsElementTextInput : {
        flex : 1, 
        borderRadius : 5,
        borderBottomWidth : 1,
        borderColor : '#AAA',
        textAlign : 'center',
        width :width*0.5,
        fontFamily : 'Roboto',
    },
    userDetailsGenderView : {

    },
    userDetailsGenderHeading : {
        fontSize : 14, 
        fontStyle : "italic" , 
        color : 'black' , 
        margin : 10,
        fontFamily : 'Roboto',
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
        fontSize : 12,
        fontFamily : 'Roboto',
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
    userDetailsUserNameCouponValid : {
        
    },
    userDetailsSubmitContainer : {
        alignItems : 'flex-end'
    },
    userDetailsDisabledSubmitButton : {
        backgroundColor : background,
        width : width*0.3,
        marginTop : 20,
        alignItems : 'center',
        padding : 10,
        borderRadius : 10,
        marginRight : 10,
    },
    userDetailsSubmitButton : {
        backgroundColor : 'white',
        width : width*0.3,
        marginTop : 20,
        alignItems : 'center',
        padding : 5,
        borderRadius : 10,
        marginRight : 10,
        borderWidth : 1,
        borderColor : theme,
        elevation : 1,
    },
    userDetailsSubmitText : {
        color : theme,
        textAlign : 'center',
        fontSize : 16,
        fontFamily : 'Roboto',
    },
    //ScrollableMainView
    mainViewScrollableContentContainer : {
        
        alignItems : 'center',
        marginBottom : TAB_BAR_HEIGHT,
    },
    mainViewScrollableContainer : {
        marginBottom : TAB_BAR_HEIGHT,
    },
    mainViewHeroBannerContainer : {
        backgroundColor : background,
        flex : 1,
        width : width,
        height : Dimensions.get('screen').height*0.25,
    },
    mainViewHeroBannerImage : {
        width : width,
        height : width * 0.8,
    },
    //CAROUSEL
    mainViewCarouselContainer : {
        margin : 5,
        flex : 1,
       // borderWidth : 2, 
        //borderColor : "#AAA",
       // borderRadius : 5, 
    
    },
    mainViewCarouselTitle : {
        fontWeight : 'bold',
        fontSize : 15,
        color : theme,
        marginLeft : 10,
        fontFamily : 'Roboto',
    },
    mainViewCarouselChild : {
        marginLeft : 0
    },
    mainViewCarouselScrollableItem : {

    },
    mainViewCarouselScrollableItemContainer : {
        flex: 1,
        justifyContent : 'center',
        alignItems :'center',
        borderRadius : 10,
        marginLeft : 10, 
        marginTop : 5,
        marginBottom : 10,
        backgroundColor : '#666',
        // position : 'relative',
        opacity : 1, 
        height : 125 , 
        width : 100, 
        backgroundColor : background, 
        elevation : 1, 
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
        marginTop : 10,
        fontFamily : 'Roboto',
    },


})

export const user = StyleSheet.create({
    container : {
        flex : 1
    },
    //mainView
    mainViewContentContainer : {
        marginBottom : 5
    },
    mainViewContainer : {
        flex: 1,
        marginBottom : 5
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
        marginBottom : 10,
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
        marginTop : 10,
        width : 120,
        
    },
    mainViewDetailsUserNameText : {
        padding : 8,
        textAlign : 'center',
        fontWeight : 'bold',
        fontSize : 13,
        fontFamily : 'Roboto',
    },
    mainViewDetailsSummaryContainer : {
        flex : 1 ,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center',
        
    },
    mainViewDetailsSummaryButtonContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor : "#ddd"
    },
    mainViewDetailsSummaryValue : {
        marginRight : 15,
        fontWeight : 'bold',
        fontFamily : 'Roboto',
    },
    mainViewDetailsSummaryName : {
        marginTop : 2,
        marginRight : 15,
        fontSize : 12,
        fontFamily : 'Roboto',
    },
    // referral code container
    mainViewReferralCodeView : {
        borderStyle : 'dashed',
        borderRadius : 1 ,
        elevation : 1,
        borderColor : theme,
        padding : 5,
        margin : 10 ,
        justifyContent : 'center',
        alignItems : 'center',

    },
    mainViewReferralCodeText : {
        color : 'black'
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
        fontFamily : 'Roboto',
        shadowOpacity : 2
    },
    // my posted reviews view
    myPostedReviewsContainer : {

    },
    myPostedReviewsHeading : {
        fontWeight : 'bold',
        fontFamily : 'Roboto',
        fontSize : 18,
        marginLeft : 20,
        margin : 5
    },
    myPostedReviewsEmptyContainer : {

    },
    myPostedReviewsEmptyText : {
        fontSize : 16,
        fontFamily : 'Roboto',
        marginLeft : 10,
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
        fontSize: 15,
        fontFamily : 'Roboto',
        fontWeight: "200",
        textAlign: "center",
        marginTop : width * 0.05,
        marginLeft : 5,
        marginRight : 5,
    },
    updateReviewView : {
        position : 'absolute',
        top : 0,
        right : 0,
        backgroundColor : 'transparent',
        marginTop : 4 ,
        marginRight : 4,
        // marginBottom : 5,
        borderRadius : 5,
        padding : 5,
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : "#999",
        shadowColor : "#aaa",
        justifyContent : 'center',
        alignItems : 'center'
    },
    updateReviewText : {
        fontWeight : 'bold',
        fontFamily : 'Roboto',
        shadowOpacity : 2,
        color : theme,
    },


    // Edit User Details
    editUserDetailsDisplayContainer : {
        position : 'absolute',
        top : 150,
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

    },
    datepicker : {
        justifyContent : 'center',
        alignSelf : 'flex-end',
        alignItems: 'flex-end',
        marginLeft : 20,
        marginRight : 10,
    },
    dateView : {
        flexDirection : 'row', 
        alignItems : 'center', 
        margin : 5, 
        marginLeft : 10
    },
    

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
        fontFamily : 'Roboto',
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
        fontFamily : 'Roboto',
    },
    loginViewPhoneNumberInputNumberInput : {
        height: 45 ,
        borderRadius : 10,
        borderColor : "#bbb",
        borderWidth : 1,
        flex : 1,
        margin : 5 ,
        fontSize : 16, 
        fontFamily : 'Roboto',
        padding : 10 , 
        textAlign : 'center',
        letterSpacing : 1,
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
        fontFamily : 'Roboto',
        margin : 10,
        borderRadius : 5,
        padding : 5,
        color : theme
    },
    validationViewResendOTPInactiveText : {
        fontWeight : '500', 
        fontFamily : 'Roboto',
    },
    validationViewResendOTPButton : {
        margin : 10
    },
    validationViewResendOTPActiveText : {
        fontWeight : '500',
        fontFamily : 'Roboto', 
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
        fontSize : 20,
        fontFamily : 'Roboto',
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
        fontFamily : 'Roboto',
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
        fontFamily : 'Roboto',
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
        backgroundColor: background,
       
    },
    //Main View Sub Containers
    mainViewSubContainer : {

    },
    mainViewSubContainerHeader : {
        fontWeight : 'bold',
        fontFamily : 'Roboto',
        fontSize : 20,
        margin : 5,
        marginLeft : 10,
    },
    mainViewSubContainerEmptyView : {

    },
    mainViewSubContainerEmptyText : {
        fontSize : 16,
        fontFamily : 'Roboto',
        marginLeft : 10
    },
    mainViewSubContainerItemContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        width : width * 0.45,
        height : width * 0.45,    
        borderRadius : 10
    },
    mainViewSubContainerItemImageBackground : {
        flex: 1,
        width : width * 0.45,
        height : width * 0.45,
        borderColor : "#BBB",
        borderWidth : 1,
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius : 10,
        backgroundColor : background,
       
    },
    mainViewSubContainerItemTextView : {
        position : 'absolute',
        bottom : 0,
        height : 28,
        backgroundColor : '#666',
        width : '100%',
        borderBottomWidth : 1,
        borderTopWidth : 0,
        borderRadius : 5, 
        borderColor : "#BBB",
        justifyContent: 'center',
        alignItems : 'center'
    },
    mainViewSubContainerItemText : {
        color: "white",
        fontSize: 15,
        fontFamily : 'Roboto',
        fontWeight: "200",
        textAlign: "center",
           
    },

    


})

export const feed = StyleSheet.create({
    container : {
        backgroundColor : background,
        flex : 1
    },
    // Main Container
    mainContainer : {
        width ,
        height : height - 180
        },
    scrollableFeedContainer : {
        marginBottom : 2,
        marginLeft : 3,
        marginRight : 3,
        marginTop : 2,
    },
    scrollableFeedItemContainer : {
        marginBottom: 5,
      //  width,
        height : width * 1.2
    },
    scrollableFeedItemUserNameHeaderView : {
        position:'absolute',
        width : width*0.965,
        top:0,
      //  backgroundColor : 'rgba(52, 52, 52, 0.5)',
        backgroundColor : "#666",
        zIndex : 102,
        height : 38,
        borderRadius : 5 ,
    },

    scrollableFeedItemUserName : {
        position:'absolute',
        top:0,
        color : 'white',
        marginTop: 6,
        
        marginLeft: 40,
        fontSize:18,
        fontFamily : 'Roboto',
        zIndex: 100
    },
    scrollableFeedItemTime : {
        position:'absolute',
        top:0,
        right : 0 ,
        color : 'white',
        marginTop: 10,
        marginRight: 10,
        fontSize:14,
        fontFamily : 'Roboto',
        zIndex: 100
    },
    scrollableFeedItemImagesCount : {
        backgroundColor : 'transparent' , 
        position:'absolute', 
        top: 20, 
        right : 10 ,
        marginTop: 25, 
        marginRight: 10, 
        borderRadius : 10,
        zIndex: 100
    },
    scrollableFeedItemProductView : {
        position:'absolute',
        width : width * 0.965 ,
        bottom:0,
        backgroundColor : 'rgba(52, 52, 52, 0.5)',
        zIndex : 102,
    },
    scrollableFeedItemProductName : {
        // position:'absolute',
        // bottom:0,
        marginTop : 5,
        marginLeft: 10,
        marginRight : 10,
        color : 'white',
        fontSize:16,
        fontFamily : 'Roboto',
        fontWeight:'bold'
    },
    scrollableFeedItemProductReview  : {
        // position:'absolute',
        // bottom:0,
         marginBottom : 10,
         marginLeft : 10 ,
         marginRight : 10,
        color : 'white',
        fontSize:15,
        fontFamily : 'Roboto',
    },
    scrollableFeedItemHorizontalScrollContainer : {

    },
    scrollableFeedItemHorizontalScrollImage : {
        width,
        height : width * 1.2,
        aspectRatio:2.5/3,
        resizeMode: 'cover',
        borderRadius: 10,
    },
})

export const postDetails = StyleSheet.create({
    contentContainer : {
        backgroundColor : background,
        paddingBottom : 60
    },
    container : {

    },
    //Review Images Container
    reviewImageContainer : {
        backgroundColor:'black'
    },
    reviewImageContainerScrollableMasterContentContainer : {},
    reviewImageContainerScrollableMasterContainer : {
        marginTop: 5,
    },
    reviewImageContainerScrollableContainer : {
        marginTop: 5,
        width,
        height : width * 1.35,
    },
    //User name View
    reviewImageContainerUserNameView : {
        position:'absolute',
        top:0,
        zIndex : 103,
        width ,
        backgroundColor : 'rgba(52, 52, 52, 0.5)',
    },
    reviewImageContainerUserNameButton : {
        
    },
    reviewImageContainerUserNameText : {
        color : 'white',
        fontSize:20,
        fontFamily : 'Roboto',
        padding : 10
    },
    reviewImageContainerUserNameTime : {
        color : 'white',
        fontSize:15,
        fontFamily : 'Roboto',
        marginLeft : 10
    },
    //Scrollable Image
    reviewImageContainerScrollableImage : {
        width,
        height : width * 1.35,
    },
    reviewImageContainerScrollableImage : {
        width,
        height : width * 1.35,
        aspectRatio:2/3,
        resizeMode: 'cover',
    },
    reviewImageContainerCalendarView : {
        position:'absolute',
        top:0,
        color : 'white',
        marginTop: 20,
        marginLeft: width - 60,
        zIndex: 100 ,
        backgroundColor : 'transparent'
    },
    reviewImageContainerCalendarImage : {
        width : width*0.05,
        height : width*0.05,
    },
    reviewImageContainerCalendarTextView : {},
    reviewImageContainerCalendarText : {},

    //Product Name View
    reviewImageContainerProductNameView : {
        position:'absolute',
        bottom:0,
        backgroundColor : 'rgba(52, 52, 52, 0.5)',
        zIndex : 102,
        width 
    },
    reviewImageContainerProductNameButton : {},
    reviewImageContainerProductNameText : {
        fontSize:16,
        fontFamily : 'Roboto',
        fontWeight:'normal',
        color : 'white',
        marginBottom: 30,
        padding : 5
    },
    //Heart View
    reviewImageContainerHeartContainer : { 
        position:'absolute',
        top:0,
        color : 'white',
        marginTop: 100,
        marginLeft: width - 60,
        fontSize:20,
        fontFamily : 'Roboto',
        zIndex: 100   
    },
    reviewImageContainerHeartImageButton : {

    },
    reviewImageContainerHeartImage : {
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
    },
    reviewImageContainerHeartTextView : {
        position:'absolute',
        top:0,
        marginTop: 140,
        marginLeft: width * 0.89,
    },
    reviewImageContainerHeartTextValue : {
        fontSize:20,
        fontFamily : 'Roboto',
        fontWeight:'bold',
        color:'#fff',
    },

    reviewText : {
        letterSpacing : 0.1,
        lineHeight : 19,
        color : "#444"
    },
    //Comments View
        reviewImageContainerCommentContainer : {
        position:'absolute',
        top:0,
        color : 'rgba(255,255,255,0.2)',
        marginTop: 310,
        marginLeft: width - 45,
        fontSize:20,
        fontFamily : 'Roboto',
        zIndex: 100
    },
    reviewImageContainerCommentImageButton : {},
    reviewImageContainerCommentImage : {},
    reviewImageContainerCommentTextView : {
        position:'absolute',
        top:0,
        marginTop: 335,
        marginLeft: width - 40,
    },
    reviewImageContainerCommentTextValue : {
        fontSize:20,
        fontFamily : 'Roboto',
        fontWeight:'bold',
        color: background,
    },
    //Share View
    reviewImageContainerShareContainer : {
        position:'absolute',
        top:0,
        color : 'rgba(255,255,255,0.2)',
        marginTop: 250,
        marginLeft: width - 45,
        fontSize:20,
        fontFamily : 'Roboto',
        zIndex: 100
    },
    reviewImageContainerShareImageButton : {},
    reviewImageContainerShareImage : {},
    reviewImageContainerShareTextView : {
        position:'absolute',
        top:0,
        marginTop: 262,
        marginLeft: width - 42,
    },
    reviewImageContainerShareTextValue : {
        fontSize:20,
        fontFamily : 'Roboto',
        fontWeight:'bold',
        color: background,
    },
    //Bookmark View
    reviewImageContainerBookmarkContainer : {
        position:'absolute',
        top:0,
        color : 'rgba(255,255,255,0.2)',
        marginTop: 190,
        marginLeft: width - 45,
        fontSize:20,
        fontFamily : 'Roboto',
        zIndex: 100,
        height : 50,
        width : 50,
    },
    reviewImageContainerBookmarkImageButton : {},
    reviewImageContainerBookmarkImage : {
      
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
    },
   
    //Review Tab Container 
    reviewTabContainer : {
        marginTop:-23,
        zIndex: 101
    },
    reviewTabItemContainer : {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent:'center'
    },
    reviewTabBar : {
        flexDirection: 'row',
        alignSelf:'center',
        marginBottom: 20
    },
    reviewTabBarButton : {
        width: width/5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: background,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: background
    },
    reviewTabBarText : {
        fontSize: 13,
        fontFamily : 'Roboto',
        color: borderColor
    },
    reviewTabBarSelectedButton : {
        backgroundColor: theme
    },
    reviewTabBarSelectedText : {
        color: background
    },
    reviewTabItemContainer : {
        width : '90%',
        alignSelf:'center',
        backgroundColor : background
    },
    reviewTabReviewContainer : {},
    reviewTabClaimContainer : {},
    reviewTabContextContainer : {},
    //Review Comments Container
    reviewCommentContainer : {        
            
    },
    reviewCommentContainerAddCommentContainer : {
        flexDirection :'row',
        borderRadius : 5,
        backgroundColor : '#FFFFFF',
        borderWidth : 1,
        borderColor : '#EEEEEE',
        marginLeft : 10,
        marginRight : 10,
        marginTop : 20,        
    },
    reviewCommentContainerTextInputContainer : {
        flexDirection: 'row',
        backgroundColor : '#FFFFFF',
        borderRadius : 5,
        alignContent : 'center',
        flex : 1,
        alignItems: 'center',
        paddingLeft : 10,
    },
    reviewCommentContainerTextInput : {
        flex: 1,
        marginHorizontal: 10,
        fontSize : 16,
        fontFamily : 'Roboto',
        color : 'black'
    },
    reviewCommentContainerSubmitContainer : {
        backgroundColor:"#FFF",
        borderRadius:25,
        width:50,
        height : 50,
        justifyContent:'center',
        alignItems:'center',
        alignSelf : 'center'
    },
    reviewCommentContainerSubmitButton : {},
    reviewCommentContainerSubmitText : {},
    reviewCommentContainerReadCommentContainer : {
        margin : 10,
    },
    reviewCommentContainerReadCommentItem : {
        padding : 5 ,
        marginTop : 10,
        backgroundColor : 'white',
        borderRadius : 5,
    },
    reviewCommentContainerReadCommentItemView : {
        flexDirection : 'row',
        
    },
    reviewCommentContainerReadCommentUserImage : {},
    reviewCommentContainerReadCommentUserName : {
        fontWeight : 'bold',
        fontFamily : 'Roboto',
        marginLeft : 10,
        flex : 1
    },
    reviewCommentContainerReadCommentTime : {
        fontSize : 10,
    },
    reviewCommentContainerReadCommentUserComment : {
        marginTop : 10
    },
    reviewCommentContainerReadCommentEmptyContainer : {
        padding : 5 ,
        marginTop : 10,
        backgroundColor : 'white',
        borderRadius : 5,
    },
    reviewCommentContainerReadCommentEmptyContainerText : {
        marginTop : 10
    },
})

export const addPost = StyleSheet.create({
    container : {},
    // Modal
    modalContainer : {
        marginTop : height*0.2 ,
        marginBottom : height*0.2
    },
    modalView : {
        flex: 1 , 
        backgroundColor : background, 
        width : width * 0.9 , 
        height : width * 0.9 ,
    },
    modalHeading : {
        marginBottom : 10, 
        marginLeft : 10 , 
        marginTop : 10 , 
        fontSize : 18 , 
        fontFamily : 'Roboto',
        fontWeight : 'bold' 
    },
    modalText : { 
        color : borderColor , 
        margin : 10
    },
    //Main Container
    scrollableMasterContentContainer : {
        marginBottom : 130,
        backgroundColor : background,
    },
    scrollableMasterContainer : {
        marginBottom : 130,
        backgroundColor : background
    },
    scrollableContainer : {
        flex : 1
    },
    //Product Search bar
    productSearchBarActiveView : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : background,
        padding : 5,
        marginTop : 0,
        flexDirection : 'row',
        borderWidth : 1,
        borderColor : borderColor,
        borderRadius : 5,
        marginLeft : 10,
        marginRight : 10,
        marginBottom : 10
    },
    productSearchBarActiveIcon : {

    },
    productSearchBarActiveTextInput : {
        flex : 1, 
        textAlign : 'center'
    },
    productSearchBarInactiveView : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : background,
        padding : 5,
        marginTop : 0,
        flexDirection : 'row',
        borderWidth : 1,
        borderColor : borderColor,
        borderRadius : 5,
        marginLeft : 10,
        marginRight : 10,
        marginBottom : 10
    },
    productSearchBarInactiveIcon : {},
    productSearchBarInactiveText : {
        fontWeight : 'bold', 
        fontFamily : 'Roboto',
        padding : 5 , 
        color : borderColor , 
        flex : 1, 
        marginLeft : 5
    },
    productSearchResultsContentContainer : {
        flex : 1, 
        margin : 10
    },
    productSearchResultsItem : {},
    productSearchResultsButton : {
        flex : 1 , 
        borderWidth : 1, 
        borderColor : '#DDD',  
        marginTop : 10, 
        padding : 10, 
        justifyContent : 'center'
    },
    productSearchResultsText : {
        fontSize :14,
        fontFamily : 'Roboto',
    },
    //MainView
    mainViewAddImagesContainer : {
        flexDirection : 'row' , 
        borderColor : '#000' , 
        borderWidth : 1, 
        margin : 10, 
        marginTop : 5
    },
    mainViewAddImagesButton : {
        backgroundColor : 'transparent',
        borderRadius : 5, 
        padding : 10 , 
        alignItems : 'center',
        justifyContent : 'center'
    },
    mainViewAddImagesIcon : {},
    mainViewAddImagesText : {},
    mainViewShowImagesEmptyContainer : {
        flex : 1, 
        justifyContent : 'center' , 
        alignItems : 'center', 
        marginLeft : 30 , 
        borderWidth : 1, 
        borderColor : background
    },
    mainViewShowImagesContainer : {},
    mainViewShowImagesItem : {
        height: 50, 
        width: 50
    },
    //Review Exists Container 
    mainViewReviewExistsContainer : {
        marginLeft : 10 , 
        marginRight : 10,
        borderWidth : 1 , 
        borderColor : borderColor,
    },
    mainViewReviewExistsHeader : {
        fontWeight : 'bold' , 
        fontFamily : 'Roboto',
        fontSize : 18, 
        textAlign : 'center'
    },
    mainViewReviewExistsDayReviewContainer : {},
    mainViewReviewExistsDayReviewItemContainer : {
        flex : 1 , 
        alignItems : 'center' , 
        justifyContent : 'center'
    },
    mainViewReviewExistsDayReviewItemButton : {
        borderColor : borderColor , 
        backgroundColor : theme , 
        margin : 5 , 
        borderRadius : 10,
    },
    mainViewReviewExistsDayReviewItemText : {
        color: background , 
        padding : 5 ,
    },
    mainViewReviewExistsContextContainer : {
        marginLeft : 10,
        flex : 1
    },
    mainViewReviewExistsContextHeader : {
        fontWeight : 'bold' , 
        fontFamily : 'Roboto',
    },
    mainViewReviewExistsContextText : {},
    mainViewReviewExistsImagesContainer : {
        width : width*0.5-20, 
        height : width*0.5-20, 
        margin : 5, 
        flex : 1 
    },
    mainViewReviewExistsImagesItem : {
        width : width*0.5-15, 
        height : width*0.5-15 , 
        flex : 1
    },
    mainViewReviewExistsImagesCalendarView : {
        position : 'absolute' , 
        top : 0 , 
        right : 0 , 
        flex : 1 , 
        margin : 5, 
        backgroundColor : background , 
        borderRadius : 50, 
        width : 20, 
        height : 20, 
        alignItems : 'center' , 
        justifyContent : 'center' 
    },
    mainViewReviewExistsImagesCalendarText : {
        color : borderColor,
        fontSize : 12,

    },
    //Only Context exists Container
    mainViewContextExistsContainer : {},
    mainViewContextExistsItemContainer : {
        margin : 10,
        borderColor : borderColor,
        borderWidth: 1,
        padding : 5,
        flex : 1
    },
    mainViewContextExistsItemHeader : {
        fontWeight : 'bold',
        fontFamily : 'Roboto',
    },
    mainViewContextExistsItemText : {},
    //Context Questions Container
    mainViewContextQuestionsContainer : {
        borderWidth : 1,
        borderColor : borderColor,
        margin : 10,
        paddingBottom : 10,
    },
    mainViewContextQuestionsItemContainer : {
        backgroundColor: background,
        margin : 5,
        marginTop: 10,
    },
    mainViewContextQuestionsItemQuestionsView : {
        marginLeft : 20,
        backgroundColor: background,
        fontWeight:'bold',
        fontFamily : 'Roboto',
        marginBottom : 5, 
        flex : 1,
        justifyContent :'center'
    },
    mainViewContextQuestionsItemQuestionsText : {
        fontWeight:'bold',
        fontFamily : 'Roboto',
        fontSize : 15,
    },
    mainViewContextQuestionsItemOptionsContainer : {
        width:'100%',
        alignItems:'center',
        backgroundColor: background
    },
    mainViewContextQuestionsItemOptionsContentContainer : {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width : width * 0.9,
        marginRight : 5 ,
        marginLeft : 5,
    },
    mainViewContextQuestionsItemOptionsItemButton : {
         padding: 10,
         marginRight : 15,
        // paddingVertical : 15,
        // marginHorizontal: 16, 
        height: 6,
        backgroundColor:background,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius : 5,
        borderWidth : 1,
        borderColor : borderColor
    },
    mainViewContextQuestionsItemOptionsItemText : {
        fontSize : 14,
        fontFamily : 'Roboto',
    },
    //Days Used Container
    mainViewDaysInputContainer : {
        paddingTop : 10,
        flexDirection : 'row',
        justifyContent : 'center'
    },
    mainViewDaysQuestionView : {
        marginLeft : 20,
        backgroundColor: background,
        fontWeight:'bold',
        fontFamily : 'Roboto',
        marginBottom : 5, 
        flex : 1,
        justifyContent :'center'
    },
    mainViewDaysQuestionText : {
        fontWeight:'bold',
        fontSize : 15,
        fontFamily : 'Roboto',
    },
    mainViewDaysTextInput : {
        borderWidth : 1, 
        borderColor : borderColor , 
        width : 50, 
        flex:1, 
        textAlign : 'center', 
        borderRadius : 5
    },
    mainViewDaysExistingUserButton : {},
    mainViewDaysExistingUserText : {},
    //Review Container
    mainViewReviewWritingContainer : {
        backgroundColor : background,
        margin : 10,
        height : 300,
        borderWidth : 1,
        borderColor : borderColor,
        marginTop : 20
    },
    mainViewReviewWritingInput : {
        fontSize : 16,
        fontFamily : 'Roboto',
        padding : 5,
    },
    //Submit Container
    mainViewSubmitReviewButton : {
        backgroundColor : theme,
        elevation : 1, 
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10,
        margin : 10,
        width : width*0.5,
        marginLeft : (width*0.5)-10,
        borderRadius : 5,
    },
    mainViewSubmitReviewText : {
        fontSize : 16,
        fontWeight : 'bold',
        fontFamily : 'Roboto',
        color : background
    },
    //Image Browser Container
    imageBrowserMasterContainer : {},
    imageBrowserContainer : {
        flex: 1,
        position: 'relative',
    },
    imageBrowserBadgeCountView : {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: theme,
    },
    imageBrowserBadgeCountText : {
        fontWeight: 'bold',
        fontFamily : 'Roboto',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff',
    },
    imageBrowserEmptyComponentText : {
        textAlign: 'center',
    },
    imageBrowserDynamicHeaderContainer : {
        flex : 1 , 
        alignItems : 'flex-end', 
        margin : 5, 
        marginRight : 10
    },
    imageBrowserDynamicHeaderDoneButton : {
        margin : 2, 
        padding : 5 , 
        backgroundColor : theme , 
        alignItems : 'center' , 
        width : width * 0.4 , 
        borderRadius : 5 ,
        borderWidth : 1,
        borderColor : theme
    },
    imageBrowserDynamicHeaderDoneText : {
        color : background
    },

    carouselStyle : {},

})


export const navigator = StyleSheet.create({
    tabContainer: {
        height: TAB_BAR_HEIGHT,
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.0,
        backgroundColor: background,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        elevation: 5,
        position: "absolute",
        bottom: 0,
      },
      slider: {
        height: TAB_SLIDER_HEIGHT,
        position: "absolute",
        top: 0,
        left: 13,
        backgroundColor: TAB_SLIDER_COLOR,
        borderRadius: 10,
        width: 50
    },
})







