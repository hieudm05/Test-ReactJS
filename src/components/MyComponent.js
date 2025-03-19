// class components
import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    state = {
        listUser: [
            {
                id: 1,
                name: "Hiếu",
                age: '20'
            },
            {
                id: 2,
                name: "Hiếu 2",
                age: '25'
            },
            {
                id: 3,
                name: "Hiếu 3",
                age: '50'
            }
        ]
    }
    // JSX
    render() {
        return (
            <div>
                <UserInfor />
                <br />
                <br />
                <DisplayInfor listUser={this.state.listUser} />
            </div>
        )
    }
}
export default MyComponent