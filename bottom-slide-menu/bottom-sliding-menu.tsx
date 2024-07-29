import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import React, { Component, ReactNode, RefObject, useEffect, useState } from "react";
import Animated, { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// styles
import { colors } from "../../assets/colors";
import { textStyles } from "../../assets/texts";
import { app_dimensions } from "../../assets/dimensions";

// icons
import Close from "../../assets/icons/close";

// At which pixle positions from the bottom 
// to auto remove the menu 
const REMOVE_THRESHOLD = 150;

type BottomSlidingMenuProps = {
    title: string;
    delay?: number;
    children?: ReactNode | undefined;
    ref?: RefObject<BottomSlidingMenu>;
};

type BottomSlidingMenuState = {
    delay: number;
    showView: boolean;
    hideView: boolean;
};

type AnimatedBlurViewType = {
    showView: boolean;
    hideView: boolean;
    onBlurViewPress: () => void;
};

type BottomSlidingMenuViewType = {
    title: string;
    showView: boolean;
    hideView: boolean;
    onBlurViewPress: () => void;
    children?: ReactNode | undefined;
};

function AnimatedBlurView({ showView, hideView, onBlurViewPress }: AnimatedBlurViewType) {
    const opacityAnimation = useSharedValue(0.0);
    const [ blurViewVisible, setBlurViewVisible ] = useState(false);

    useEffect(() => {
        if(showView && opacityAnimation.value === 0.0) {
            setBlurViewVisible(true);
            opacityAnimation.value = withTiming(1.0);
        }
        else if(hideView && opacityAnimation.value > 0.0) {
            hideViews();
        }
            
    }, [showView, hideView]);

    function hideViews() {
        opacityAnimation.value = withTiming(0.0, {}, () => runOnJS(animationCallBack)());
    }

    function animationCallBack() {
        onBlurViewPress();
        setBlurViewVisible(false);
    }

    return (
        <Animated.View
            style={[styles.blurViewWrapper, { zIndex: blurViewVisible ? 10 : -1, opacity: opacityAnimation }]}
        >
            <Pressable
                onPress={() => hideViews()} 
                style={styles.androidBlurView} 
            />
        </Animated.View>
    );
}

export function AnimatedBottomSlidingMenu({ title, hideView, showView, onBlurViewPress, children }: BottomSlidingMenuViewType) {
    const translateYAnimation = useSharedValue(500);

    const pan = Gesture.Pan()
      .onBegin(() => {
      })
      .onChange((event) => {
        if(event.translationY >= 0) {
            translateYAnimation.value = event.translationY;
        }
      })
      .onFinalize((event) => {
        if(event.translationY >= REMOVE_THRESHOLD) {
            runOnJS(hideViews)();
        } else {
            translateYAnimation.value = withTiming(0);
        }
      });

    useEffect(() => {
        if(showView && translateYAnimation.value === 500)
            translateYAnimation.value = withTiming(0);
        else if(hideView)
            hideViews();
            
    }, [showView, hideView]);

    function hideViews() {
        translateYAnimation.value = withTiming(500, {}, () => runOnJS(animationCallBack)());
    }

    function animationCallBack() {
        onBlurViewPress();
    }

    return (
        <GestureDetector
            gesture={pan}
        >
            <Animated.View
                style={[styles.bottomSlidingViewStyle, { transform: [ { translateY: translateYAnimation } ] }]}
            >
                <View style={styles.panBarStyle} />

                <View
                    style={styles.bottomMenuSliderTitleWrapper}
                >
                    <Text
                        style={[textStyles.h5_16, { color: colors.neutralBlack }]}
                    >
                        {title}
                    </Text>
                    <Pressable
                        onPress={() => hideViews()}
                    >
                        <Close 
                            color={colors.neutral3}
                        />
                    </Pressable>
                </View>
                {
                    children
                }
            </Animated.View> 
        </GestureDetector>
    );
}

export default class BottomSlidingMenu extends Component<BottomSlidingMenuProps, BottomSlidingMenuState> {
    constructor(props: BottomSlidingMenuProps) {
        super(props);

        props.ref = React.createRef();

        this.state = {
            showView: false,
            hideView: false,
            delay: props.delay ?? 0,
        }
    }

    hideBottomMenu(): void {
        this.setState({
            hideView: true,
            showView: false,
        });
    }

    showBottomMenu(): void {
        const time_out = setTimeout(() => {
            this.setState({
                showView: true,
                hideView: false,
            }, () => clearTimeout(time_out));
        }, this.state.delay);
    }

    render(): ReactNode {
        return (
            <>             
                <AnimatedBottomSlidingMenu
                    title={this.props.title}
                    hideView={this.state.hideView}
                    showView={this.state.showView}
                    onBlurViewPress={() => this.hideBottomMenu()} 
                >
                    {this.props.children}
                </AnimatedBottomSlidingMenu>

                <AnimatedBlurView
                    hideView={this.state.hideView}
                    showView={this.state.showView}
                    onBlurViewPress={() => this.hideBottomMenu()} 
                /> 
            </>
        );
    }
}

const styles = StyleSheet.create({
    blurViewWrapper: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: wp("100%"), 
        height: hp("100%"),
        position: "absolute",
    },
    bottomSlidingViewStyle: {
        bottom: 0,
        zIndex: 20,
        width: wp("100%"),
        position: "absolute",
        flexDirection: "column",
        paddingBottom: app_dimensions.dim32,
        backgroundColor: colors.backgroundWhite,
        borderTopEndRadius: app_dimensions.dim24,
        borderTopStartRadius: app_dimensions.dim24,
    },
    panBarStyle: {
        borderRadius: 50,
        alignSelf: "center",
        width: app_dimensions.dim32,
        height: app_dimensions.dim4,
        backgroundColor: colors.neutral4,
        marginVertical: app_dimensions.dim16
    },
    bottomMenuSliderTitleWrapper: {
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        borderBottomColor: colors.neutral5,
        paddingBottom: app_dimensions.dim12,
        paddingHorizontal: app_dimensions.dim16,
    },
    androidBlurView: { 
        width: "100%", 
        height: "100%", 
        backgroundColor: "rgba(0,0,0, 0.75)"
    }
});