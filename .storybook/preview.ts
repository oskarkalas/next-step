import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PRIMENG_THEME_PRESET } from '../src/app/configs/primeng/primeng-theme-preset';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../src/app/app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApolloModule } from 'apollo-angular';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';

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
        providePrimeNG({
          theme: {
            preset: PRIMENG_THEME_PRESET,
            options: {
              darkModeSelector: '.dark-theme',
            },
          }
        })
      ],
    }),
  ],
};

export default preview;
