import React, { Component } from "react";

export class Test extends Component {
  state = {
    title: "",
    body: ""
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }

  //   componentWillMount() {
  //     console.log("component will mount...");
  //   }

  //   componentDidUpdate() {
  //     console.log("component did update...");
  //   }

  //   componentWillUpdate() {
  //     console.log("component will update...");
  //   }

  //   componentWillReceiveProps(nextProps: {}, prevState: {}) {
  //     console.log("component will receive props and state...");
  //   }

  //   static getDerivedStateFromProps(nextProps: {}, prevState: {}) {
  //     return {
  //       test: "something"
  //     };
  //   }

  //   getSnapshotBeforeUpdate(prevProps: {}, prevState: {}) {
  //     console.log("getSnapshotBeforeUpdate...");
  //   }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
