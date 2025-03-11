import { useSelector } from "react-redux";
import LandlordNegotiations from "./Lanlord/LandlordNegotiations";
import TenantNegotiations from "./Tenant/TenantNegotiations";
import showToast from "../ShowToast";
import { useNavigate } from "react-router-dom";


const Negotiations = ()=>{
     const userData = useSelector((state)=>state.user.userData);
     const navigate = useNavigate();

     if(userData.type == "landlord"){
        return <LandlordNegotiations/>
    }
    else if(userData.type=="tenant"){
        return <TenantNegotiations/>
    }else{
        showToast("error","Something went wrong");
        navigate("/login");
    }
}

export default Negotiations;