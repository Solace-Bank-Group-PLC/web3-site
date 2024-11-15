type DeviceOrientation = 'portrait' | 'landscape';
type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const getDeviceStyles = (
  device: DeviceType,
  orientation: DeviceOrientation,
  scale: number
) => {
  const baseStyles = {
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
  };

  const deviceStyles = {
    mobile: {
      width: orientation === 'portrait' ? '375px' : '667px',
      height: orientation === 'portrait' ? '667px' : '375px',
    },
    tablet: {
      width: orientation === 'portrait' ? '768px' : '1024px',
      height: orientation === 'portrait' ? '1024px' : '768px',
    },
    desktop: {
      width: '1920px',
      height: '1080px',
    },
  };

  return {
    ...baseStyles,
    ...deviceStyles[device],
  };
}; 