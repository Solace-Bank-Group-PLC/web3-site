export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type DeviceOrientation = 'portrait' | 'landscape';

export interface DeviceConfig {
  id: string;
  name: string;
  type: DeviceType;
  width: number;
  height: number;
  scale: number;
} 