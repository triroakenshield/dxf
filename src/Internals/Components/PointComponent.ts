import Tag          from    "../Tag";
import DXFInterface from    "../Interfaces/DXFInterface";

export default class PointComponent implements DXFInterface
{
    get x(): number { return parseInt(this._x.value.toString()); }
    get z(): number { return parseInt(this._z.value.toString()); }
    get y(): number { return parseInt(this._y.value.toString()); }
    get digit(): number { return this._digit; }
    
    set y(value     : number) { this._y.value = value;  }
    set z(value     : number) { this._z.value = value;  }
    set x(value     : number) {  this._x.value = value; }    
    set digit(value : number) {
        if (value <= 8 && value >= 0) {
            this._digit         = value;
            this._x.groupCode   = parseInt(`1${this.digit}`);
            this._y.groupCode   = parseInt(`2${this.digit}`);
            this._z.groupCode   = parseInt(`3${this.digit}`);
        }
    }

    private readonly    _x     : Tag;
    private readonly    _y     : Tag;
    private readonly    _z     : Tag;
    private             _digit : number = 0;
    private readonly    _is3D  : boolean;

    public constructor(
        x: number, y: number, z: number = 0,
        is3D: boolean = false, digit: number = 0
    )
    {
        this._x     = new Tag(parseInt(`1${digit}`), x);
        this._y     = new Tag(parseInt(`2${digit}`), y);
        this._z     = new Tag(parseInt(`3${digit}`), z);
        this._is3D  = is3D;
        this._digit = digit;
    }

    stringify() : string
    {
        let str = '';
        str += this._x.stringify();
        str += this._y.stringify();
        if (this._is3D) str += this._z.stringify();
        return str;
    }
    
    tags() : Tag[]
    {
        if (this._is3D) return [this._x, this._y, this._z];
        return [this._x, this._y];
    }
}