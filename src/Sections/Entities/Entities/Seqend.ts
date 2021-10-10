import Tag from "../../../Internals/Tag";
import DXFManager from "../../../Internals/DXFManager";

export default class Seqend extends DXFManager {

    get layerName(): string { return this._layer_name; }

    private readonly _layer_name: string;

    public constructor() {
        super();
        this._layer_name = DXFManager.currentLayer;
    }

    public tags(): Tag[] {
        return [
            ...this.makeEntityType("SEQEND"),
            ...this.makeHandle(this.handle),
            ...this.makeSubclassMarker('AcDbEntity'),
            ...this.makeLayer(this._layer_name),
        ];
    }
}