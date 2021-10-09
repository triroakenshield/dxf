import Entity from "./Entity";
import Model from "./Model";
import Tag from "../../Internals/Tag";
import DXFManager from "../../Internals/DXFManager";

export default class Entities extends DXFManager {
    get model(): Model { return this._model; }

    private _model: Model = new Model();

    public constructor() { super(); }

    public boundingBox(): number[][] {
        return this._model.boundingBox();
    }

    public entitiesTags(entitiesArray: Entity[]): Tag[] {
        const tags: Tag[] = [];
        entitiesArray.forEach((entity) => {
            tags.push(...entity.tags());
        });
        return tags;
    }

    public centerView(): [number, number] {
        const [[leftUpX, leftUpY], [rightBottomX, rightBottomY]] = this.boundingBox();
        const x = leftUpX + (rightBottomX - leftUpX) / 2;
        const y = rightBottomY + (leftUpY - rightBottomY) / 2;
        return [x, y];
    }

    public viewHeight(): number {
        const [[, leftUpY], [, rightBottomY]] = this.boundingBox();
        return leftUpY - rightBottomY;
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...this.makeEntityType('SECTION'));
        tags.push(...this.makeName('ENTITIES'));

        tags.push(...this._model.tags());

        tags.push(...this.makeEntityType('ENDSEC'));
        return tags;
    }
}