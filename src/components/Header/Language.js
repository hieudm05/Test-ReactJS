import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";
import Flag_of_United_Kingdom from "../../assets/img/flag-en.png";
import Flag_of_Vietnam from "../../assets/img/flag-vi.png";
const Language = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const Flag_Vi = (
    <img
      src={Flag_of_Vietnam}
      alt="Flag of Vietnam"
      style={{
        width: "24px",
        height: "16px",
        objectFit: "cover",
        marginRight: "8px",
      }}
      className="flag-vi"
    />
  );
  const Flag_EN = (
    <img
      src={Flag_of_United_Kingdom}
      alt="Flag of United Kingdom"
      height={"20px"}
      style={{
        width: "24px",
        height: "16px",
        objectFit: "cover",
        marginRight: "8px",
      }}
      className="flag-en"
    />
  );
  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? Flag_Vi : Flag_EN}
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          EN
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          VI
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
