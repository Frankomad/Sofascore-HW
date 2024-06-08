// kuma.config.js
import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    primary: 'var(--color-primary-default)',
    secondary: 'var(--color-secondary-default)',
    highlight: {
      primary: 'var(--color-primary-highlight)',
      secondary: 'var(--color-secondary-highlight)',
    },
    onPrimary: 'var(--on-color-on-color-primary)',
    surface: {
      s0: 'var(--surface-surface-0)',
      s1: 'var(--surface-surface-1)',
      s2: 'var(--surface-surface-2)',
    },
    onSurface: {
      lv1: 'var(--on-surface-on-surface-lv-1)',
      lv2: 'var(--on-surface-on-surface-lv-2)',
      lv3: 'var(--on-surface-on-surface-lv-3)',
      lv4: 'var(--on-surface-on-surface-lv-4)',
    },
    status: {
      error: 'var(--status-error)',
      alert: 'var(--status-alert)',
      success: 'var(--status-success)',
    },
    live: 'var(--specific-live)',
  },
  spacings: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  breakpoints: {
    sm: '400px',
    md: '700px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
  },
  lineHeights: {
    normal: '1.4',
    snug: '1.25',
    relaxed: '1.5',
  },
  components: {
    Image: {
      
    },
    Button: {
      defaultProps: {
        padding: '8px',
        borderRadius: '2px',
        fontWeight: 600,
        border: '2px solid var(--color-primary-default)',
        _hover: {
          opacity: 0.9,
          border: '2px solid var(--color-primary-variant)',
        },
        _disabled: { 
          opacity: 0.4,
        },
      },
      variants: {
        primary: {
          bg: 'var(--color-primary-default)',
          color: 'var(--on-color-on-color-primary)',
          _hover: {
            bg: 'var(--color-primary-variant)',
          },
        },
        stroked: {
          bg: 'transparent',
          color: 'var(--color-primary-default)',
          _hover: {
            bg: 'var(--color-primary-highlight)',
          },
        },
        unshielded: {
          bg: 'transparent',
          color: 'var(--color-primary-default)',
          _hover: {
            color: 'var(--color-primary-variant)',
          },
        },
        icon: {
          bg: 'var(--color-primary-default)',
          color: 'var(--on-color-on-color-primary)',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '2px',
          _hover: {
            bg: 'var(--color-primary-variant)',
          },
        },
      },
    },
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
