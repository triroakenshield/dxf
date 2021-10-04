import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";
import Model        from "../../Sections/Entities/Model";

export default class Block extends DXFManager {

    get handleToOwner() : string { return this._handleToOwner; }
    get blockName()     : string { return this._blockName; }
    get model()     : Model { return this._model; }

    set handleToOwner(value: string) { this._handleToOwner = value; }

    private readonly    _blockName      :   string;
    private             _handleToOwner  :   string;
    private readonly    _endBlockHandle :   string;

    private readonly _model : Model;

    public constructor(name: string) {
        super();
        this._blockName         = name;
        this._handleToOwner     = '0';
        this._endBlockHandle    = this.handleSeed();
        this._model = new Model();
    }

    private startBlock(): Tag[] {
        return [
            ...this.makeEntityType('BLOCK'),
            ...this.makeHandle(this.handle),
            ...this.makeStandard([[330, this.handleToOwner]]),
            ...this.makeSubclassMarker('AcDbEntity'),
            ...this.makeLayer('0'),
            ...this.makeSubclassMarker('AcDbBlockBegin'),
            ...this.makeName(this.blockName),
            ...this.makeStandard([[70, 0]]),
            ...this.makePoint(0, 0, 0, true),
            ...this.makeName(this.blockName, 3),
            ...this.makeStandard([[1, '']])
        ];
    }

    private endBlock(): Tag[] {
        return [
            ...this.makeEntityType('ENDBLK'),
            ...this.makeHandle(this._endBlockHandle),
            ...this.makeStandard([[330, this.handleToOwner]]),
            ...this.makeSubclassMarker('AcDbEntity'),
            ...this.makeLayer('0'),
            ...this.makeSubclassMarker('AcDbBlockEnd')
        ];
    }
     
    public tags(): Tag[] {
        let tags: Tag[] = [];

        tags.push(...this.startBlock());
        tags.push(...this._model.tags());
        tags.push(...this.endBlock());

        return tags;
    }
};
