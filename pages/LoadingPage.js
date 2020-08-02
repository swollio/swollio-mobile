import * as React from "react"
import { Animated, View, Text } from 'react-native'
import { AnimatedSVGPath } from 'react-native-svg-animations'

import Colors from '../utilities/Colors'

export default class LoadingPage extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        scale: new Animated.Value(1),
        opacity: new Animated.Value(0),
      }
      this.animate = this.animate.bind(this);
    }
  
    componentDidMount() {
      this.animate();

    }
  
    animate() {
      Animated.sequence([
        Animated.timing(this.state.scale,
          {
            toValue:1.05,
            duration:500,
            useNativeDriver:false,
          }),
        Animated.timing(this.state.scale,
          {
            toValue:0.95,
            duration:500,
            useNativeDriver:false,
          })
      ]).start(this.animate)

    }

    render () {
        return (
          <View style={{width: '100%', alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Animated.View style={{alignItems: 'center', transform:[{scale:this.state.scale}]}}>
                <AnimatedSVGPath 
                    duration={4000}
                    width={660}
                    height={660}
                    scale={0}
                    delay={0}
                    scale={0.20}
                    strokeColor={Colors.Primary}
                    strokeWidth={15}
                    fill={'#FFF'}
                    d="m 527.73315,258.23313 c -44,-10.41 -91.77,1.9 -127.44,29.47 -1.23,0.84 -2.44,1.72 -3.63,2.61 -1.69,1.28 -3.36,2.59 -5,3.9 -0.61,0.48 -1.19,1 -1.75,1.51 -3.12,3 -6.34,6 -9.35,9.18 -2,2.13 -3.78,4.52 -5.69,6.75 a 88.77,88.77 0 0 0 -5.71,7.78 c -1.44,2.12 -2.82,4.31 -4.06,6.54 q -1.11,2 -2.19,4.11 c -0.28,0.47 -0.56,1 -0.83,1.43 h 0.07 c -0.73,1.41 -1.45,2.82 -2.14,4.24 -1,2 -1.72,4.17 -2.6,6.25 -0.43,1 -0.82,2.06 -1.2,3.1 a 135.1,135.1 0 0 0 -49.94,-6.92 137,137 0 0 0 -98.2,50.44 387.69,387.69 0 0 1 33.76,-178.8 l 0.12,0.11 a 1.67,1.67 0 0 0 0.08,-0.2 c 1.52,-3.59 3.21,-7.12 4.9,-10.63 0.72,-1.5 1.44,-3 2.17,-4.51 l 0.08,-0.16 v 0 c 2.09,-4.35 4.2,-8.69 6.42,-13 2,-4 4.34,-7.79 6.59,-11.64 0.87,-1.48 4.16,-3 5.51,-2.78 a 79.38,79.38 0 0 0 10,1.08 c 9.74,0 19.48,-0.18 29.21,-0.4 a 28.58,28.58 0 0 0 5.65,-0.85 c 3.64,-0.82 4.88,-0.46 6.9,2.21 4.67,6.15 10.47,10.1 18.6,9.4 2.19,-0.2 4.39,-0.38 6.55,-0.76 3,-0.51 5.91,-1.43 8.91,-1.73 a 9.63,9.63 0 0 1 2.93,0.35 10.11,10.11 0 0 0 2.71,0.37 c 2,-0.09 4,0 5.94,0 4.37,0.12 8.74,0.23 13.08,-1.14 a 59.26,59.26 0 0 0 11.87,-5.05 18.2,18.2 0 0 1 4.83,-2.28 c 3.71,-0.81 7.64,-0.82 11.24,-1.93 4.62,-1.45 9.21,-3.21 12.9,-6.69 a 32.32,32.32 0 0 1 5.72,-4.28 32.33,32.33 0 0 0 10.82,-10.5 c 1.71,-2.67 1.36,-5.55 1.55,-8.35 a 8.21,8.21 0 0 0 -1.41,-4.71 c -3.61,-5.41 -7.48,-10.63 -11.16,-16 -4.41,-6.44 -8.65,-13 -13.09,-19.450004 -4.25,-6.13 -8.94,-12 -12.94,-18.26 -4,-6.26 -9.54,-8.31 -16.55,-8.2 -10.37,0.15 -20.74,0 -31.11,0 a 14.1,14.1 0 0 0 -1.72,0 c -4.48,0.56 -9,1.16 -13.44,1.71 -3.9,0.46 -7.81,0.81 -11.7,1.31 -3.89,0.5 -7.82,1.12 -11.73,1.7 -2.83,0.42 -5.68,0.75 -8.48,1.31 -3.74,0.75 -7.43,1.77 -11.17,2.53 -4,0.81 -8.16,1.31 -12.18,2.2 -3.63,0.81 -7.18,2 -10.79,3 -2.46,0.65 -5,1.18 -7.43,1.73 -3.41,0.76 -7,1.07 -10.2,2.32 a 80.29,80.29 0 0 0 -14.66,7 131.86,131.86 0 0 0 -15.16,12.080004 81.87,81.87 0 0 0 -8.67,9.46 q -1.92,2.34 -3.81,4.69 v 0 c -0.72,0.89 -1.44,1.79 -2.14,2.71 -0.1,0.13 -0.2,0.27 -0.31,0.4 q -4.14,5.19 -8.13,10.51 c -0.8,1.06 -1.58,2.13 -2.36,3.2 -37.52,49.08 -74.61,98.63 -105.610003,152 -34,58.52 -60.63,122.15 -70.27,189.12 -1.36,9.43 -2.36,19.18 0.12,28.38 3.1,11.49 11.31,20.92 20.32,28.69 29.31,25.28 68.000003,36.6 106.000003,44.07 32.12,6.32 65.32,10.22 98.26,10.22 50.93,0 101.21,-9.33 145.74,-33.42 40.74,-22 91.22,-9 136.61,-18.24 63.47,-12.95 112.93,-74.9 112.56,-139.69 -0.37,-64.79 -49.73,-125.68 -112.77,-140.6 z"
                />
            </Animated.View>
          </View>
        )
      }
}
