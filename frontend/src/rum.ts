import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "YOUR_APP_ID",
  clientToken: "YOUR_CLIENT_TOKEN",
  site: "datadoghq.eu",
  service: "incidentflow-frontend",
  env: "production",

  sampleRate: 100,
  sessionReplaySampleRate: 0,

  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,

  defaultPrivacyLevel: "mask-user-input",
});
