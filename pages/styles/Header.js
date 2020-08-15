import { StyleSheet } from 'react-native';
import Colors from '../../utilities/Colors'

export default StyleSheet.create({
    container: {
        width: '100%',
        borderColor: Colors.Primary,
        borderBottomWidth: 2,
        backgroundColor: Colors.Surface,
    },
    safeAreaTop: {
        backgroundColor: Colors.Surface,
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        width: '100%',
    },
    text: {
        color: Colors.SurfaceContrast,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Comfortaa_300Light',
        color: Colors.SurfaceContrast,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_500Medium',
        color: Colors.SurfaceContrast2,
        textAlign: 'left',
        width: '100%',
        marginVertical: 8,
    }
})