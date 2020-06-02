import React, { Component } from "react";
import axios from "axios";
import ListComponent from "../ListComponent";
import Form from "../Form";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    // Make a request for a user with a given ID
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => {
        // handle success
        console.log(response);
        this.setState({ items: response.data }, () =>
          console.log("Items fetched...", response.data)
        );
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  render() {
    return (
      <div>
        <h1>All Items</h1>
        <ListComponent data={this.state.items} />
        <h1>Add Item</h1>
        <Form />
      </div>
    );
  }
}
