import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup } from '@angular/forms';
import { MATERIAL_FORM } from '../../../../../dist/ng2-materialcomponents';

@Component({
    selector: 'demo-radio',
    directives: [MATERIAL_FORM, REACTIVE_FORM_DIRECTIVES],
    template: require('./radio.html'),
})
export class DemoRadioComponent implements OnInit {
    public fg: FormGroup;
    public defaultValue: string = 'option6';

    constructor() {
        this.fg = new FormGroup({});
    }

    ngOnInit() { }
}
