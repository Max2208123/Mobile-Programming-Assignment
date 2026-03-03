import { colors } from "./colors";

export const styles = {
    viewTopLevelContainer:{
        alignItems: 'center',
        backgroundColor: colors.backgroundScreen,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    pageHeaderActive: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.backgroundAccent,
        margin: 5,
        padding: 5,
        backgroundColor: colors.backgroundScreen,
        borderRadius: 10,
    },
    pageHeaderInactive:{
        margin: 5,
        padding: 6,
        borderRadius: 5,
    },
    flatListHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    flatListHeaderText:{
        width: '55%',
        justifyContent: 'center',
    },
    flatListHeaderViewRight: {
        width: '45%',
        alignItems: 'flex-end', 
        flexDirection: 'column',
    },
    flatListHeaderTextRight:{
        fontWeight: 'bold',
        marginRight: 5,
        color: colors.lineColorDark,
    },
    flatListHeaderPressable:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 5,
    },
    pressableHeader: {
        alignItems: 'flex-end', 
        flexDirection: 'row', 
        justifyContent:'center',
    },
    flatList: {

    },
    flatListContainer:{
        alignItems: 'center',
        marginTop: 10,        
        padding: 10,
        borderRadius: 10,
        borderColor: colors.lineColorDark,
        backgroundColor: colors.backgroundItem,
        borderColor: colors.lineColorDark,
        height: '85%',
    },
    countriesTopLevelContainer:{
        backgroundColor: colors.backgroundScreen,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },    
    flatListElementContainer:{
        borderTopWidth: 1,
        borderColor: colors.lineColorDark
    },
    flatListItemTopRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    starSelectorContainer:{
        justiyContent: 'center',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textContainer:{
        width: '50%',
        paddingRight: '5%',
    },
    headerText:{
        marginTop: 8,
        marginBottom: 8,
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.lineColorDark,
    },
    descriptionText:{
        fontSize: 14,
        color: colors.lineColorDark,

    },

    starContainer: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'flex-start',
    },

    pressableContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '20%',
        height: '100%',
    },
    addLocationMask:{
        componentContainer:{
            margin: 10,
            borderColor: colors.backgroundAccent,
            backgroundColor: colors.backgroundScreen,
        },
        topLineContainer:{
            flexDirection:'row',
            width: '100%',
        },
        titleInputContainer:{
            width: '55%'
        },
        titleInput:{
            margin: 5,
            padding: 5,
            borderBottomWidth: 1,
            marginRight: 5,

        },
        ratingInputContainer:{
            width: '45%',
            alignItems: 'end',
            paddingLeft: 5,
        },

        middleLineContainer:{

        },  
        descriptionInput:{
            borderBottomWidth:1,
            margin: 5,
            padding: 5,
        },      
        header2Text:{
            color: colors.lineColorDark,
            fontWeight: 'bold',
        },
        starSelector:{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        },
        errorText:{
            color: colors.errorRed,
            textAlign: 'left',
            width: '75%',
            paddingRight: 5,
        },
        inputHeaderTopline:{
            flexDirection:'row',
            width: '100%'
        },
        coordinationInputContainer:{
            flexDirection: 'row',
            width: '100%',
        },
        coordinationInputContainerLeft:{
            width: '45%',
        },
        coordinationInputContainerMiddle:{
            width: '10%',
        },
        coordinationInputContainerRight:{
            width: '45%',

        },
        header3Text:{
            color: colors.lineColorDark,
            fontWeight: 'bold',
            width: '23%',
        },
        error3Text:{
            color: colors.errorRed,
            textAlign: 'right',
            width: '22%',
            paddingRight: 5,
        },
        coordinationInput:{
            padding:5,
            margin: 5,
            borderBottomWidth: 1,
        },

        bottomLineContainer:{
            flexDirection:'row',
            alignItems:'right',
            justifyContent:'flex-end',
        },
        buttonContainer:{
            flexDirection:'row',
            borderWidth: 1,
            backgroundColor: colors.backgroundAccent,
            borderRadius: 23,
            padding: 5,
            paddingLeft: 10,
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText:{
            color: colors.backgroundScreen
        },
        buttonIcon:{
            borderWidth: 1,
            borderRadius: 12,
            borderColor: colors.backgroundScreen,
            marginLeft: 5
        },
    },
    listElementHeaderActive: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.backgroundAccent,
        margin: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: colors.backgroundScreen,
        borderRadius: 10,
    },
    pageHeaderLineBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    pageHeaderLineHeaderContainer:{
        width: '45%',
        justifyContent: 'center',
    },
    pageHeaderLineSearchbarContainer:{
        width: '55%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 5,
    },
    searchBarContainer:{
        marginTop: 4,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    searchBarContainerBottomBorder:{
        width: '80%',
        borderBottomWidth:1,
        flexDirection: 'row',
    },
    searchBarTextField:{
        width: '85%',
        borderColor: colors.lineColorDark,
        padding: 0,
        fontSize: 16,
    },
    searchBarIcon:{
        width: '15%',
    },
    countryScrollView:{
        borderWidth:1,
        borderColor: colors.lineColorDark,
        borderRadius: 35,
        backgroundColor: colors.backgroundScreen,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5, 
        height: '89%',
        width: '100%'       
    },
    countryItemContainer:{
        width: '100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderWidth: 1,
        
        marginBottom: 5,
        borderRadius: 30,
        backgroundColor: colors.backgroundItem,
        borderColor: colors.lineColorDark,
    },
    countryFlagContainerWidth:{
        width: '20%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'left',
        paddingBottom: 2,
        paddingLeft: 4,
        
    },
    countryFlagSizeContainer:{
        width: 52,
        height: 52,
        borderWidth:2,
        borderColor: colors.lineColorDark,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 26,
    },
    flagImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.lineColorDark,
    },
    countryTextContainer:{
        width: '60%',
        justifyContent: 'center',
    },
    countryText:{
        paddingLeft: 10,
        fontSize: 16,
        color: colors.lineColorDark,
        fontWeight: 'bold',
    },
    countryButtonContainer:{
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countryButtonPressable:{
        backgroundColor: colors.lineColorDark,
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countryIcon:{

    },
    mapTopLevelContainer:{
        alignItems: 'center',
        backgroundColor: colors.backgroundScreen,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    mapOuterContainer:{
        width: '100%',
        height: '70%',
        marginBottom: 10,
        
    },
    mapContainer:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.lineColorDark,
        borderRadius: 10, 
        overflow:'hidden',
        
    },
    map:{
        width: '100%',
        height: '100%',        
    },

    headerContainer:{
        marginTop: 40,
        width: '100%',
        alignItems: 'left',
        flexDirection: 'row',
    },
    headerTextContainer:{
        width: '55%',
        justifyContent:'center',
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.lineColorDark,
    },
    headerButtonContainer:{
        width: '50%',
        justifyContent: 'center',
        borderWidth: 1,
        alignItems: 'right',
    },
    headerPressable:{

    },
    buttonIcon:{
        borderColor: colors.backgroundScreen,
        marginLeft: 5
    },
    header2Text:{
        fontSize: 16,
        color: colors.lineColorDark,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        padding: 20,

    },
    loginPage:{
        textInputField: {
            borderWidth: 1,
            fontSize: 24,
            borderRadius: 48,
            borderColor: '#254E70',
            color: '#254E70',
            paddingLeft: 20,
        },
        containerInner: {
            borderColor: '#254E70',
            width: '100%',
            height: '100%',
            borderWidth: 1,
            justifyContent:'center',
            padding: 10,        
        },
        containerOuter: {        
            width : '80%',
            height: '45%',
            backgroundColor: '#8EE3EF',
            alignItems:'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 10,
        },
        title1: {
            fontSize: 32,
            marginBottom: 10,
            marginTop: 20,
        },
        errorText:{
            color: '#C33C54',
            paddingLeft: '8%',
            paddingRight: '8%',
            fontWeight:'bold'
        },
        containerInputField:{
            marginTop: 5
        },
        containerInputFields:{
            marginTop: 10,
            marginBottom: 0,
        },
        buttonContainer:{
            width: '48%',
            marginRight: '1%',   
            marginLeft:'1%' ,
            marginTop: '5%',
        },
        containerButtons:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'end',
        },
        pressable:{
            backgroundColor: '#37718E',
            borderWidth: 1,
            height: 54,
            borderRadius: 27,
            alignItems: 'center',
            justifyContent: 'center',
        },
        pressableText:{
            color: '#AEF3E7',
            fontSize: 14,
        } 
    }
};

export const DesignConfig = {
    icon: {
        size: 17,
        color: colors.backgroundAccent,
        alternativeColor: colors.backgroundScreen,
    }
}