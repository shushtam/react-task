import React, { Component } from 'react'
import axios from 'axios'


const { API_KEY } = process.env
const API_URL = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=true'

const Suggestions = (props) => {
    const options = props.results.map(r => (
        <li key={r.id}>
            {r.name}
        </li>
    ))
    return <ul>{options}</ul>
}
class Search extends Component {
    state = {
        query: '',
        results: []
    }

    getInfo = () => {
        axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=5`)
            .then(({ data }) => {
                this.setState({
                    results: data.data
                })
            })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            } else if (!this.state.query) {
            }
        })
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <Suggestions results={this.state.results} />
            </form>
        )
    }
}

export default Search
