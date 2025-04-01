import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SummaryApi from "../../../api/api";
import showToast from "../../ShowToast";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const TenantNegotiations = () => {
  const [Negotiations, setNegotiations] = useState([]);
  const userData = useSelector((state) => state.user.userData);

  const getRequestedNegotiatons = async () => {
    try {
      let response = await axios.get(SummaryApi.getRequestedNegotiations.url, {
        withCredentials: true,
      });
      console.log("response", response);

      if (!response.data.data) {
        showToast("error", "Error occurred while fetching data");
        return;
      }

      setNegotiations(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNegotiation = async (negotiationId) => {
    try {
      let response = await axios.delete(
        `${SummaryApi.deleteNegotiation.url}/${negotiationId}`,
        { withCredentials: true }
      );
      if (!response) {
        showToast("error", "Error occurred while deleting negotiation");
        return;
      }
      showToast("success", "Deleted successfully");
      setNegotiations((negotiations) =>
        negotiations.filter((negotiation) => negotiation._id !== negotiationId)
      );
    } catch (error) {
      showToast("error", "Error occurred while doing.");
    }
  };

  useEffect(() => {
    getRequestedNegotiatons();
  }, []);

  return (
    <div>
      <div className="p-4">
        <h1 className="font-bold text-2xl text-[#0f5da7] my-2 lg:my-4">
          Negotiation On Rooms
        </h1>
        <div className="overflow-y-auto h-[85vh]">
          <div className="negotiations">
            <h1 className="font-bold text-2xl text-[#0f5da7] my-2">
              Requested Negotiations
            </h1>
            {Negotiations.length > 0 ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="border-b text-center">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Room</th>
                    <th className="px-4 py-2">Original Price</th>
                    <th className="px-4 py-2">Negotiated Price</th>
                    <th className="px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {Negotiations?.map((negotiation, index) =>
                    !negotiation.negotiationStatus &&
                    !negotiation?.counterPrice ? (
                      <tr key={index} className="border-b text-center">
                        <td className="px-4 py-2">
                          {negotiation.client.name || "demo"}
                        </td>
                        <td className="px-4 py-2">
                          {negotiation.room.name || "demo"}
                        </td>
                        <td className="px-4 py-2">{negotiation.room.price}</td>
                        <td className="px-4 py-2">{negotiation.price}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={async () =>
                              await deleteNegotiation(negotiation._id)
                            }
                          >
                            <RxCross2 className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            ) : (
              <h1>No negotiations</h1>
            )}
          </div>

          <div className="negotiations">
            <h1 className="font-bold text-2xl text-[#0f5da7] my-2">
              Accepted Negotiations
            </h1>
            {Negotiations.length > 0 ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="border-b text-center">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Room</th>
                    <th className="px-4 py-2">Original Price</th>
                    <th className="px-4 py-2">Negotiated Price</th>
                    <th className="px-4 py-2">Rent It</th>
                    <th className="px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {Negotiations?.map((negotiation, index) =>
                    negotiation.negotiationStatus ? (
                      <tr
                        key={index}
                        className="border-b text-center capitalize"
                      >
                        <td className="px-4 py-2">
                          {negotiation.client.name || "demo"}
                        </td>
                        <td className="px-4 py-2">
                          {negotiation.room.name || "demo"}
                        </td>
                        <td className="px-4 py-2">{negotiation.room.price}</td>
                        <td className="px-4 py-2">{negotiation.price}</td>
                        <td className="px-4 py-2">
                          <Link
                            to={`/payment/${negotiation?.room?._id}`}
                            className="bg-primary p-1 px-3 rounded-xl hover:text-white hover:bg-black"
                          >
                            Rent
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={async () =>
                              await deleteNegotiation(negotiation._id)
                            }
                          >
                            <RxCross2 className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            ) : (
              <h1>No negotiations</h1>
            )}
          </div>
          <div className="negotiations">
            <h1 className="font-bold text-2xl text-[#0f5da7] my-2">
              Countered Negotiations
            </h1>
            {Negotiations.length > 0 ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Room</th>
                    <th className="px-4 py-2">Original Price</th>
                    <th className="px-4 py-2">Negotiated Price</th>
                    <th className="px-4 py-2">Countered Price</th>
                    <th className="px-4 py-2">Rent It</th>
                    <th className="px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {Negotiations?.map((negotiation, index) =>
                    negotiation?.counterPrice ? (
                      <tr
                        key={index}
                        className="border-b text-center capitalize"
                      >
                        <td className="px-4 py-2">
                          {negotiation.client.name || "demo"}
                        </td>
                        <td className="px-4 py-2">
                          {negotiation.room.name || "demo"}
                        </td>
                        <td className="px-4 py-2">{negotiation.room.price}</td>
                        <td className="px-4 py-2">{negotiation.price}</td>
                        <td className="px-4 py-2">
                          {negotiation.counterPrice}
                        </td>
                        <td className="px-4 py-2">
                          <Link
                            to={`/payment/${negotiation?.room?._id}`}
                            className="bg-primary p-1 px-3 rounded-xl hover:text-white hover:bg-black"
                          >
                            Rent
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={async () =>
                              await deleteNegotiation(negotiation._id)
                            }
                          >
                            <RxCross2 className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            ) : (
              <h1>No negotiations</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantNegotiations;
