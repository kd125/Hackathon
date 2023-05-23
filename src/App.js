import "./App.css";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: "",
      date: "",
      author: "",
      articles: [],
    };
  }

  onSearch = (e) => {
    this.setState({ searchWord: e.target.value });
  };

  onDate = (e) => {
    this.setState({ date: e.target.value });
  };

  onAuthor = (e) => {
    this.setState({ author: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://hn.algolia.com/api/v1/search?query=${this.state.searchWord}`
      )
      .then((response) => {
        this.setState({ articles: response.data.hits });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSubmitAuthDate = (e) => {
    const { author, date } = this.state;
    e.preventDefault();
    let apiUrl = "https://hn.algolia.com/api/v1/search?";
    if (author) {
      apiUrl += `query=${author}&tags=story`;
    }
    if (date) {
      apiUrl += `numericFilters=created_at_i>${
        Date.parse(date) / 1000
      }&tags=story`;
    }
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ articles: response.data.hits });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <form onSubmit={this.onSubmit}>
            <input
              className="searchBox"
              type="text"
              placeholder="Search"
              onChange={this.onSearch}
            />
            <input type="submit" value="Search" />
          </form>
          <form onSubmit={this.onSubmitAuthDate}>
            <input
              className="searchBox"
              type="text"
              placeholder="Author"
              onChange={this.onAuthor}
            />
            <input
              className="searchBox"
              type="text"
              placeholder="Date"
              onChange={this.onDate}
            />
            <input type="submit" value="Search" />
          </form>
        </div>
        <ul>
          {this.state.articles.map((item) => (
            <li className="search-list" key={item.objectID}>
              <a href={item.url}>{item.title}</a> - {item.author}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
