import { LogoutRounded } from "@mui/icons-material";
import Cookie from "cookie-universal";

import { useNavigate } from "react-router-dom";

export default function Logout(menuActive) {
  const cookie = Cookie();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("cookie.remove");
    cookie.removeAll();
    sessionStorage.clear();
    navigate("/login");
    console.log("Logged out");
  };

  async function handleLogoutClick() {
    try {
      handleLogout();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      style={{
        background: "transparent",
        justifyContent: open ? "center" : "initial",
        padding: 2.5,
      }}
      onClick={handleLogoutClick}
    >
      <LogoutRounded />
      {menuActive && <span>Logout</span>}
    </button>
  );
}
