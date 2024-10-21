import { definePreset } from 'primeng/themes';
import { Aura } from 'primeng/themes/aura';

export const PRIMENG_THEME_PRESET = definePreset(Aura, {
  global: {
    body: {
      background: 'red'
    }
  },
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            shadow: 'none',
            color: 'var(--surface-white)',
            background: 'var(--surface-card)',
            borderRadius: 'var(--card-border-radius)'
          },
        },
      }
    },
    avatar: {
      colorScheme: {
        light: {
          root: {
            color: 'var(--surface-black)',
            background: 'var(--surface-black)',
          }
        }
      }
    },
    inputtext: {
      colorScheme: {
        light: {
          root: {
            color: 'var(--input-text-color)',
            background: 'var(--input-text-background)',
            borderColor: 'var(--input-text-border)',
          }
        }
      }
    },
    divider: {
      colorScheme: {
        light: {
          root: {
            borderColor: 'var(--input-text-border)',
          }
        }
      }
    }
  }
});
