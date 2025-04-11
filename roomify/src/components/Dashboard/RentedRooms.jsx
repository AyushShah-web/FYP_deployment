import { useSelector } from "react-redux";
import showToast from "../ShowToast";
import { useNavigate } from "react-router-dom";
import RentedRoomsAdmin from "./Admin/RentedRoomsAdmin";
import MyRentedRooms from "./Lanlord/MyRentedRooms";
import MyRooms from "./Tenant/MyRooms";

const RentedRooms = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  if (userData.type == "admin") {
    return <RentedRoomsAdmin />;
  } else if (userData.type == "landlord") {
    return <MyRentedRooms />;
  } else if (userData.type == "tenant") {
    return <MyRooms />;
  } else {
    showToast("error", "Something went wrong");
    navigate("/login"); 
  }
};

export default RentedRooms;
