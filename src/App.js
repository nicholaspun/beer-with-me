import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import './App.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      beerData: []
    }
  }

  componentDidMount() {
    axios.get('https://beer-necessities.herokuapp.com/beers')
      .then((res) => {
        this.setState({beerData: res.data});
      })
  }

  render() {
    const { beerData } = this.state;
    const { SearchBar } = Search;

    const columns = ['Name', 'Brewery', 'Rating'].map(col => ({ dataField: col, text: col }));

    const expandRow = {
      renderer: row => (
        <React.Fragment>
          <div><b>Look</b>: {row.Description}</div>
          <div><b>Aroma</b>: {row.Aroma}</div>
          <div><b>Taste</b>: {row.Taste}</div>
          <div><b>Finish</b>: {row.Finish}</div>
        </React.Fragment>
      )
    };

    return (
      <div className="App">
        <ToolkitProvider
          keyField="Name"
          data={ beerData }
          columns={ columns }
          search
        >
          {
            props => (
              <div>
                <h3>Search for beers below: </h3>
                <SearchBar { ...props.searchProps } />
                <hr />
                <BootstrapTable
                  { ...props.baseProps }
                  expandRow = { expandRow }
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>
    );
  }
}
