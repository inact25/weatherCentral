import React, {Component} from 'react';

class Weather7Day extends Component {
    render() {
        const {date, hour, icon, temperature, description} = this.props
        return (
            <div>
                <div className="card mb-5">
                    <div className="card-body p-4 py-5 text-center">
                        <p>{date}</p>
                        <p>{hour}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${icon}.png`}
                            style={{width: 50 + "px"}} className="img-fluid m-auto"/>
                        <h5>{temperature}<sup> o</sup>F</h5>
                        <h5>{description}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather7Day;