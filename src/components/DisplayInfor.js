import React, { useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
// class DisplayInfor extends React.Component {
//     render() {
//         console.log(this.props);
//         const { listUser } = this.props; //Obj
//         console.log("call me render")
//         // console.log(listUser);
//         return (
//             <div className="display-info-container">
//                 {/* <img src={logo} alt=""/> */}
//                 <div>
//                     {true &&
//                         <div>
//                             {listUser.map((user) => {
//                                 //Cách convert từ chuỗi sang number
//                                 let check = +user.age < 21 ? "red" : "green";
//                                 return (
//                                     <div key={user.id} className={check}>
//                                         <div style={{ color: "blue", paddingTop: "50px" }}>My name {user.name} </div>
//                                         <div>Age {user.age}</div>
//                                         <button onClick={id => this.props.handleDeleteUser(user.id)}>X</button>
//                                         <hr />
//                                     </div>
//                                 )
//                             })}
//                         </div>}
//                 </div>
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { listUser } = props; //Obj
    const [isShowList, setShowHide] = useState(true);
    const handleShowHide = () =>{
        setShowHide(!isShowList)
    }
    return (
        <div className="display-info-container">
            <div>
                <span onClick={() => handleShowHide()}>
                    {isShowList === true ? "hide list" : "show list"}
                </span>
            </div>
            <div>
                {isShowList &&
                    <div>
                        {listUser.map((user) => {
                            //Cách convert từ chuỗi sang number
                            let check = +user.age < 21 ? "red" : "green";
                            return (
                                <div key={user.id} className={check}>
                                    <div style={{ color: "blue", paddingTop: "50px" }}>My name {user.name} </div>
                                    <div>Age {user.age}</div>
                                    <button onClick={id => props.handleDeleteUser(user.id)}>X</button>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>}
            </div>
        </div>
    )
}
export default DisplayInfor