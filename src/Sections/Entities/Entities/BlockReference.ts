import Point from "./Point";
import Entity   from    "../Entity";
import Tag from "../../../Internals/Tag";

export default class BlockReference extends Entity {
    get name(): string { return this._name; }
    get point(): Point { return this._point; }

    private readonly _name: string;
    private readonly _point: Point;

    public constructor(blockName: string, point: Point) {
        super('INSERT', 'AcDbBlockReference');
        this._name = blockName;
        this._point = point;
    }

    public boundingBox() {
        return [
            [this._point.x, this._point.y],
            [this._point.x, this._point.y],
        ];
    }

    public tags(): Tag[] {
        return [
            ...super.tags(),
            ...this.makeName(this._name),
            ...this.makePoint(this._point.x, this._point.y, this._point.z, true)
        ];
    }
}