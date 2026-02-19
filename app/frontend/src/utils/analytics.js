const ENV = import.meta.env.VITE_ENV_NAME;

export function trackEvent(eventName, payload = {}) {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  if (ENV !== "Production") {
    console.log(`[${ENV?.toUpperCase() ?? "DEV"}] Event tracked: ${eventName}`, event);
    return;
  }

  console.log(`[PROD] Sending event: ${eventName}`, event);
  // Replace with real provider:
  // window.analytics.track(eventName, payload);
}