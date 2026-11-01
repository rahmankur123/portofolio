import React from 'react';

// Reusable SVG Icon Wrapper
function SvgIcon({ size = 18, color = 'currentColor', className = '', children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function Menu({ size = 20, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </SvgIcon>
  );
}

export function X({ size = 20, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgIcon>
  );
}

export function Send({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </SvgIcon>
  );
}

export function Sliders({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="1" x2="7" y1="14" y2="14" />
      <line x1="9" x2="15" y1="8" y2="8" />
      <line x1="17" x2="23" y1="16" y2="16" />
    </SvgIcon>
  );
}

export function ChevronRight({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m9 18 6-6-6-6" />
    </SvgIcon>
  );
}

export function ChevronLeft({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m15 18-6-6 6-6" />
    </SvgIcon>
  );
}

export function Sparkles({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </SvgIcon>
  );
}

export function ExternalLink({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </SvgIcon>
  );
}

export function ArrowDown({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </SvgIcon>
  );
}

export function ArrowUp({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </SvgIcon>
  );
}

export function ArrowRight({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </SvgIcon>
  );
}

export function Mail({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </SvgIcon>
  );
}

export function MapPin({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </SvgIcon>
  );
}

export function Clock({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </SvgIcon>
  );
}

export function Download({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </SvgIcon>
  );
}

export function FolderGit2({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2" />
      <circle cx="13" cy="12" r="2" />
      <circle cx="20" cy="14" r="2" />
      <circle cx="20" cy="20" r="2" />
      <path d="M13 14v4a2 2 0 0 0 2 2h3" />
      <path d="M20 16v2" />
    </SvgIcon>
  );
}

export function CheckCircle2({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </SvgIcon>
  );
}

export function CheckCircle({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </SvgIcon>
  );
}

export function AlertCircle({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </SvgIcon>
  );
}

export function GraduationCap({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 3.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 6.908a2 2 0 0 0 1.66 0l6.71-5.409v4.457a1 1 0 0 0 2 0v-6.95Z" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </SvgIcon>
  );
}

export function Calendar({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </SvgIcon>
  );
}

export function Award({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    </SvgIcon>
  );
}

export function Briefcase({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </SvgIcon>
  );
}

export function Building({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </SvgIcon>
  );
}

export function Tag({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </SvgIcon>
  );
}

export function Layers({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </SvgIcon>
  );
}

export function Code({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </SvgIcon>
  );
}

export function Code2({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </SvgIcon>
  );
}

export function FileCode({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M10 12.5 8 15l2 2.5" />
      <path d="m14 12.5 2 2.5-2 2.5" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
    </SvgIcon>
  );
}

export function Layout({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </SvgIcon>
  );
}

export function Palette({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </SvgIcon>
  );
}

export function Zap({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </SvgIcon>
  );
}

export function Terminal({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </SvgIcon>
  );
}

export function Server({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </SvgIcon>
  );
}

export function Database({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </SvgIcon>
  );
}

export function Globe({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </SvgIcon>
  );
}

export function ShieldCheck({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </SvgIcon>
  );
}

export function GitBranch({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </SvgIcon>
  );
}

export function Cpu({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </SvgIcon>
  );
}

export function Wrench({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </SvgIcon>
  );
}

export function Trash2({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </SvgIcon>
  );
}

export function RefreshCw({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </SvgIcon>
  );
}

export function Eye({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </SvgIcon>
  );
}

export function EyeOff({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </SvgIcon>
  );
}

export function MessageSquare({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </SvgIcon>
  );
}

export function Loader2({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </SvgIcon>
  );
}

export function Info({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="16" y2="12" />
      <line x1="12" x2="12.01" y1="8" y2="8" />
    </SvgIcon>
  );
}

export function Compass({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </SvgIcon>
  );
}

export function Lightbulb({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </SvgIcon>
  );
}

export function User({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </SvgIcon>
  );
}

export function Lock({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SvgIcon>
  );
}

export function ArrowLeft({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </SvgIcon>
  );
}

export function Plus({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </SvgIcon>
  );
}

export function Edit({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </SvgIcon>
  );
}

export function Save({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </SvgIcon>
  );
}

export function Check({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </SvgIcon>
  );
}

export function Image({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </SvgIcon>
  );
}

export function Upload({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </SvgIcon>
  );
}

export function Star({ size = 18, fill = 'none', ...props }) {
  return (
    <SvgIcon size={size} fill={fill} {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </SvgIcon>
  );
}

export function Crop({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </SvgIcon>
  );
}

export function RotateCw({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </SvgIcon>
  );
}

export function ZoomIn({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </SvgIcon>
  );
}

export function ZoomOut({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </SvgIcon>
  );
}

export function Camera({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </SvgIcon>
  );
}

export function Copy({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </SvgIcon>
  );
}

export function Key({ size = 18, ...props }) {
  return (
    <SvgIcon size={size} {...props}>
      <path d="m21 2-2 2m-1.5 1.5L19 7l-2 2-1.5-1.5" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </SvgIcon>
  );
}




