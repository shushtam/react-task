import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';


class App extends Component {

    constructor() {
        super();
        this.state = {
            results: [],
            loading: true
        };
    }

    componentDidMount() {
        this.performSearch();
    }

    performSearch = (query = 'camping') => {
        let url = `http://api.flickr.com/services/feeds/photos_public.gne?tags=kitten&format=json&nojsoncallback=true`;
        axios.get(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'include'
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    results: responseData.results,
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render() {

        return (
            <div className = "App">
                <SearchPhotos onSearch = {this.performSearch} />
                <div>
                    {
                        (this.state.loading) ? <p>Loading</p> :<PhotoList results={this.state.results} />
                    }
                </div>
            </div>
        );
    }
}

export default App;

const PhotoList = props =>

    <ul>
        {props.results.map((result, index) =>
            <li key={index}>
                <img src={result.urls.small} key={result.id} />
            </li>
        )}
    </ul>;

class SearchPhotos extends Component {

    state = {
        searchText: ''
    }

    onSearchChange = e => {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.query.value);
        e.currentTarget.reset();
    }

    render() {
        return(
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search"
                       onChange={this.onSearchChange}
                       name="search"
                       ref={(input) => this.query = input}
                       placeholder="Search..." />
                <button className="search-button" type="submit" id="submit">Go!</button>
            </form>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));