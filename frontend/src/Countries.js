import React from 'react';

//const url = 'https://xc-ajax-demo.herokuapp.com/api/countries/';
const url = 'http://localhost:8000/countries/';

export class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryInfo: [],
            value: ''
        };
    }

    componentDidMount() {
        fetch(url)
            .then((response) => { return response.json() })
            .then((response) => {
                this.setState({countryInfo: response});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    

    render() {

        let organizeCountries = this.state.countryInfo
        organizeCountries.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        })

        let optionItems = this.state.countryInfo.map((options, i) =>
                <option key={i} value={options.code}>{options.name}</option>
            );

        return (
            <div>
                <h2>Use the dropdown to see available countries and associated states:<br/></h2>
                <label>
                    Pick your country:
                    <select onChange={this.props.handleChange}>
                        {optionItems}
                    </select>
                <br /><br />
                </label>
            </div>
        );


    }
}

