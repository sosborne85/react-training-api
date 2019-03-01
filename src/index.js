import React from 'react'
import ReactDOM from 'react-dom'
import {getCountries, getCountryYearPopulation} from "./services/populationApi";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            countriesLoading: true,
            selectedCountry: '',
            selectedYear: '',
            population: 0
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

    componentDidUpdate(previousProps, previousState) {
        if((this.state.selectedCountry === previousState.selectedCountry) && (this.state.selectedYear === previousState.selectedYear)) {
            return;
        }

        if(this.state.selectedYear && this.state.selectedCountry) {
            this.fetchPopulation();
        }
    }

    fetchPopulation() {
        getCountryYearPopulation(this.state.selectedCountry, this.state.selectedYear).then((population) => {
            this.setState({
                population
            });
        })
    }

    render() {
        const {countries, countriesLoading} = this.state;
        const years = Array.from({length: (2018 - 1950)}, (v, k) => k + 1950);
        
        return (
            <div className="container">
                <div className="title">Population Count</div>

                <div className="formContainer">
                    <div className="selectContainer">
                        <div className="label">Country:</div>
                        <select className="select"
                                value={this.state.selectedCountry}
                                onChange={(event) => {
                                    this.setState({
                                        selectedCountry: event.target.value
                                    });
                                }}>
                            {countriesLoading ? <option>Loading...</option> : (
                                countries.map(country => {
                                    return (
                                        <option key={country}>{country}</option>
                                    )
                                })
                            )}
                        </select>
                    </div>
                    <div className="selectContainer">
                        <div className="label">Year:</div>
                        <select className="select"
                                value={this.state.selectedYear}
                                onChange={(event) => {
                                    this.setState({
                                        selectedYear: event.target.value
                                    });
                                }}>
                            {countriesLoading ? <option>Loading...</option> : (
                                years.map(year => {
                                    return (
                                        <option key={year}>{year}</option>
                                    )
                                })
                            )}
                        </select>
                    </div>
                </div>

                <div className="results">
                    Results: {this.state.population}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
