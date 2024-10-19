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
            shadow: '0 0 0 1px {surface.300}',
            color: '{surface.700}'
          },
        },
      }
    }
  }
});
