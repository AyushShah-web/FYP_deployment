import React from "react";
import LandlordMessages from "./Lanlord/LandlordMessages";
import TenantMessages from "./Tenant/TenantMessages";
import { useSelector } from "react-redux";

const Messages = () => {
  const userData = useSelector((state) => state.user.userData);

  if (userData.type == "landlord") {
    return <LandlordMessages />;
  } else if (userData.type == "tenant") {
    return <TenantMessages />;
  } else {
    return <h1 className="text-3xl bg-red-700">Unathorized</h1>;
  }
};

export default Messages;
