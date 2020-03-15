import React from "react";

class Search3 extends React.Component {
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      const value = e.target.value;
      alert(`The value of the input field is ${value}`);
    }
  };

  render() {
    return <input onKeyDown={this.handleKeyDown} type="text" name="username" placeholder="Enter username" />;
  }
}

export default Search3;
