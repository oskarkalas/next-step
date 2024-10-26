import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNGConfig } from 'primeng/api';
import { PRIMENG_THEME_PRESET } from '../src/app/configs/primeng/primeng-theme-preset';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../src/app/app.routes';
import { Aura } from 'primeng/themes/aura';

function provideTheme(config: PrimeNGConfig) {
  return () => {
    config.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: '.dark-theme',
      },
      ...PRIMENG_THEME_PRESET
    });
  };
}

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(
          RouterModule.forRoot(appRoutes),
        ),
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
