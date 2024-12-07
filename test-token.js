const { fetchAccessToken } = require("hume");

async function testToken() {
  try {
    const accessToken = await fetchAccessToken({
      apiKey: "4W1YctBwmqxnO9KhYfLPb043d24fyEEr4qKkYODvCeE1AFdawjcMsflWp6ZCfMGm",
      secretKey: "886Gh7Lo4KPBGTj8YSGpEJz2GGGiCXs7TUg5Oyf8iOCftTDW",
    });
    console.log("Token generated successfully:", accessToken);
  } catch (error) {
    console.error("Error generating token:", error);
  }
}

testToken(); 