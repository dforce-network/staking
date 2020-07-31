import development from "./development.config";
import production from "./production.config";
import test from "./test.config";
const env = process.env.APP_ENV || process.env.NODE_ENV;
console.log(env)
const config = {
  test,
  development,
  production,
};

export default config[env];
