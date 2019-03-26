import { PreventableBaklavaEvent, BaklavaEvent } from "./events";

export interface IOption {
    optionComponent: string;
    value: any;
    sidebarComponent?: string;
}

export class NodeOption implements IOption {

    public optionComponent: string;
    public sidebarComponent?: string;

    public events = {
        beforeSetValue: new PreventableBaklavaEvent<any>(),
        setValue: new BaklavaEvent<any>()
    };

    private _value: any;

    public constructor(optionComponent: string, value?: any, sidebarComponent?: any) {
        this.optionComponent = optionComponent;
        this.sidebarComponent = sidebarComponent;
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public set value(v: any) {
        if (this.events.beforeSetValue.emit(v)) { return; }
        this._value = v;
        this.events.setValue.emit(v);
    }

}
