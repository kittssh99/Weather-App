import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    lottieStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    tempTextStyle: {
        width: '20%',
        fontWeight: 'bold',
        fontSize: 16
    },
    dayTextStyle: {
        width: '80%',
        padding: 20,
        fontSize: 16
    },
    horizontlViewStyle: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },
    listPArent: {
        width: '100%',
        borderColor: 'grey',
        height: 1,
        borderWidth: 1
    },
    addressStyle: {
        fontSize: 16,
        color: 'black',
        marginTop: 10
    }
});

export { styles }