import Entity from "../Entity";
import Tag from "../../../Internals/Tag";

export default class Vertex extends Entity
{
    get vertexFlag(): number {
        return this._vertexFlag;
    }
    get vertexPoint(): number[] {
        return this._vertexPoint;
    }
    private readonly _vertexPoint: number[];
    private readonly _vertexFlag: number;

    public constructor(point: number[], vertexFlag: number) {
        super('VERTEX', 'AcDbVertex');
        this._vertexPoint = point;
        this._vertexFlag = vertexFlag;
    }

    public boundingBox() {
        const [x, y] = this.vertexPoint;
        return [
            [x, y],
            [x, y],
        ];
    }

    public tags(): Tag[] {
        const [x, y, z] = this.vertexPoint;
        return [
            ...super.tags(),
            ...this.makeSubclassMarker('AcDb3dPolylineVertex'), // TODO make this dynamic
            ...this.makePoint(x, y, z, true),
            ...this.makeStandard([[70, this.vertexFlag]])
        ];
    }
}
