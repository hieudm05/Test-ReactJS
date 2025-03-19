// class components
import React, { Fragment } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component{
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
    handleAddNewUser = (userObj) => {
        this.setState({
            listUser: [userObj, ...this.state.listUser]
        })
    }
    // JSX
    render() {
        return (
            //Fragment
            <>
                <div>
                    <AddUserInfor
                        handleAddNewUser={this.handleAddNewUser} />
                    <br />
                    <br />
                    <DisplayInfor
                        listUser={this.state.listUser}
                    />
                </div>
            </>
        )
    }
}
export default MyComponent