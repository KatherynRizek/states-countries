import React from 'react';

// const urlStart = 'https://xc-ajax-demo.herokuapp.com/api/countries/'
const urlStart = 'http://localhost:8000/countries/';
const urlEnd = '/states/';

export class PostStates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            countryCode: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeCountryCode = this.handleChangeCountryCode.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeCode(event) {
        this.setState({ code: event.target.value });
    }

    handleChangeCountryCode(event) {
        this.setState({ countryCode: event.target.value });
    }
    //alternative to binding; a member variable instead
    handleSubmit = () => {
        let jsonBody = JSON.stringify({
                name: this.state.name,
                code: this.state.code
            });
        fetch(urlStart + this.state.countryCode + urlEnd, {
            method: 'POST',
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
        return (
            <form >
                <h2>Fill out the form to post a new state:</h2>
                <label>
                    Please enter the two letter country code for your new state: 
                    <input type="text" name="countryCode" value={this.state.countryCode} onChange={this.handleChangeCountryCode} />
                </label>
                <br /><br />
                <label>
                    Please enter your state: 
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChangeName} />
                </label>
                <br /><br />
                <label>
                    Please enter the two letter associated state code: 
                    <input type="text" name="code" value={this.state.code} onChange={this.handleChangeCode} />
                </label>
                <button type="button" onClick={this.handleSubmit}>Submit</button>
            </form>
        );
    }
}