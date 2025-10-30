import { View, Text, StyleSheet } from 'react-native'

export default function Feed() {
    return (
        <View style={style.body}>
            <Text>feed</Text>
        </View>
    )
}

const style = StyleSheet.create({
    body : {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})