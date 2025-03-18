import React from "react";
class DisplayInfor extends React.Component{
    render(){
        console.log(this.props);
        const {age, name} = this.props; //Obj
        return(
            <div>
                <div>My name is {name} </div>
                <div>Age: {age}</div>
            </div>
        )
    }
}
export default DisplayInfor