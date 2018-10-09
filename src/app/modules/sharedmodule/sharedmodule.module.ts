import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// App custom Pipes
import { FilterPipe } from '../../pipes/filter.pipe';
import { ProxyFilterPipe } from '../../pipes/proxy-filter.pipe';
import { SpeedPipe } from '../../pipes/speed.pipe';
import { CountryFlagPipe } from '../../pipes/country-flag.pipe';
import { OrderBy } from '../../pipes/order-by.pipe';

@NgModule({
    imports: [
        // Modules
        BrowserModule,
    ],

    declarations: [
        // Components & directives
        FilterPipe,
        ProxyFilterPipe,
        SpeedPipe,
        CountryFlagPipe,
        OrderBy,
    ],

    providers: [
        // Services
    ],

    exports: [
        // ...
        FilterPipe,
        ProxyFilterPipe,
        SpeedPipe,
        CountryFlagPipe,
        OrderBy,
    ],
})
export class SharedModule {}
