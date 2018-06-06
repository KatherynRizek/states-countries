import React from 'react';

//const url = 'https://xc-ajax-demo.herokuapp.com/api/countries/';
const urlAllStates = 'http://localhost:8000/states/'
const urlCountries = 'http://localhost:8000/countries/'
const urlSomeStatesStart = 'http://localhost:8000/countries/'
const urlSomeStatesEnd = '/states/'

export class ViewCountries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    showListWhenClicked = (url) => {
        console.log("test")
        console.log(url)
        window.open(url, '_blank');
        //win.focus();
    }

//alternative to binding; a member variable instead
//     handleSubmit = () => {
//         let jsonBody = JSON.stringify({
//                 name: this.state.name,
//                 code: this.state.code
//             });
//         fetch(url, {
//             method: 'POST',
//             //mode: 'no-cors',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: jsonBody,
//         }).then(response=> {
//             if (!response.ok) {
//                 throw new Error('Request failed!: ' + response.ok);
//             }
            
//         }, networkError => console.log(networkError.message)
//         ).then(jsonResponse => {
//             return jsonResponse;
//         });
//   }

    render() {
        return (
            <form >
                <h2><br />Click the button to get a list of countries entered:    </h2>
                <button type="button" onClick={this.showListWhenClicked(urlCountries)}>View Countries</button><br /><br />
            </form>
        );
    }
}
