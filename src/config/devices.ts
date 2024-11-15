import { DeviceConfigMap, DeviceType } from '@/types/device';

export const DEFAULT_DEVICE_SCALES: Record<DeviceType, number> = {
  mobile: 1,
  tablet: 0.75,
  laptop: 0.5,
  desktop: 0.25
} as const;

export const DEVICE_CONFIGS: DeviceConfigMap = {
  'iphone-14-pro': {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    type: 'mobile',
    brand: 'apple',
    model: 'iphone-14-pro',
    screen: {
      width: 393,
      height: 852,
      resolution: {
        width: 2556,
        height: 1179,
        ppi: 460
      },
      aspectRatio: '19.5:9',
      refreshRate: 120,
      bezels: {
        top: 12,
        right: 3,
        bottom: 12,
        left: 3
      }
    },
    defaultOrientation: 'portrait',
    supportedOrientations: ['portrait', 'landscape'],
    features: {
      hasNotch: false,
      hasDynamicIsland: true,
      hasCamera: true,
      hasFaceId: true
    },
    theme: 'system',
    scale: 1
  }
  // Add more device configurations here
}; 