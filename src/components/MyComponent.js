// class components
import React from "react";

class MyComponent extends React.Component {
    state = {
        name: "Minh Hiếu",
        address: "Ninh Bình",
        age: 20
    };

    handleClick = (event) =>{
        // console.log("click");
        console.log(this.state.name);
        // merge State => react class
        this.setState({
            name: "Minh Hiếu 2",
            age: Math.floor((Math.random() * 100)) + 1

        })
        
    }
    handleOnMouverOver (event){
        console.log(event);
        
    }
    // JSX
    render() {
        return (
            <div>
                Tôi tên là {this.state.name}
                Tuổi {this.state.age}
                <button onClick={(event) => {this.handleClick(event)}}>Click me</button>
                <button onMouseOver={this.handleOnMouverOver}>Click 2</button>

            </div>
        )
    }
}
export default MyComponent