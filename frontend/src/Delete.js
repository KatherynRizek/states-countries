import React from 'react';
const url = 'http://localhost:8000/countries/';

export class DeleteCountry extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     countryInfo: [],
        //     value: ''
        // };
        this.state = {
            countryInfo: [],
            value: '',
            name: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete() {
        let jsonBody = JSON.stringify({
                name: this.state.name
            });
        fetch(url + this.state.name, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: jsonBody,
        }).then(response=> {
            if (!response.ok) {
                throw new Error('Request failed!: ' + response.ok);
            }
            
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            return jsonResponse;
        });
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
                <option key={i} value={options.name}>{options.name}</option>
            );

        return (
            <div>
                <h2>Use the dropdown to pick what country to remove from the database:<br/></h2>
                <label>
                    Pick your country:  
                    <select onChange={this.props.handleChange}>
                        {optionItems}
                    </select>
                </label> <br /><br />
                <button type="button" onClick={this.handleDelete}>Delete Country</button><br /><br />
            </div>
        );


    }
}
