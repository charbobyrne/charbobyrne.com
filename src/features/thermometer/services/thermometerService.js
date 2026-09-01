import {
  mockThermometerService,
  MOCK_SCENARIOS,
} from "./mockThermometerService";

// Phase 1 uses local mock data. Future HTTP integration should replace this
// implementation without requiring dashboard components to change.
export const thermometerService = mockThermometerService;

export { MOCK_SCENARIOS };

