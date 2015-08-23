module.exports = function(data) {
  if (data.body.user != "admin") {
    return {
      status: 400,
      html: "Code 100, Unknown User"
    };
  } else if (data.body.password != "12345678") {
    return {
      status: 400,
      body: "Code 101, Wrong password"
    };
  } else {
    return {
      json: require("./me.json")
    };
  }
};
