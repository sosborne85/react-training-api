import React from 'react'
import ReactDOM from 'react-dom'
import {getCountries} from "./services/populationApi";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: []

        };
    }

    componentDidMount() {
        
        getCountries().then((countries)=> {
            this.setState({
                countries
            });
        })
    }


    render() {
        return (
            <div>
                <div>Population Count</div>
                <ul>
                {
                    this.state.countries.map((country) => {
                        return (
                            <li key={country}>{country}</li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
