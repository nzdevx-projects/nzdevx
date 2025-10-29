'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, ExternalLink, Smartphone, Tablet, Laptop, Monitor, Maximize } from 'lucide-react';

// ──────────────────────────────────────────────── Device Breakpoints Configuration */
// ─── Maximum width for each device type (in pixels).
const DEVICE_SIZES = {
  mobile: { maxWidth: 375 },
  tablet: { maxWidth: 768 },
  laptop: { maxWidth: 1024 },
  desktop: { maxWidth: 1440 },
  fullscreen: { maxWidth: Infinity },
};

// ─── List of all devices with their icons for toggle buttons.
const ALL_DEVICES = [
  { key: 'mobile', icon: <Smartphone size={20} />, device: 'mobile' },
  { key: 'tablet', icon: <Tablet size={20} />, device: 'tablet' },
  { key: 'laptop', icon: <Laptop size={20} />, device: 'laptop' },
  { key: 'desktop', icon: <Monitor size={20} />, device: 'desktop' },
  { key: 'fullscreen', icon: <Maximize size={20} />, device: 'fullscreen' },
];

// ─── Order of devices for toggling between views.
const DEVICE_ORDER = ['mobile', 'tablet', 'laptop', 'desktop', 'fullscreen'];

// ─── Create icons available for each device view (mobile shows none, others show progressively more).
const DEVICE_ICONS = DEVICE_ORDER.reduce((acc, curr, index) => {
  acc[curr] = curr === 'mobile' ? [] : ALL_DEVICES.slice(0, index + 1);
  return acc;
}, {});

// ─── Detect which device type based on window width.
const getDeviceFromWidth = (width) => {
  if (width >= 1920) return 'fullscreen';
  if (width < DEVICE_SIZES.tablet.maxWidth) return 'mobile';
  if (width < DEVICE_SIZES.laptop.maxWidth) return 'tablet';
  if (width < DEVICE_SIZES.desktop.maxWidth) return 'laptop';
  return 'desktop';
};

// ──────────────────────────────────────────────── Live Preview Modal Component */
export function LivePreviewModal({ open, onClose, url }) {
  const [isLoading, setIsLoading] = useState(true);

  // ─── Track which device size is currently selected for preview
  const [device, setDevice] = useState(() =>
    typeof window !== 'undefined' ? getDeviceFromWidth(window.innerWidth) : 'desktop'
  );

  // ─── Track actual window size to show correct device buttons
  const [currentViewport, setCurrentViewport] = useState(() =>
    typeof window !== 'undefined' ? getDeviceFromWidth(window.innerWidth) : 'desktop'
  );

  // ─── Update device and viewport when window is resized
  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      const detectedDevice = getDeviceFromWidth(width);
      setCurrentViewport(detectedDevice);
      setDevice(detectedDevice);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // ─── Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // ─── Reset loading state when modal opens or URL changes
  useEffect(() => {
    if (open) setIsLoading(true);
  }, [url, open]);

  // ─── Don't render anything if modal is closed
  if (!open) return null;

  const currentSize = DEVICE_SIZES[device];
  const availableIcons = DEVICE_ICONS[currentViewport] || [];

  // ─── Calculate modal width based on selected device and screen size
  const getModalWidth = () => {
    if (typeof window === 'undefined') return 800;
    if (device === 'fullscreen') return window.innerWidth;
    return Math.min(currentSize.maxWidth, window.innerWidth);
  };

  const modalWidth = getModalWidth();

  return (
    <div
      className="fixed inset-0 flex-center bg-primary p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="flex flex-col min-h-full rounded-xl shadow-2xl overflow-hidden"
        style={{ width: `${modalWidth}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Modal Header: Back button, device toggles, and Visit Site link */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-secondary">
          {/* ─── Back button to close modal */}
          <button onClick={onClose} className="btn-secondary flex-center gap-2 px-3 py-2 text-sm ">
            <ArrowLeft size={18} />
            {device !== 'mobile' && <span>Back</span>}
          </button>

          {/* ─── Device toggle buttons (shows available device sizes) */}
          <div className="flex items-center gap-2 rounded-lg p-1">
            {availableIcons.map((iconData) => (
              <button
                key={iconData.key}
                onClick={() => setDevice(iconData.device)}
                title={`${iconData.device} (${DEVICE_SIZES[iconData.device].maxWidth}px)`}
                className={`p-2 rounded-md ${device === iconData.device ? 'btn-primary shadow-sm' : 'btn-secondary'}`}
              >
                {iconData.icon}
              </button>
            ))}
          </div>

          {/* ─── Open website in new tab */}
          <div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-center gap-2 px-3 py-2 text-sm cursor-pointer"
            >
              <Globe size={16} />
              {device !== 'mobile' && <span>Visit Site</span>}
            </a>
          </div>
        </div>

        {/* ─── Modal Body: Website preview in iframe */}
        <div className="relative flex-1 flex-center">
          {/* ─── Show loading spinner while website loads */}
          {isLoading && (
            <div className="absolute inset-0 flex-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full size-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm">Loading preview...</p>
              </div>
            </div>
          )}

          {/* ─── Display website in iframe */}
          <div className="absolute inset-0">
            <iframe
              src={url}
              title="Live Preview"
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────── Live Preview Button Component */
export default function LivePreviewTrigger({ url }) {
  const [open, setOpen] = useState(false);

  // ─── Check if URL is valid before showing button
  const isValidUrl = url && typeof url === 'string' && url.trim().startsWith('http');
  if (!isValidUrl) {
    console.warn('LivePreviewTrigger: URL is empty or invalid:', url);
    return null;
  }

  return (
    <>
      {/* ─── Button to open live preview modal */}
      <button onClick={() => setOpen(true)} className="flex-center gap-2 btn-primary py-2.5 3xl:py-3 px-3 3xl:px-4">
        <ExternalLink strokeWidth={2} className="size-4.5 xs:hidden sm:inline" />
        <span className="hidden xs:inline">Live Preview</span>
      </button>

      {/* ─── Live preview modal */}
      <LivePreviewModal open={open} onClose={() => setOpen(false)} url={url} />
    </>
  );
}
