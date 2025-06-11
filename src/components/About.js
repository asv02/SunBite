import React from "react";
import { Outlet } from "react-router";
import Contact from "./Contact";
import Shimmer from "./Shimmer";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: {},
    };
    console.log("Parent Contructor");
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  componentDidMount() {
    console.log("Parent get mounted");
    const apiCall = (async () => {
      const temp = await fetch("https://api.github.com/users/asv02");
      const json = await temp.json();
      this.setState({ data: json });
      return json;
    })();
  }

  componentDidUpdate() {
    console.log("Parnet uodated...");
  }

  render() {
    console.log("parent render");
    // if (this.state.data.length == 0) {
    //   {
    //     return <Shimmer />;
    //   }
    // }

    return (
      <div>
        {console.log("data->", this.state.data)}
        {/* <h1>{this.state.data.name}</h1> */}
        <div>About components-{this.state.count}</div>
        <UserContext.Consumer>
          {(data) => {
            console.log("data in context->", data);
            return (<h1>UserId:{data.loggedInUser}</h1>)
          }}
        </UserContext.Consumer>
        <Contact onClick={this.handleClick} number={this.props.number} />
        <Contact onClick={this.handleClick} number={9919926010} />
        <Outlet />
      </div>
    );
  }
}

export default About;
