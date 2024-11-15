import React from 'react';
import { getDeviceStyles } from '../../utils/deviceStyles';

interface DeviceControlsProps {
  device: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  scale: number;
  onDeviceChange: (device: 'mobile' | 'tablet' | 'desktop') => void;
  onOrientationChange: (orientation: 'portrait' | 'landscape') => void;
  onScaleChange: (scale: number) => void;
}

export const DeviceControls: React.FC<DeviceControlsProps> = ({
  device,
  orientation,
  scale,
  onDeviceChange,
  onOrientationChange,
  onScaleChange,
}) => {
  return (
    <div className="device-controls">
      <select value={device} onChange={(e) => onDeviceChange(e.target.value as any)}>
        <option value="mobile">Mobile</option>
        <option value="tablet">Tablet</option>
        <option value="desktop">Desktop</option>
      </select>
      
      <select value={orientation} onChange={(e) => onOrientationChange(e.target.value as any)}>
        <option value="portrait">Portrait</option>
        <option value="landscape">Landscape</option>
      </select>
      
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={scale}
        onChange={(e) => onScaleChange(Number(e.target.value))}
      />
    </div>
  );
}; 