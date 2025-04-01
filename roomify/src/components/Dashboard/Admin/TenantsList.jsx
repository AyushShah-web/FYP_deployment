import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SummaryApi from "../../../api/api";
import showToast from "../../ShowToast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const TenantsList = () => {
  const userData = useSelector((state) => state.user.userData);

  if (userData.type != "admin") {
    return <h1 className="text-4xl text-red-600">Unauthorized</h1>;
  }

  const [tenants, setTenants] = useState([]);

  const getAlltenants = async () => {
    // Get all the landlord
    try {
      const response = await axios.get(SummaryApi.getAllTenants.url, {
        withCredentials: true,
      });
      console.log("response", response.data.data);

      if (response.status != 200) {
        return;
      }
      if (response.data.data && response.data.data.length > 0) {
        setTenants(response.data.data);
      }
    } catch (error) {
      showToast("error", "Error occured while fetching");
    }
  };

  const deleteTenant = async (id) => {
    try {
      const response = await axios.delete(
        `${SummaryApi.deleteUser.url}/${id}`,
        { withCredentials: true }
      );
      if (response.status != 200) {
        showToast("error", "Something went wrong");
      }
      showToast("success", "Deleted suscessfully");

      setTenants((tenants) => tenants.filter((tenant) => tenant._id != id));
    } catch (error) {
      showToast("error", "Something went wrong while deleting");
    }
  };

  useEffect(() => {
    getAlltenants();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-[#0f5da7]">Tenants List</h1>
      <div className="tenantsList">
        {tenants.length > 0 ? (
          <>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">SN. No</th>
                  <th className="px-4 py-2">Name</th>
                  {/* <th className="px-4 py-2">Features</th> */}
                </tr>
              </thead>
              <tbody>
                {tenants.map((landlord, index) => (
                  <tr key={landlord._id} className="border-b">
                    <td className="px-4 py-2 text-center">{index + 1}</td>

                    <td className="px-4 py-2 capitalize text-center">
                      {landlord.name}
                    </td>
                   
                    {/* <td className="px-4 py-2 flex gap-4 text-xl">
                      <button
                      // onClick={()=>deleteTenant(landlord._id)}
                      >
                        <FaEdit className="text-primary" />
                      </button>
                      <button onClick={() => deleteTenant(landlord._id)}>
                        <MdDelete className="text-red-500" />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h1 className="text-3xl pt-4"> No tenants found.</h1>
        )}
      </div>
    </div>
  );
};

export default TenantsList;
