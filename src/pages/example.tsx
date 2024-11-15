import { DeviceMockup } from '@/components/DeviceMockup';
import { DeviceProvider } from '@/contexts/DeviceContext';

export default function ExamplePage() {
  return (
    <DeviceProvider>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <DeviceMockup 
          deviceId="iphone-14-pro"
          showControls
          onOrientationChange={(orientation) => console.log('New orientation:', orientation)}
          onDeviceChange={(deviceId) => console.log('New device:', deviceId)}
          onScaleChange={(scale) => console.log('New scale:', scale)}
        >
          <iframe
            src="https://example.com"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </DeviceMockup>
      </div>
    </DeviceProvider>
  );
} 