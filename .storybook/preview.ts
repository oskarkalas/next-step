import { APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';

function provideTheme(config: PrimeNGConfig) {
  return () => {
    config.theme.set({
      preset: Aura,
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
