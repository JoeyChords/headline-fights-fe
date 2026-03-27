const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

if (!API_ENDPOINT) {
  throw new Error("Missing NEXT_PUBLIC_API_ENDPOINT");
}

const PUB_1 = "CNN";
const PUB_2 = "Fox News";
const PUB_2_SHORT = "Fox";

module.exports = { API_ENDPOINT, PUB_1, PUB_2, PUB_2_SHORT };
