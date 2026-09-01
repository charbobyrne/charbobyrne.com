import { useSyncExternalStore } from "react";
import { thermometerService } from "../services/thermometerService";

export function useThermometerData() {
  return useSyncExternalStore(
    thermometerService.subscribe,
    thermometerService.getSnapshot,
    thermometerService.getSnapshot,
  );
}

