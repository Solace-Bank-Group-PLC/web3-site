export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export type DeviceOrientation = 'portrait' | 'landscape';
export type DeviceTheme = 'light' | 'dark' | 'system';

export interface DeviceResolution {
  width: number;
  height: number;
  ppi?: number;
}

export interface DeviceScreen {
  width: number;
  height: number;
  resolution: DeviceResolution;
  aspectRatio?: string;
  refreshRate?: number;
  bezels?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface DeviceFeatures {
  hasNotch?: boolean;
  hasDynamicIsland?: boolean;
  hasCamera?: boolean;
  hasFaceId?: boolean;
  hasFingerprint?: boolean;
}

export interface DeviceConfig {
  id: string;
  name: string;
  type: DeviceType;
  brand: string;
  model: string;
  screen: DeviceScreen;
  defaultOrientation: DeviceOrientation;
  supportedOrientations: DeviceOrientation[];
  features: DeviceFeatures;
  scale?: number;
  theme?: DeviceTheme;
}

export type DeviceConfigMap = Record<string, DeviceConfig>;

export interface DeviceState {
  currentDevice: DeviceConfig | null;
  orientation: DeviceOrientation;
  scale: number;
} 