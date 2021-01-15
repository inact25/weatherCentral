import React, {Component} from 'react';

class WeatherNow extends Component {
    render() {
        const {day, location, icon, temperature, description} = this.props
        return (
            <div>
                <div className="card">
                    <div className="card-body text-center p-4">
                        <p>{day}</p>
                        <p>{location}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${icon}.png`}
                            className="img-fluid"/>
                        <h5>{temperature}<sup>o</sup>F</h5>
                        <h5>{description}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherNow;