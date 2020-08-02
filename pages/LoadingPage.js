import * as React from "react"
import { Animated, View, Text } from 'react-native'
import { AnimatedSVGPath } from 'react-native-svg-animations'
import svg from "../assets/svg-path.json"

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
                    width={svg.width}
                    height={svg.height}
                    delay={0}
                    scale={0.20}
                    strokeColor={Colors.Primary}
                    strokeWidth={15}
                    fill={'#FFF'}
                    d={svg["swollio-arm"]}
                />
            </Animated.View>
          </View>
        )
      }
}
