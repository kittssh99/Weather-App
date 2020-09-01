import React, { Component } from 'react'
import { View, SafeAreaView, FlatList, Text, Alert } from 'react-native'
import { styles } from '../StyleSheet'
import { loadWeather } from '../../actions'
import { connect } from 'react-redux'
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request, RESULTS, check } from "react-native-permissions";
import Geocoder from 'react-native-geocoding'
import LottieView from 'lottie-react-native';
Geocoder.init("AIzaSyDPqCdv4liymFR50l3dvyfxOFSezgtPViI")

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentLongitude: 0,
            currentLatitude: 0,
            address: '',
        }
    }

    componentDidMount() {
        this.animation.play();
        this.animation.play(30, 120);
        this.callLocation()
    }

    componentDidUpdate(prevProps) {
        if (this.props.weatherData != prevProps.weatherData) {
            this.getCurrentLocationName(this.props.weatherData.lat, this.props.weatherData.lon)
            let arr = this.props.weatherData.daily
            arr.shift()
            arr.pop()
            arr.pop()
            this.setState({
                isLoading: false
            })

        }
    }

    //GET current location
    callLocation() {
        //alert("callLocation Called");
        Geolocation.getCurrentPosition(
            //Will give you the current location
            position => {
                //getting the Longitude from the location json
                const currentLongitude = position.coords.longitude;
                //getting the Latitude from the location json
                const currentLatitude = position.coords.latitude;
                //Setting state Longitude to re re-render the Longitude Text
                this.setState({ currentLongitude: currentLongitude });
                //Setting state Latitude to re re-render the Longitude Text
                this.setState({ currentLatitude: currentLatitude });
                this.props.loadWeather(this.state.currentLatitude, this.state.currentLongitude)
            },
            error => {
                console.log('current position error', error)
                this.setState({
                    isLoading: false
                })
                if (error.code == "1") {
                    this.requestLocation()
                } else
                    Alert.alert('Error!', error.message + ' Please turn on your GPS.')
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
        this.watchID = Geolocation.watchPosition(position => {
            //Will give you the location on location change
            console.log('wtch' + JSON.stringify(position));
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            this.setState({ currentLongitude: currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            this.setState({ currentLatitude: currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }

    //request permission
    requestLocation() {
        request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            })
        ).then(res => {
            console.log('request res', res)
            if (res == RESULTS.GRANTED) {
                this.callLocation()
            } else if (res == RESULTS.DENIED) {
                this.requestLocation();

            }
        });

    }

    //get week days from time stamp
    getWeekDay(dt) {
        if (dt != 'undefined') {
            let dayNum = new Date(dt * 1000).getDay()
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let result = days[dayNum];
            console.log(result);
            return result;
        }
    }

    //convert Kelvin To Celcius Temp
    convertKelvinToCelciusTemp(kelvinTemp) {
        if (kelvinTemp != 'undefined')
            return (kelvinTemp - 273.15).toFixed(2) + ' C';
    }

    //reverse geocoding
    getCurrentLocationName(lat, log) {
        Geocoder.from(lat, log)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                console.log('Address success', JSON.stringify(addressComponent));
                this.setState({
                    address: addressComponent.long_name
                })
            })
            .catch(error => console.log('Address error', error));

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container1}>
                        <Text style={{ fontSize: 44 }}>{(this.props.weatherData != 'undefined' && this.props.weatherData.hasOwnProperty('current') && this.props.weatherData.current != 'undefined'
                            && this.props.weatherData.current.hasOwnProperty('temp') && this.props.weatherData.current.temp != 'undefined') ? this.convertKelvinToCelciusTemp(this.props.weatherData.current.temp) : ''}</Text>
                        <Text style={styles.addressStyle}>{this.state.address}</Text>
                    </View>
                    <View style={styles.container1}>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={this.props.weatherData.daily}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.listPArent} />
                                    <View style={styles.horizontlViewStyle}>
                                        <Text style={styles.dayTextStyle}>{this.getWeekDay(item.dt)}</Text>
                                        <Text style={styles.tempTextStyle}>{this.convertKelvinToCelciusTemp(item.temp.day)}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
                {
                    (this.state.isLoading) ?
                        <LottieView
                            source={require('../../drawable/splashy-loader.json')}
                            ref={animation => {
                                this.animation = animation;
                            }}
                            autoPlay
                            loop
                            style={styles.lottieStyle}
                        />
                        : null
                }
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => {
    return {
        weatherData: state.weatherResponse,
    };
};

const dispatchStateToProps = dispatch => {
    return {
        loadWeather: (lat, log) => dispatch(loadWeather(lat, log))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(Weather);

