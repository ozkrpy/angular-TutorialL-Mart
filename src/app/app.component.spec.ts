import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { commonTestingModules,  commonTestingProviders,  MatIconRegistryFake,  DomSanitizerFake,  ObservableMediaFake, } from './common/common.testing' 
import { MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        commonTestingModules
      ],
      declarations: [
        AppComponent, 
        commonTestingProviders.concat([
          { provide: MediaObserver, useClass: ObservableMediaFake},
          { provide: MatIconRegistry, useClass: MatIconRegistryFake },        
          { provide: DomSanitizer, useClass: DomSanitizerFake }

        ])
      ],
    }).compileComponents();
  }));
/*
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LemonMart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('LemonMart');
  });

  
*/

});
