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
    handleOnChangeInput = (event) =>{
        this.setState({
            name: event.target.value
        })
    }
    handleOnSumit(event){
        event.preventDefault()
        // alert("me");
        console.log(this.state);
        
    }
    // JSX
    render() {
        return (
            <div>
                Tôi tên là {this.state.name} Tuổi {this.state.age}
                <form onSubmit={(event) => {this.handleOnSumit(event)}} action="">
                    <input type="text" onChange={(event) => {this.handleOnChangeInput(event)}}/>
                    <button>submit</button>
                </form>
            </div>
        )
    }
}
export default MyComponent