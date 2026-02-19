const ENV = process.env.NODE_ENV || "development";

function emitEvent(name, payload = {}) {
  if (ENV === "test") return; // Stay silent during automated tests

  const event = {
    event: name,
    timestamp: new Date().toISOString(),
    env: ENV,
    ...payload,
  };

  if (ENV === "production") {
    console.log("[PROD] ANALYTICS EVENT:", event);
    // Replace with real provider: segment.track(), datadog.event(), etc.
    return;
  }

  console.log("[DEV] ANALYTICS EVENT:", event);
}

module.exports = { emitEvent };