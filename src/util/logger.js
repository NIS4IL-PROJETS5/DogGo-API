function Logger(msg = "", type = "", emoji = "") {
  let d = new Date().toLocaleDateString("fr", {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  console.log(`${d}: ${emoji}  [${type}] ${msg}`);
}

exports.LogInfo = (msg) => {
  Logger(msg, "INFO", "💡");
};

exports.LogWarn = (msg) => {
  Logger(msg, "WARN", "⚠️");
};

exports.LogError = (msg) => {
  Logger(msg, "ERROR", "❌");
};
