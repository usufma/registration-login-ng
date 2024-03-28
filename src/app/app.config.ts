import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'basic-register-login',
          appId: '1:337758974831:web:5643863746dee1b76e6e9a',
          storageBucket: 'basic-register-login.appspot.com',
          apiKey: 'AIzaSyD6cr-5_7wTmoFJ8nNuFEuploqX2jSIrDs',
          authDomain: 'basic-register-login.firebaseapp.com',
          messagingSenderId: '337758974831',
          measurementId: 'G-3K2ZERW8EC',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
