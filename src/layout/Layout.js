import React, {Component} from 'react';
import {getLocation, getWeather} from "../services/apis/WeatherApis";
import Swal from "sweetalert2";
import OwlCarousel from "react-owl-carousel2";
import 'react-owl-carousel2/lib/styles.css';
import {epochToDate} from "../function/utils/EpochtoDate";
import WeatherNow from "../view/WeatherNow";
import Weather48Hour from "../view/Weather48Hour";
import WeatherTodayDatas from "../view/WeatherTodayDatas";
import Weather7Day from "../view/Weather7Day";
import SunSchedule from "../view/SunSchedule";
import {next48Hours, next7Days, sunSchedule} from "../variables/OwlOptions";
import {options} from "../variables/WeatherOptions";

class Layout extends Component {

    state = {
        weatherData: [],
        isLoaded: false,
        location: [],
        locationDataLoaded: false,
    }


    getWeatherData = (lat, long) => {
        getWeather(lat, long)
            .then((res) => {
                this.setState({
                    weatherData: res,
                    isLoaded: true
                })
            }).catch(() => {
            Swal.fire("Oops", "Connection Timeout !!!", "error")
        })
    }

    getLocationData = (lat, long) => {
        getLocation(lat, long)
            .then((res) => {
                this.setState({
                    location: res,
                })
            }).catch(() => {
            Swal.fire("Oops", "Connection Timeout !!!", "error")
        })
    }


    locationDetect = () => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({name: "geolocation"})
                .then(
                    (result) => {
                        if (result.state === "granted") {
                            navigator.geolocation.getCurrentPosition(this.success);
                        } else if (result.state === "prompt") {
                            navigator.geolocation.getCurrentPosition(this.success, this.errors, options);
                        } else if (result.state === "denied") {
                            navigator.geolocation.getCurrentPosition(this.errors);
                        }
                        result.onchange = function () {
                            console.log(result.state);
                        };
                    });
        } else {
            alert("Sorry Not available!");
        }
    }

    success = (pos) => {
        const crd = pos.coords;
        this.getWeatherData(crd.latitude, crd.longitude)
        this.getLocationData(crd.latitude, crd.longitude)
        Swal.fire(
            'Location Granted',
            '',
            'success'
        )
    }

    errors = (err) => {
        Swal.fire(
            'Location Access Needed',
            'Please Allow Sites to Access your Location',
            'warning'
        ).then(r => console.log(r))
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }


    componentDidMount() {
        this.locationDetect()
    }

    render() {
        const data = this.state.weatherData
        const curentLocation = this.state.location.name
        const currentDay = new Date();
        return (
            <div className="container-fluid my-5">
                {this.state.isLoaded ?
                    <>
                        <section className="latestData">
                            <div className="row">
                                <div className="col-12 col-md-4 col-lg-4 mb-5">
                                    <h5>Now</h5>
                                    <WeatherNow day={currentDay.toDateString()}
                                                location={curentLocation}
                                                icon={data.current.weather[0].icon}
                                                temperature={data.current.temp}
                                                description={data.current.weather[0].description}
                                    />
                                </div>
                                <div className="col-12 col-md-8 col-lg-8">
                                    <h5>48 Hour From Now</h5>
                                    <OwlCarousel ref="car" options={next48Hours} events={this.events}>
                                        {data.hourly.map((dataList) =>
                                            <Weather48Hour
                                                date={epochToDate(dataList.dt).fullDate}
                                                hour={epochToDate(dataList.dt).hour}
                                                icon={dataList.weather[0].icon}
                                                temperature={dataList.temp}
                                                description={dataList.weather[0].description}

                                            />
                                        )}
                                    </OwlCarousel>
                                </div>
                            </div>
                        </section>
                        <section className="main">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-6 mb-5">
                                    <h5>Today's Datas</h5>
                                    <WeatherTodayDatas
                                        humidity={data.current.humidity}
                                        clouds={data.current.clouds}
                                        wind={data.current.wind_speed}
                                        pressure={data.current.pressure}
                                        sunrise={epochToDate(data.current.sunrise).hour}
                                        sunset={epochToDate(data.current.sunset).hour}

                                    />
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 mb-5">
                                    <h5>7 Days From Now</h5>
                                    <OwlCarousel ref="car" options={next7Days} events={this.events}>
                                        {data.daily.map((dataList, index) =>
                                            <Weather7Day
                                                date={epochToDate(dataList.dt).fullDate}
                                                hour={epochToDate(dataList.dt).hour}
                                                icon={dataList.weather[0].icon}
                                                temperature={dataList.temp.max}
                                                description={dataList.weather[0].description}
                                            />
                                        )}
                                    </OwlCarousel>
                                </div>
                            </div>

                        </section>
                        <section className="sunSchedule">
                            <div className="col-12">
                                <h5>Sunrise & Sunset Schedule</h5>
                                <OwlCarousel ref="car" options={sunSchedule} events={this.events}>
                                    {data.daily.map((dataList, index) =>
                                        <SunSchedule
                                            date={epochToDate(dataList.dt).fullDate}
                                            sunrise={epochToDate(dataList.sunrise).hour}
                                            morningtemp={dataList.temp.morn}
                                            sunset={epochToDate(dataList.sunset).hour}
                                            evetemp={dataList.temp.eve}
                                            description={dataList.weather[0].description}
                                        />
                                    )}
                                </OwlCarousel>
                            </div>

                        </section>
                    </>
                    : <p>false</p>
                }

            </div>
        );
    }

}

export default Layout;