const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
const PUB_1 = "CNN";
const PUB_2 = "Fox News";
const PUB_2_SHORT = "Fox";

const config = { API_ENDPOINT, PUB_1, PUB_2, PUB_2_SHORT };

export { API_ENDPOINT, PUB_1, PUB_2, PUB_2_SHORT };
export default config;
