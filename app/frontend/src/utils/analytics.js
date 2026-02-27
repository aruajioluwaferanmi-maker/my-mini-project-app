const ENV = import.meta.env.VITE_ENV_NAME;

export function trackEvent(eventName, payload = {}) {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  if (ENV === "Development") {
    console.log(`[DEV] Event tracked: ${eventName}`, event);
    return;
  }

  if (ENV === "Staging") {
    console.log(`[STAGING] Event tracked: ${eventName}`, event);
    return;
  }

  // Production — real analytics
  console.log(`[PROD] Sending event: ${eventName}`, event);
  // i wiil put a real anayltics provider later 
}