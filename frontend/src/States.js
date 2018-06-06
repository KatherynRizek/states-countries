import React from 'react';

const urlStart = 'http://localhost:8000/countries/'
const urlEnd = '/states/';

export class States extends React.Component {

     constructor(props) {
        super(props);
        this.state = {
            stateInfo: ['No states entered. Enter one below!'],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentWillReceiveProps(nextProps) {
        let fullURL = urlStart + nextProps.countryCode + urlEnd;
        console.log(fullURL);
        fetch(fullURL)
            .then((response) => { return response.json() })
            .then((response) => {
                this.setState({stateInfo: response});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

     render() {

         //adjust to give statement if none available
         //if this.state.stateInfo == null 


        let organizeStates = this.state.stateInfo
        organizeStates.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) 
                return -1 
            if (nameA > nameB)
                return 1
            return 0 
        })

        let optionItems = this.state.stateInfo.map((options) =>
                <option key={options.code}>{options.name}</option>
            );
            
        return (
            <div>
                <label>
                    Pick your state:
                    <select onChange={this.handleChange}>
                        {optionItems}
                    </select>
                </label>
                <br /><br />
            </div>
        );
    }

}