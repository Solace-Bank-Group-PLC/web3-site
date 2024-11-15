import { MockupViewer } from '@/components/MockupViewer/MockupViewer';

export default function MockupPreviewPage() {
  return (
    <MockupViewer 
      mockupUrl="/mockups/homepage-design-v1.png"
      title="Homepage Design v1"
      defaultDevice="desktop"
    />
  );
}