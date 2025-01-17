import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";

export default class Variable extends DXFManager {
    get values(): [number, (number | string)][] {
        return this._values;
    }
    get variableName(): string {
        return this._variableName;
    }
    private readonly _variableName: string;
    private readonly _values: [number, (number | string)][];
    public constructor(variableName: string, values: [number, (number | string)][]) {
        super();
        this._values = values;
        this._variableName = variableName;
    }

    public tags(): Tag[] {

        return this.makeStandard([[9, `$${this.variableName}`], ...this.values]);
    }
};
