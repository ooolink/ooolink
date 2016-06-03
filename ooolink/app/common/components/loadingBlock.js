import React,{
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Component,
    PropTypes,
    Platform
} from 'react-native';


class LoadingBlock extends Component {
    static defaultProps={
        color: '#65b278',
        style: {flex: 1,width: 50, alignSelf: 'center'}
    };

    render() {
        if (Platform.OS === 'android') {
            return (
                <ProgressBarAndroid
                    {...this.props}/>
            )
        }
        return (
            <ActivityIndicatorIOS
                animating={true}
                {...this.props}/>
        )
    }
}


export default LoadingBlock;