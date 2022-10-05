function RenderDate(unixTimestamp = Date.now()) {
  const date = new Date(unixTimestamp);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}

function TransformDate(unixTimestamp = Date.now()) {
  return new Date(unixTimestamp);
}

exports.DateFromUnix = (unix) => {
  if (!unix) return new Date();

  if (typeof unix === "string") {
    try {
      unix = parseInt(unix);
    } catch (_err) {}
  }
  return TransformDate(unix * 1000);
};
