import { DeviceConfig, DeviceOrientation } from '@/types/device';

export interface DeviceMockupProps {
  deviceId?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  showFrame?: boolean;
  showControls?: boolean;
  onOrientationChange?: (orientation: DeviceOrientation) => void;
  onDeviceChange?: (deviceId: string) => void;
  onScaleChange?: (scale: number) => void;
}

export interface DeviceFrameProps {
  device: DeviceConfig;
  orientation: DeviceOrientation;
  scale: number;
  showFrame?: boolean;
  children?: React.ReactNode;
  className?: string;
} 