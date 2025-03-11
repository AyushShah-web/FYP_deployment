import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SummaryApi from "../../../api/api";
import showToast from "../../ShowToast";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const LandlordsList = () => {
  const userData = useSelector((state) => state.user.userData);

  if (userData.type != "admin") {
    return <h1 className="text-4xl text-red-600">Unauthorized</h1>;
  }

  const [landlords, setLandlords] = useState([]);

  const getAllLandlords = async () => {
    // Get all the landlord
    try {
      const response = await axios.get(SummaryApi.getAllLandlords.url, {
        withCredentials: true,
      });
      console.log("response", response.data.data);

      if (response.status != 200) {
        showToast("error", "Error occured");
      }
      if (response.data.data && response.data.data.length > 0) {
        setLandlords(response.data.data);
      }
    } catch (error) {
      showToast("error", "Error occured while fetching");
    }
  };

  useEffect(() => {
    getAllLandlords();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-[#0f5da7]">Landlords List</h1>
      <div className="landlordsList">
        {landlords.length > 0 ? (
          <>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">SN. No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">No of rooms</th>
                  <th className="px-4 py-2">Features</th>
                </tr>
              </thead>
              <tbody>
                {landlords.map((landlord, index) => (
                  <tr key={landlord._id} className="border-b">
                    <td className="px-4 py-2 text-center">{index + 1}</td>

                    <td className="px-4 py-2 capitalize text-center">
                      {landlord.name}
                    </td>
                    <td className="px-4 py-2 capitalize text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 flex gap-4 text-xl">
                      <Link to={`/dashboard/roomForm/${landlord._id}`}>
                        <FaEdit className="text-primary" />
                      </Link>
                      <button onClick={() => deleteRoom(landlord._id)}>
                        <MdDelete className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h1 className="text-3xl pt-4"> No Landlords found.</h1>
        )}
      </div>
    </div>
  );
};

export default LandlordsList;
