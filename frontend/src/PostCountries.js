import React from 'react';

//const url = 'https://xc-ajax-demo.herokuapp.com/api/countries/';
const url = 'http://localhost:8000/countries/'

export class PostCountries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
    }

    handleChangeName(event) {

        this.setState({ name: event.target.value });

    }

    handleChangeCode(event) {
        
        this.setState({ code: event.target.value });

    }
//alternative to binding; a member variable instead
    handleSubmit = () => {
        let jsonBody = JSON.stringify({
                name: this.state.name,
                code: this.state.code
            });
        fetch(url, {
            method: 'POST',
            //mode: 'no-cors',
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
                <h2>Fill out the form to post a new country:</h2>
                <label>
                    Please enter your country:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChangeName} />
                </label>
                <br /><br />
                <label>
                    Please enter the two letter associated country code: 
                    <input type="text" name="code" value={this.state.code} onChange={this.handleChangeCode} />
                </label>
                <button type="button" onClick={this.handleSubmit}>Submit</button><br /><br />
            </form>
        );
    }
}
