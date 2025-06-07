import React from "react";

class Contact extends React.Component {
  constructor(props) {
    console.log("Children Contructor");
    super(props);
    console.log("props->", props);
    this.state = {
      count: 0,
      count2: 2,
      data:{}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this); // Binding the method
  }
  handleClick2 = () => {
    this.setState({ count2: this.state.count2 + 2 });
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

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  };

  componentDidMount() {
    console.log("Child get mounted");
  }
  componentDidUpdate()
  {
    console.log("child updated")
  }

  render() {
    console.log("Children render");
    return (
      <div id="contact">
        <img src={this.state.data.avatar_url} alt="asv02"/>
        <h2 onClick={this.props.onClick}>incrment About count</h2>
        <h1>Contact:{this.props.number}</h1>
        <h1 onClick={this.handleClick}>Name:</h1>
        <h2 onClick={this.handleClick2}>
          Akash Suryavanshi-{this.state.count}-{this.state.count2}
        </h2>
      </div>
    );
  }
}

export default Contact;
