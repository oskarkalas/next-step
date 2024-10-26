import { definePreset } from 'primeng/themes';
import { Aura } from 'primeng/themes/aura';



export const PRIMENG_INPUT_THEME_PRESET = {
  inputtext: {
    colorScheme: {
      dark: {
        root: {
          color: 'var(--input-text-color)',
          background: 'var(--input-text-background)',
          borderColor: 'var(--input-text-border)',
          borderRadius: '12px',
          paddingX: '14px',
          paddingY: '14px',
        }
      }
    }
  }
}

export const PRIMENG_BUTTON_THEME_PRESET = {
  button: {
    colorScheme: {
      dark: {
        root: {
          borderRadius: '12px',
        }
      }
    }
  }
}

export const PRIMENG_CART_THEME_PRESET = {
  components: {
    card: {
      colorScheme: {
        dark: {
          root: {
            shadow: 'none',
            color: 'var(--surface-white)',
            background: 'var(--surface-card)',
            borderRadius: 'var(--card-border-radius)'
          },
          body: {
            padding: '28px',
            gap: '10px',
          },
          caption: {
            gap: '0'
          },
          title: {
            fontSize: '28px',
            fontWeight: 'normal',
          },
          subtitle: {
            color: 'var(--input-text-color)',
          }
        },
      }
    },
  }
}

export const PRIMENG_THEME_PRESET = definePreset(Aura, {
  global: {
    body: {
      background: 'red'
    }
  },
  components: {
    avatar: {
      colorScheme: {
        dark: {
          root: {
            color: 'var(--surface-black)',
            background: 'var(--surface-black)',
          }
        }
      }
    },
    ...PRIMENG_INPUT_THEME_PRESET,
    ...PRIMENG_BUTTON_THEME_PRESET,
    divider: {
      colorScheme: {
        dark: {
          root: {
            borderColor: 'var(--input-text-border)',
          }
        }
      }
    }
  }
});
