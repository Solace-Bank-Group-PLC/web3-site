import { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';
import { DeviceConfig, DeviceOrientation, DeviceState } from '@/types/device';
import { DEVICE_CONFIGS, DEFAULT_DEVICE_SCALES } from '@/config/devices';

interface DeviceStore extends DeviceState {
  setDevice: (deviceId: string) => void;
  toggleOrientation: () => void;
  setScale: (scale: number) => void;
  resetDevice: () => void;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  currentDevice: null,
  orientation: 'portrait',
  scale: 1,

  setDevice: (deviceId: string) => {
    const device = DEVICE_CONFIGS[deviceId];
    if (device) {
      set({
        currentDevice: device,
        orientation: device.defaultOrientation,
        scale: DEFAULT_DEVICE_SCALES[device.type]
      });
    }
  },

  toggleOrientation: () => {
    const { currentDevice, orientation } = get();
    if (!currentDevice) return;

    const newOrientation: DeviceOrientation = 
      orientation === 'portrait' ? 'landscape' : 'portrait';

    if (currentDevice.supportedOrientations.includes(newOrientation)) {
      set({ orientation: newOrientation });
    }
  },

  setScale: (scale: number) => set({ scale }),
  resetDevice: () => set({ 
    currentDevice: null, 
    orientation: 'portrait', 
    scale: 1 
  })
}));

const DeviceContext = createContext<DeviceStore | null>(null);

interface DeviceProviderProps {
  children: ReactNode;
}

export function DeviceProvider({ children }: DeviceProviderProps) {
  return (
    <DeviceContext.Provider value={useDeviceStore()}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
} 