import React, { useEffect, useRef, useState } from 'react';
import { useDevice } from '@/contexts/DeviceContext';
import { getDeviceStyles } from '@/utils/deviceUtils';
import { DeviceFrame } from './DeviceFrame';
import { DeviceControls } from './DeviceControls';
import { DeviceMockupProps } from './types';
import styles from './DeviceMockup.module.css';

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  deviceId,
  children,
  className = '',
  containerClassName = '',
  showFrame = true,
  showControls = true,
  onOrientationChange,
  onDeviceChange,
  onScaleChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    currentDevice,
    orientation,
    scale,
    setDevice,
    toggleOrientation,
    setScale
  } = useDevice();

  useEffect(() => {
    if (deviceId) {
      setDevice(deviceId);
    }
  }, [deviceId, setDevice]);

  const handleOrientationChange = () => {
    toggleOrientation();
    onOrientationChange?.(orientation);
  };

  const handleDeviceChange = (newDeviceId: string) => {
    setDevice(newDeviceId);
    onDeviceChange?.(newDeviceId);
  };

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    onScaleChange?.(newScale);
  };

  if (!currentDevice) return null;

  return (
    <div className={`${styles.container} ${containerClassName}`} ref={containerRef}>
      {showControls && (
        <DeviceControls
          currentDevice={currentDevice}
          orientation={orientation}
          scale={scale}
          onOrientationChange={handleOrientationChange}
          onDeviceChange={handleDeviceChange}
          onScaleChange={handleScaleChange}
        />
      )}
      <div className={`${styles.deviceWrapper} ${className}`}>
        <DeviceFrame
          device={currentDevice}
          orientation={orientation}
          scale={scale}
          showFrame={showFrame}
        >
          {children}
        </DeviceFrame>
      </div>
    </div>
  );
};