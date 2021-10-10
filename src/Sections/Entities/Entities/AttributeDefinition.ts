import Point    from    "./Point";
import Entity   from    "../Entity";
import Tag      from    "../../../Internals/Tag";

export default class AttributeDefinition extends Entity
{
    get name(): string { return this._name; }
    get position(): Point { return this._position; }

    get flag()  : number        { return this._flag;    }
    get height(): number { return this._height; }
    get defaultValue(): string { return this._defaultValue; }
    get prompt(): string { return this._defaultValue; }

    private readonly _name: string;  
    private readonly _position: Point;

    private _flag      : number = 0;
    private _height: number = 1;
    private _defaultValue: string = "";
    private _prompt: string = "";

    public constructor(blockName: string, point: Point) {
        super('ATTDEF', 'AcDbText');
        this._name = blockName;
        this._position = point;
    }

    public boundingBox() {
        return [
            [this._position.x, this._position.y],
            [this._position.x, this._position.y],
        ];
    }

    public tags(): Tag[] {
        return [
            ...super.tags(),
            //...this.makeName(this._name),
            ...this.makePoint(this._position.x, this._position.y, this._position.z, true),
            ...this.makeStandard([
                [40, this.height],
                [1, this.defaultValue]]),
            ...this.makeSubclassMarker('AcDbAttributeDefinition'),
            ...this.makeStandard([
                [3, this.prompt],
                [2, this.name],
                [70, this._flag]])
            ];
    }
}