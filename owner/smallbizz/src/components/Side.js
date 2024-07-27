import { SidebarData } from "./SidebarData";
import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Side.css";

const StyledButton = styled(Button)`
  margin-top: 20px;
  margin-left: 60px;
  background-color: rgba(230, 74, 105, 0.553);
  &:hover {
    background-color: rgba(220, 20, 60, 0.796);
  }
`;

function Side() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, etc.)
    // For simplicity, let's assume we're just removing the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login", { replace: true });
  };

  return (
    <div className="Sidebar">
      <div className="sidebar-header">
        SMALL BIZZ
      </div>
      <ul className="Sidebarlist">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="row" onClick={() => { window.location.pathname = val.link }}>
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
      <StyledButton variant="contained" onClick={handleLogout}>
        Logout
      </StyledButton>
    </div>
  );
}

export default Side;
