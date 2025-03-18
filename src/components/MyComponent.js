// class components
import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    // JSX
    render() {
        return (
            <div>
                <UserInfor/>
                <br/>
                <br/>
                <DisplayInfor name="Hiếu" age="20"/>
            </div>
        )
    }
}
export default MyComponent