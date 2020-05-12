import router from "../router";

const redirect = url => router.push({ path: url });

export { redirect };
