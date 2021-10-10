import Point    from "./Point";
import Entity   from "../Entity";
import Tag      from "../../../Internals/Tag";

export default class Attribute extends Entity
{
    get name(): string { return this._name; }
    get value(): string { return this._value; }
    get height(): number { return this._height; }
    get position(): Point { return this._position; }
    
    private readonly _name: string;  
    private readonly _position: Point;
    private readonly _height: number = 2;
    private readonly _value: string;

    public constructor(position: Point, name: string, value: string) {
        super('ATTRIB', 'AcDbText')
        this._name = name;
        this._position = position;
        //this._height = height;
        this._value = value;
    }

    public boundingBox() {
        // I have no idea how to get boundingBox of TEXT :(
        return [
            [this.position.x, this.position.y],
            [this.position.x, this.position.y],
        ];
    }

    public tags(): Tag[] {
        return [
            ...super.tags(),
            ...this.makePoint(this.position.x, this.position.y, this.position.z, true),
            ...this.makeStandard([
                [40, this.height],
                [1, this.value]]
            ),
            ...this.makeSubclassMarker('AcDbAttribute'),
            ...this.makeStandard([
                [2, this.name],
                [70, 0]])
        ];
    }
}