import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup } from '@angular/forms';
import { MATERIAL_FORM } from '../../../../../dist/ng2-material-components';

@Component({
  selector: 'demo-text-area',
  directives: [ MATERIAL_FORM, REACTIVE_FORM_DIRECTIVES ],
  template: require('./text-area.html'),
})
export class DemoTextAreaComponent implements OnInit {

    public fg: FormGroup;

    constructor() {
        this.fg = new FormGroup({});
    }

  ngOnInit() {}
}
