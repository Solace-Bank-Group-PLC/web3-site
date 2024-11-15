export interface DeviceFeatures {
  hasNotch?: boolean;
  hasDynamicIsland?: boolean;
  hasCamera?: boolean;
  hasFaceId?: boolean;
  hasFingerprint?: boolean;
  hasHomeButton?: boolean;
  hasTouchBar?: boolean;
  hasKeyboard?: boolean;
  hasTrackpad?: boolean;
}

export interface DeviceColors {
  name: string;
  primary: string;
  secondary?: string;
  accent?: string;
} 