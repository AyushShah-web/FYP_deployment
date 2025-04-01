import axios from "axios";
// Function to verify Khalti Payment

const verifyKhaltiPayment = async (pidx) => {
  const headersList = {
    Authorization: `key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({ pidx });

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    throw error;
  }
};

// Function to initialize Khalti Payment
const initializeKhaltiPayment = async (details) => {
  const headersList = {
    Authorization: `key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  console.log("Initialize details",details);
  

  const bodyContent = JSON.stringify(details);

  console.log(`${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  console.log(reqOptions);

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.log("details.website_url",details.website_url);
    
    console.error("Error initializing Khalti payment:", error);
    throw error;
  }
};

export { initializeKhaltiPayment, verifyKhaltiPayment };
