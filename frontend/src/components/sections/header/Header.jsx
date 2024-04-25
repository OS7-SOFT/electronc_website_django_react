import React from "react";
import { useSelector } from "react-redux";
import { CenterHeader, TopHeader, BottomHeader } from "../..";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <TopHeader userInfo={userInfo} />
      <CenterHeader userInfo={userInfo} />
      <BottomHeader />
    </>
  );
};

export default Header;
