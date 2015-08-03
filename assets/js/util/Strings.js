// 将URL的search参数转换成对象
export function urlParamToObject(search) {
  let options = {},
    key = "",
    value = null;

  if (search[search.length - 1] !== "&") {
    search += "&";
  }

  search.split("").forEach(function(s){
    if (s !== "=" && value === null) {
      key += s;
    } else if (s === "=") {
      value = "";
    } else if (s !== "&" && value !== null) {
      value += s;
    } else if (s === "&") {
      options[decodeURIComponent(key)] = decodeURIComponent(value) || true;
      key = "";
      value = null;
    }
  });

  return options;
}
