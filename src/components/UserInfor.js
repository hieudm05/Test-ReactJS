import React from "react";
class UserInfor extends React.Component {
    state = {
        name: "Minh Hiếu",
        address: "Ninh Bình",
        age: 20
    };

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnChangeInputAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }
    handleOnSumit(event) {
        event.preventDefault()
        // alert("me");
        console.log(this.state);

    }
    render() {
        return (
            <div>
                Tôi tên là {this.state.name} Tuổi {this.state.age}
                <form onSubmit={(event) => { this.handleOnSumit(event) }} action="">
                    <label htmlFor="name">Họ và tên</label> <br />
                    <input type="text" onChange={(event) => { this.handleOnChangeInput(event) }} value={this.state.name} />
                    <br />
                    <label htmlFor="age">Tuổi</label> <br />
                    <input type="text" onChange={(envet) => { this.handleOnChangeInputAge(envet) }} value={this.state.age} />
                    <button>submit</button>
                </form>
            </div>
        )
    }
}
export default UserInfor