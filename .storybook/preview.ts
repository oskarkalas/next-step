import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNGConfig } from 'primeng/api';
import { presetsConfig, PRIMENG_THEME_PRESET } from '../src/app/configs/primeng-theme-preset';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../src/app/app.routes';

function provideTheme(config: PrimeNGConfig) {
  return () => {
    config.theme.set({
      preset: PRIMENG_THEME_PRESET,
      ...presetsConfig.options,
    });
  };
}

const preview: Preview = {
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
