import React from 'react'
import ReactDOM from 'react-dom'
import {getCountries} from "./services/populationApi";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            countriesLoading: true
        };
    }

    componentDidMount() {

        getCountries().then((countries) => {
            this.setState({
                countries,
                countriesLoading: false
            });
        })
    }


    render() {
        const {countries, countriesLoading} = this.state;
        
        return (
            <div className="container">
                <div className="title">Population Count</div>

                <div className="formContainer">
                    <div className="selectContainer">
                        <div className="label">Country:</div>
                        <select className="select">
                            {countriesLoading ? <option>Loading...</option> : (
                                countries.map(country => {
                                    return (
                                        <option>{country}</option>
                                    )
                                })
                            )}
                        </select>
                    </div>
                    <div className="selectContainer">
                        <div className="label">Year:</div>
                        <select className="select"></select>
                    </div>
                </div>

                <div className="results">
                    Results
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
