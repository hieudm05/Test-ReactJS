import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
class DisplayInfor extends React.Component {
    state = {
        isShow: true
    }
    handleShowHide = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render() {
        console.log(this.props);
        const { listUser } = this.props; //Obj
        // console.log(listUser);
        return (

            <div className="display-info-container">
            <img src={logo} alt=""/>
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShow === true ? "Hide list user:" : "Show now"}
                    </span>
                    {this.state.isShow &&
                        <div>
                            {listUser.map((user) => {
                                //Cách convert từ chuỗi sang number
                                let check = +user.age < 21 ? "red" : "green";
                                return (
                                    <div key={user.id} className={check}>
                                        <div style={{color: "blue",paddingTop: "50px"}}>My name {user.name} </div>
                                        <div>Age {user.age}</div>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>}
                </div>

            </div>
        )
    }
}
export default DisplayInfor