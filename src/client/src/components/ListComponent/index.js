import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ListComponent extends Component {
  render() {
    const { data } = this.props;
    return (
      //   <ul class="list-group">
      //     {data.map((item) => (
      //       <address class="list-group-item">{`${item.name}`}</address>
      //     ))}
      //   </ul>
      <div class="list-group">
        {data.map((item) => (
          <Link
            to={`/items/${item._id}`}
            class="list-group-item list-group-item-action"
          >{`${item.name}`}</Link>
        ))}
      </div>
    );
  }
}
