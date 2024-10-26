import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNGConfig } from 'primeng/api';
import { PRIMENG_THEME_PRESET } from '../src/app/configs/primeng/primeng-theme-preset';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../src/app/app.routes';

function provideTheme(config: PrimeNGConfig) {
  return () => {
    config.theme.set({
      preset: PRIMENG_THEME_PRESET,
      options: {
        darkModeSelector: '.dark-theme',
      },
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
