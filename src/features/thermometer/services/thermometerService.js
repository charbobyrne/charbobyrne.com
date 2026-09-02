import {
  mockThermometerService,
  MOCK_SCENARIOS,
} from "./mockThermometerService";
import { httpThermometerService } from "./httpThermometerService";

export const USING_MOCK_DATA = import.meta.env.VITE_LAB1_DATA_SOURCE === "mock";
export const thermometerService = USING_MOCK_DATA
  ? mockThermometerService
  : httpThermometerService;

export { MOCK_SCENARIOS };
