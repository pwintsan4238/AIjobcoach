import React from 'react';

/**
 * Small inline stroke icons (24px grid, 2px stroke) so the UI doesn't depend on
 * emoji rendering, which differs between phones. Decorative by default.
 */
type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({ title, children, className = 'w-5 h-5', ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={title ? undefined : true}
    role={title ? 'img' : undefined}
    {...rest}
  >
    {title && <title>{title}</title>}
    {children}
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = p => (
  <Icon {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></Icon>
);

export const LanguageIcon: React.FC<IconProps> = p => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></Icon>
);

export const MicIcon: React.FC<IconProps> = p => (
  <Icon {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></Icon>
);

export const ArrowRightIcon: React.FC<IconProps> = p => (
  <Icon {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>
);

export const ArrowLeftIcon: React.FC<IconProps> = p => (
  <Icon {...p}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></Icon>
);

export const UserIcon: React.FC<IconProps> = p => (
  <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>
);

export const LogInIcon: React.FC<IconProps> = p => (
  <Icon {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></Icon>
);

export const SparkleIcon: React.FC<IconProps> = p => (
  <Icon {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 17v4" /><path d="M17 19h4" /></Icon>
);

export const CheckIcon: React.FC<IconProps> = p => (
  <Icon {...p}><path d="m5 12 5 5 9-10" /></Icon>
);

/** Brand mark: a speech bubble with a mic, for "voice interview coach". */
export const ThandarMark: React.FC<IconProps> = p => (
  <Icon {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /><rect x="11" y="7.5" width="3" height="6" rx="1.5" /><path d="M9.5 12a3 3 0 0 0 6 0" /></Icon>
);
