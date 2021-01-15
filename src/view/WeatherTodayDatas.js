import React, {Component} from 'react';
import {BsCloud, IoSpeedometerOutline, IoWaterOutline, WiCloudyWindy, WiSunrise, WiSunset} from "react-icons/all";

class WeatherTodayDatas extends Component {
    render() {
        const {humidity, clouds, wind, pressure, sunrise, sunset} = this.props
        return (
            <div>
                <div className="card py-1">
                    <div className="card-body py-2">
                        <div className="row">
                            <div className="col-6 col-md-3 col-lg-3 text-center">
                                <h1 className="m-1 iconShaddow"><IoWaterOutline/></h1>
                                <h3 className="m-1">{humidity}%</h3>
                                <p>Humidity</p>
                            </div>
                            <div className="col-6 col-md-3 col-lg-3 text-center">
                                <h1 className="m-1 iconShaddow"><BsCloud/></h1>
                                <h3 className="m-1">{clouds}%</h3>
                                <p>Clouds</p>
                            </div>
                            <div className="col-6 col-md-3 col-lg-3 text-center">
                                <h1 className="m-1 iconShaddow"><WiCloudyWindy/></h1>
                                <h3 className="m-1">{wind} Mps</h3>
                                <p>Wind</p>
                            </div>
                            <div className="col-6 col-md-3 col-lg-3 text-center">
                                <h1 className="m-1 iconShaddow"><IoSpeedometerOutline/></h1>
                                <h3 className="m-1">{pressure} hPa</h3>
                                <p>Pressure</p>
                            </div>
                            <div className="col-6 col-md-6 col-lg-6 text-center">
                                <h1 className="m-1 iconShaddow"><WiSunrise/></h1>
                                <h3 className="m-1">{sunrise}</h3>
                                <p>Sunrise</p>
                            </div>
                            <div className="col-6 col-md-6 col-lg-6 text-center">
                                <h1 className="m-1 iconShaddow"><WiSunset/></h1>
                                <h3 className="m-1">{sunset}</h3>
                                <p>Sunset</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherTodayDatas;