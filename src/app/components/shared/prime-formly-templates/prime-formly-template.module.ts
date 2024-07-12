import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyPrimeNGModule } from "@ngx-formly/primeng";
import { PrimeFieldWrapper } from "./wrappers/prime-field-wrapper";
import {PrimeInputType} from "./types/prime-input-type";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    PrimeFieldWrapper,
    PrimeInputType,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      wrappers: [
        {name: 'panel', component: PrimeFieldWrapper},
      ],
      types: [
        {name: 'input-text', component: PrimeInputType}
      ]
    }),
    InputTextModule
  ],
})
export class PrimeFormlyTemplateModule { }
