import Point from "./Point";
import Entity   from    "../Entity";
import Attribute from "../Entities/Attribute";
import Tag from "../../../Internals/Tag";

export default class BlockReference extends Entity {
    get name(): string { return this._name; }
    get point(): Point { return this._point; }
    get attributes(): Attribute[] { return this._attributes; }

    private readonly _name: string;
    private readonly _point: Point;
    private _attributes: Attribute[] = [];

    public constructor(blockName: string, point: Point) {
        super('INSERT', 'AcDbBlockReference');
        this._name = blockName;
        this._point = point;
    }

    public addAttribute(name: string, value: string){
        this._attributes.push(new Attribute(new Point(0, 0, 0), name, value));
    }

    public boundingBox() {
        return [
            [this._point.x, this._point.y],
            [this._point.x, this._point.y],
        ];
    }

    private seqend(): Tag[] {
        return [
            ...this.makeEntityType('SEQEND'),
            ...this.makeHandle(this.handle),
            ...this.makeSubclassMarker('AcDbEntity'),
            ...this.makeLayer('0')
        ];
    }

    public tags(): Tag[] {
        let tags: Tag[] =  [
            ...super.tags(),
            ...this.makeName(this._name),
            ...this.makePoint(this._point.x, this._point.y, this._point.z, true)
        ];

        if (this.attributes.length > 0) {
            this.attributes.forEach((entity) => {
                tags.push(...entity.tags());
            });
            tags.push(...this.seqend());
        }

        return tags;
    }
}