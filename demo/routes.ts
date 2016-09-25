import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/demo/home/home.component';
// import { DemoLayoutRoute } from './components/demo/layout/demo-layout';
// import { DemoNavigationRoute } from './components/demo/navigation/demo-navigation';
import { DemoFormsRoute } from './components/demo/forms/demo-forms';
import { DemoUserInterfaceRoute } from './components/demo/user-interface/demo-user-interface';
import {SupportRoute} from './components/support/support';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'layout', component: DemoLayoutRoute },
    // { path: 'navigation', component: DemoNavigationRoute },
    { path: 'forms', component: DemoFormsRoute },
    { path: 'user-interface', component: DemoUserInterfaceRoute },
    { path: 'support', component: SupportRoute },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
