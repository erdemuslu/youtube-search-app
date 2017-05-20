require('../style/build.sass');

import React, {Component} from 'react'
import {render} from 'react-dom'
import Header from './components/header'
import Search from './components/search'
import List from './components/list'
import YTSearch from 'youtube-api-search'

const API_KEY = 'AIzaSyDjERV3mpPYgihzjurvhjncJHYwCq4RXkM'; // ADD API KEY

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completedSearch: false,
            listView: false,
            term: '',
            youtube: {
                videoId: '',
            }
        };
        this.completedSearch = this.completedSearch.bind(this);
        this.backHome = this.backHome.bind(this)
    }

    render() {
        return (
            <div className="container">
                <Header
                    onClick={this.backHome}
                />
                <List
                    data={this.state.videos}
                    visibility={this.state.listView}
                />
                <Search
                    position={this.state.completedSearch}
                    onClick={this.completedSearch}
                />
            </div>
        )
    }

    completedSearch(event) {
        event.preventDefault();
        this.setState({
            completedSearch: true,
            listView: true
        });
        YTSearch({key: API_KEY, term: event.target.value}, (videos) => {
            this.setState({
                videos: videos
            })
        })
    }

    backHome() {
        this.setState({
            completedSearch: false,
            listView: false,
            videos: null
        })
    }
}

render(<App />, document.getElementById('app'));