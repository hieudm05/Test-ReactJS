import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
class DisplayInfor extends React.Component {
    constructor(props) {
        console.log("call contructer: 1")
        super(props);
        this.state = {
            isShow: true
        }
    }
    handleShowHide = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    componentDidMount() {
        console.log("call me component did mount")
        setTimeout(() => {
            document.title = "Test"
        },2000)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log("Call update",this.props, prevProps);
        if(this.props.listUser  !== prevProps.listUser){
            if(this.props.listUser.length === 2){
                alert("Bạn có 2 users")
            }
        }
    }

    render() {
        console.log(this.props);
        const { listUser } = this.props; //Obj
        console.log("call me render")
        // console.log(listUser);
        return (
            <div className="display-info-container">
                {/* <img src={logo} alt=""/> */}
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
                                        <div style={{ color: "blue", paddingTop: "50px" }}>My name {user.name} </div>
                                        <div>Age {user.age}</div>
                                        <button onClick={id => this.props.handleDeleteUser(user.id)}>X</button>
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