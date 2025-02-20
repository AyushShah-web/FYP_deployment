import axios from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../api/api";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import showToast from "../ShowToast";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const UserNegotiations = () => {
  const [Negotiations, setNegotiations] = useState([]);
  const userData = useSelector((state) => state.user.userData);
  const [counterPrice, setCounterPrice] = useState("");

  const acceptNegotiation = async (negotiationId) => {
    try {
      let response = await axios.put(
        `${SummaryApi.acceptNegotiaion.url}/${negotiationId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (!response) {
        showToast("error", "Error occurred while accepting");
        return;
      }
      setNegotiations((prev) =>
        prev.filter((room) => room._id !== negotiationId)
      );
      showToast("success", "Accepted Negotiation");
    } catch (error) {
      showToast("error", "Something went wrong");
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

  async function getRoomsNegotiations() {
    let response = await axios.get(SummaryApi.getUsersNegotiation.url, {
      withCredentials: true,
    });
    console.log("response", response);

    if (!response) {
      showToast("error", "Error occurred while fetching data");
      return;
    }
    setNegotiations(response.data.data);
  }

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

  const handleCounter = async (event, negotiationId) => {
    event.preventDefault();
    if (!counterPrice) {
      console.log("Counter price is required");
      showToast("error", "Counter Price is required");
      return;
    }
    console.log("Negotiation _id", negotiationId);
    try {
      console.log("Entered Here");
      console.log(SummaryApi.counterNegotiation.url);
      const response = await axios.put(
        `${SummaryApi.counterNegotiation.url}/${negotiationId}`,
        {
          counterPrice,
          negotiationStatus:true
        },
        {
          withCredentials: true,
        }
      );
      if (response) {
        showToast("success", "Countered suscessfully");
      }
    } catch (error) {
      console.log("Error", error);
      showToast("error", "Error occured");
    }
  };

  useEffect(() => {
    try {
      if (userData.type === "landlord") {
        getRoomsNegotiations();
      }
      if (userData.type === "tenant") {
        getRequestedNegotiatons();
      }
    } catch (error) {
      showToast("error", "Error occurred while fetching data");
      console.log(error);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-[#0f5da7] my-2 lg:my-4">
        Negotiation On Rooms
      </h1>
      <div className="overflow-y-auto h-[85vh]">
        {userData.type === "landlord" ? (
          <>
            <div className="negotiations">
              <h1 className="font-bold text-2xl text-[#0f5da7] my-2">
                Room Negotiations
              </h1>
              {Negotiations.length > 0 ? (
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="border-b text-center">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Room</th>
                      <th className="px-4 py-2">Original Price</th>
                      <th className="px-4 py-2">Negotiated Price</th>
                      <th className="px-4 py-2">Counter Price</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Negotiations?.map((negotiation, index) =>
                      !negotiation.negotiationStatus && !negotiation.counterPrice ? (
                        <tr
                          key={negotiation._id}
                          className="border-b text-center capitalize"
                        >
                          <td className="px-4 py-2">
                            {negotiation?.client?.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation?.room?.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation?.room?.price}
                          </td>
                          <td className="px-4 py-2">{negotiation?.price}</td>
                          <td className="px-4 py-2">
                            {!negotiation?.counterPrice ? (
                              <form>
                                <input
                                  type="number"
                                  className="border-3 px-2 w-[8rem] border-2 outline-none rounded-sm"
                                  placeholder="counter price"
                                  onChange={(e) =>
                                    setCounterPrice(e.target.value)
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleCounter(event, negotiation._id)
                                  }
                                  className="px-1 bg-primary rounded-xl"
                                >
                                  counter
                                </button>
                              </form>
                            ) : (
                              negotiation.counterPrice
                            )}
                          </td>
                          <td className="px-4 py-2 flex gap-5 text-xl">
                            <button
                              onClick={async () =>
                                await acceptNegotiation(negotiation._id)
                              }
                            >
                              <TiTick className="text-primary" />
                            </button>
                            <button
                              onClick={async () =>
                                await deleteNegotiation(negotiation._id)
                              }
                            >
                              <RxCross2 className="text-red-500" />
                            </button>
                            <Link to={""}>
                              <IoChatbubbleEllipsesOutline className="text-blue-600" />
                            </Link>
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

            <div className="negotiated">
              <h1 className="font-bold text-2xl text-[#0f5da7] my-2">
                Negotiated Rooms
              </h1>
              {Negotiations.length > 0 ? (
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="border-b text-center">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Room</th>
                      <th className="px-4 py-2">Original Price</th>
                      <th className="px-4 py-2">Negotiated Price</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
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
                            {negotiation?.client?.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation?.room?.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation?.room?.price}
                          </td>
                          <td className="px-4 py-2">{negotiation.price}</td>
                          <td className="px-4 py-2">
                            {negotiation.negotiationStatus
                              ? "accepted"
                              : "not accepted"}
                          </td>
                          <td className="px-4 py-2 flex gap-5 text-xl">
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

            <div className="negotiated">
              <h1 className="font-bold text-2xl text-[#0f5da7] my-2">
                Countered Rooms
              </h1>
              {Negotiations.length > 0 ? (
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="border-b text-center">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Room</th>
                      <th className="px-4 py-2">Original Price</th>
                      <th className="px-4 py-2">Negotiated Price</th>
                      <th className="px-4 py-2">Countered Price</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Negotiations?.map((negotiation, index) =>
                      negotiation.counterPrice ? (
                        <tr
                          key={index}
                          className="border-b text-center capitalize"
                        >
                          <td className="px-4 py-2">
                            {negotiation.client?.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation?.room?.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation?.room?.price}
                          </td>
                          <td className="px-4 py-2">{negotiation.price}</td>
                          <td className="px-4 py-2">
                            {negotiation.counterPrice}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation.negotiationStatus
                              ? "accepted"
                              : "not accepted"}
                          </td>
                          <td className="px-4 py-2 flex gap-5 text-xl">
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
          </>
        ) : (
          <>
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
                      !negotiation.negotiationStatus ? (
                        <tr key={index} className="border-b text-center">
                          <td className="px-4 py-2">
                            {negotiation.client.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation.room.name || "demo"}
                          </td>
                          <td className="px-4 py-2">
                            {negotiation.room.price}
                          </td>
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
                          <td className="px-4 py-2">
                            {negotiation.room.price}
                          </td>
                          <td className="px-4 py-2">{negotiation.price}</td>
                          <td className="px-4 py-2">
                            <button className="bg-primary p-1 px-3 rounded-xl hover:text-white hover:bg-black">
                              Rent
                            </button>
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
                          <td className="px-4 py-2">
                            {negotiation.room.price}
                          </td>
                          <td className="px-4 py-2">{negotiation.price}</td>
                          <td className="px-4 py-2">
                            {negotiation.counterPrice}
                          </td>
                          <td className="px-4 py-2">
                            <button className="bg-primary p-1 px-3 rounded-xl hover:text-white hover:bg-black">
                              Rent
                            </button>
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
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserNegotiations;
