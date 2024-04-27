const cookies = (cookies) => {
  if (!cookies) return {};

  return cookies
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});
};

export default cookies;
