import React from "react";

export const Items = ({ match }) => {
  return (
    <div>
      <h1>Welcome user {match.params.id}</h1>
    </div>
  );
};
