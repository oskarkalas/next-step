import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNGConfig } from 'primeng/api';
import { PRIMENG_THEME_PRESET } from '../src/app/configs/primeng/primeng-theme-preset';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../src/app/app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApolloModule } from 'apollo-angular';
import { provideHttpClient } from '@angular/common/http';

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
        provideHttpClient(),
        importProvidersFrom(
          RouterModule.forRoot(appRoutes, { useHash: true }),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          ApolloModule
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
