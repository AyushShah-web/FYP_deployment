import AdminProfile from "./Admin/AdminProfile";
import TenantProfile from "./Tenant/TenantPage";
import LandlordProfile from "./Lanlord/LandlordProfile";
import { useSelector } from "react-redux";
import showToast from "../ShowToast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  if (userData.type == "admin") {
    return <AdminProfile />;
  } else if (userData.type == "landlord") {
    return <LandlordProfile />;
  } else if (userData.type == "tenant") {
    return <TenantProfile />;
  } else {
    showToast("error", "Something went wrong");
    navigate("/login");
  }
};

export default Profile; 
