import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

export class ProgressDialogs extends Component {

    componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        this.animation.play(30, 120);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../drawable/splashy-loader.json')}
                    ref={animation => {
                        this.animation = animation;
                    }}
                    autoPlay
                    loop
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            </View>
        );
    }
}
