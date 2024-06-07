import React from "react";
import styled from "styled-components";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const NavTabs = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const NavTab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background: none;
  border: 2px solid #007bff;
  border-radius: 5px;
  color: #007bff;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #007bff;
    color: white;
  }

  &.active {
    background-color: #007bff;
    color: white;
  }
`;

const Block = () => {
  const [activeTab, setActiveTab] = React.useState("profile");

  return (
    <SettingsContainer>
      <NavTabs>
        <NavTab
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Edit Profile
        </NavTab>
        <NavTab
          className={activeTab === "password" ? "active" : ""}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </NavTab>
      </NavTabs>
      {activeTab === "profile" && <ProfileForm />}
      {activeTab === "password" && <PasswordForm />}
    </SettingsContainer>
  );
};

export default Block;
