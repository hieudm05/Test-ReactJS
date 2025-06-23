import NavDropdown from "react-bootstrap/NavDropdown";

const  Language = (props) => {
    return (
        <>
        <NavDropdown title="VN" id="basic-nav-dropdown2" className="languages">
                <NavDropdown.Item>EN</NavDropdown.Item>
                <NavDropdown.Item>VN</NavDropdown.Item>
              </NavDropdown>
        </>
    )

}
export default Language;