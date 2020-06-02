import React, { Component } from "react";
import qs from "qs";
import axios from "axios";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      itemType: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      itemType: this.state.itemType,
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTVlOWM2N2E1NTQ2NGQwODVlYzUwYSIsIm5hbWUiOiJhbndhciIsImlhdCI6MTU4Nzk1NzQ4NCwiZXhwIjoxNTg3OTYxMDg0fQ.XPmk45fcG9VeWi2NmTL2mnZdF6CBse5bEx9aDz8soUc",
      },
      data: qs.stringify(data),
      url: "http://localhost:5000/api/items",
    };
    axios(options);
    this.setState({ name: "", itemType: "" });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form class="m-3" onSubmit={this.onSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Item Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={this.state.name}
            placeholder="Enter Item Name"
            onChange={this.onChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Item Type</label>
          <input
            type="text"
            class="form-control"
            id="itemType"
            name="itemType"
            value={this.state.itemType}
            placeholder="Enter Item Type"
            onChange={this.onChange}
          />
        </div>
        <input type="submit" title="Submit" class="btn btn-primary" />
      </form>
    );
  }
}
