import React from 'react';
import { hasDeviceFeature } from '@/utils/deviceUtils';
import { DeviceFrameProps } from './types';
import styles from './DeviceMockup.module.css';

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  device,
  orientation,
  scale,
  showFrame,
  children,
  className = '',
}) => {
  const hasDynamicIsland = hasDeviceFeature(device, 'hasDynamicIsland');
  const hasNotch = hasDeviceFeature(device, 'hasNotch');
  const hasCamera = hasDeviceFeature(device, 'hasCamera');

  const frameStyle = getDeviceStyles(device, orientation, scale);

  return (
    <div 
      className={`${styles.frame} ${showFrame ? styles.showFrame : ''} ${className}`}
      style={frameStyle}
      data-device-type={device.type}
      data-orientation={orientation}
    >
      {showFrame && (
        <>
          {hasDynamicIsland && (
            <div className={styles.dynamicIsland} />
          )}
          {hasNotch && !hasDynamicIsland && (
            <div className={styles.notch} />
          )}
          {hasCamera && !hasDynamicIsland && !hasNotch && (
            <div className={styles.camera} />
          )}
        </>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}; 