import {Routes} from "@angular/router";
import {UITemplatesModule, TABLE_PAGE} from "@solenopsys/ui-templates";
  import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {TABLES} from "./tables.config";

export const ROUTES: Routes = [
  TABLE_PAGE(':table'),
];

export const ROUTES_DEV: Routes = [
  {
    path: 'kubernetes',
    children: [{
      path: 'plugins',
    //  component: PluginsComponent,
    }, ...ROUTES]
  },
]

export const routesAndRedirect:Routes = [...ROUTES, {path: '', redirectTo: 'fragments', pathMatch: 'full'}]

export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES},
  {provide: 'mod_name', useValue: 'kubernetes'},
  {provide: 'Logger', useValue: 'LoggerMock'}
];

export const DECLARATION = [

]

export const IMPORTS_CONF = [
  UITemplatesModule,
  HttpClientModule,
  BrowserModule,
  CommonModule,
];
