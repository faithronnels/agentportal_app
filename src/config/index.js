import defaultConfig from "./defaultConfig.json";
//   "base": "http://localhost/agentportal-api-dev",
const config = {};
// "base": "https://merrybetgold.com/api",
//http://localhost/pa_request_v1
// Reliably confirms that x is an Object, but not a Function, Array, etc.
const isObject = (x) => Object.prototype.toString.call(x) === "[object Object]";
for (const key in defaultConfig) {
  if (isObject(defaultConfig[key])) {
    config[key] = { ...defaultConfig[key] };
  } else {
    config[key] = defaultConfig[key];
  }
}

export default config;
