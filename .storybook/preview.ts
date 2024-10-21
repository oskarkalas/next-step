import { APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNGConfig } from 'primeng/api';
import { PRIMENG_THEME_PRESET } from '../src/app/config/primeng-theme-preset';

function provideTheme(config: PrimeNGConfig) {
  return () => {
    config.theme.set({
      preset: PRIMENG_THEME_PRESET,
      options: {
        darkModeSelector: 'light-mode',
      }
    });
  };
}

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        {
          provide: APP_INITIALIZER,
          useFactory: provideTheme,
          deps: [PrimeNGConfig],
          multi: true,
        },
      ],
    }),
  ],
};

export default preview;
