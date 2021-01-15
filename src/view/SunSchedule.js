import React, {Component} from 'react';
import {WiSunrise, WiSunset} from "react-icons/all";

class SunSchedule extends Component {
    render() {
        const {date, sunrise, sunset, evetemp, morningtemp} = this.props
        return (
            <div>
                <div className="card mb-5">
                    <div className="card-body p-4 py-5 text-center">
                        <p>{date}</p>
                        <h1 className="m-1 iconShaddow"><WiSunrise/></h1>
                        <p>{sunrise}</p>
                        <h5>{morningtemp}<sup> o</sup>F</h5>
                        <h1 className="m-1 iconShaddow"><WiSunset/></h1>
                        <p>{sunset}</p>
                        <h5>{evetemp}<sup> o</sup>F</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default SunSchedule;