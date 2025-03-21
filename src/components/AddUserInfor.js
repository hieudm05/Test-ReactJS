import React, { useState } from "react";
// class AddUserInfor extends React.Component {
//     state = {
//         name: "Minh Hiếu",
//         address: "Ninh Bình",
//         age: 20
//     };

//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }
//     handleOnChangeInputAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }
//     handleOnSumit(event) {
//         event.preventDefault()
//         // alert("me");
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + "-random",
//             name: this.state.name,
//             age: this.state.age
//         })

//     }
//     render() {
//         return (
//             <div>
//                 Tôi tên là {this.state.name} Tuổi {this.state.age}
//                 <form onSubmit={(event) => { this.handleOnSumit(event) }} action="">
//                     <label htmlFor="name">Họ và tên</label> <br />
//                     <input type="text" onChange={(event) => { this.handleOnChangeInput(event) }} value={this.state.name} />
//                     <br />
//                     <label htmlFor="age">Tuổi</label> <br />
//                     <input type="text" onChange={(envet) => { this.handleOnChangeInputAge(envet) }} value={this.state.age} />
//                     <button>submit</button>
//                 </form>
//             </div>
//         )
//     }
// }
const AddUserInfor = (props) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("Ninh Bình");
    const [age, setAge] = useState(35);

    const handleOnChangeInput = (event) => {
        setName(event.target.value)
    }
    const handleOnChangeInputAddress = (event) => {
        setAddress(event.target.value)
    }
    const handleOnChangeInputAge = (event) => {
        setAge(event.target.value)
    }
    const handleOnSumit = (event) => {
        event.preventDefault()
        // alert("me");
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + "-random",
            name: name,
            age: age
        })

    }
    return (
        <div>
            Tôi tên là {name} Tuổi {age}
            <form onSubmit={(event) => {handleOnSumit(event) }} action="">
                <label htmlFor="name">Họ và tên</label> <br />
                <input type="text" onChange={(event) => {handleOnChangeInput(event) }} value={name} />
                <br />
                <label htmlFor="age">Tuổi</label> <br />
                <input type="text" onChange={(envet) => {handleOnChangeInputAge(envet) }} value={age} />
                <button>submit</button>
            </form>
        </div>
    )
}
export default AddUserInfor