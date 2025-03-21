// class components
import React, { Fragment, useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component{
//     state = {
//         listUser: [
//             {
//                 id: 1,
//                 name: "Hiếu",
//                 age: '20'
//             },
//             {
//                 id: 2,
//                 name: "Hiếu 2",
//                 age: '25'
//             },
//             {
//                 id: 3,
//                 name: "Hiếu 3",
//                 age: '50'
//             }
//         ]
//     }
//     handleAddNewUser = (userObj) => {
//         this.setState({
//             listUser: [userObj, ...this.state.listUser]
//         })
//     }
//     handleDeleteUser = (idUser) =>{
//         const listUserClone = [...this.state.listUser];
//         this.setState({
//             listUser: listUserClone.filter(item => item.id !== idUser)
//         })
//     }
//     // JSX
//     render() {
//         // const test = {name: "Minh hiếu", age: 45}
//         return (
//             //Fragment
//             <>
//             {/* {JSON.stringify(test)} */}
//                 <div>
//                     <AddUserInfor
//                         handleAddNewUser={this.handleAddNewUser} />
//                     <br />
//                     <br />
//                     <DisplayInfor
//                         listUser={this.state.listUser}
//                         handleDeleteUser = {this.handleDeleteUser}
//                     />
//                 </div>
//             </>
//         )
//     }
// }
const MyComponent = (props) => {
    const [listUser, setListUser] = useState(
        [
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
    )
    const handleAddNewUser = (userObj) => {
        setListUser([userObj, ...listUser])
    }
    const handleDeleteUser = (idUser) => {
        setListUser(listUser.filter(item => item.id !== idUser))
    }

    
    return (
        //    Fragment
        <>
            {/* {JSON.stringify(test)} */}
            <div>
                <AddUserInfor
                    handleAddNewUser={handleAddNewUser} />
                <br />
                <br />
                <DisplayInfor
                    listUser={listUser}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>
        </>
    )
}
export default MyComponent