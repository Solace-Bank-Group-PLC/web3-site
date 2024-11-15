import { DeviceConfig, DeviceOrientation, DeviceScreen } from '@/types/device';

interface DeviceDimensions {
  width: number;
  height: number;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const getDeviceDimensions = (
  device: DeviceConfig,
  orientation: DeviceOrientation
): DeviceDimensions => {
  const { width, height } = device.screen;
  
  return orientation === 'portrait'
    ? { width, height }
    : { width: height, height: width };
};

export const calculateDeviceScale = (
  containerWidth: number,
  deviceWidth: number,
  maxScale = 1
): number => {
  const scale = containerWidth / deviceWidth;
  return Math.min(scale, maxScale);
};

export const getDeviceStyles = (
  device: DeviceConfig,
  orientation: DeviceOrientation,
  scale: number
): React.CSSProperties => {
  const dimensions = getDeviceDimensions(device, orientation);
  const bezels = device.screen.bezels;
  const isTabletDevice = isTablet(device);

  return {
    width: dimensions.width,
    height: dimensions.height,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    transition: 'all 0.3s ease-in-out',
    ...(bezels && {
      padding: `${bezels.top}px ${bezels.right}px ${bezels.bottom}px ${bezels.left}px`
    }),
    ...(isTabletDevice && {
      maxWidth: '1024px'
    })
  };
};

export const hasDeviceFeature = (
  device: DeviceConfig,
  feature: keyof DeviceConfig['features']
): boolean => {
  return !!device.features[feature];
};

export const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  
  const ua = navigator.userAgent;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
    return 'tablet';
  }
  
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
    || (window.innerWidth <= 800 && window.innerHeight <= 600)
  ) {
    return 'mobile';
  }
  
  return 'desktop';
};

export const isTablet = (device: DeviceConfig): boolean => {
  return getDeviceType() === 'tablet';
}; 