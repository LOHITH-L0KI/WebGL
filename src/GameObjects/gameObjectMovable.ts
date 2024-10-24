import { mat4, quat, vec3} from "gl-matrix";
import { GameObject } from "./gameObject";
import { Model } from "../Models/model";
import { GameObjectDesc } from "./gameObjectDesc";

class GameObjectMovable extends GameObject{
    
    //transformation factors.
    transBy : vec3;
    rotQuatLocallyBy: quat;

    private loaclTransform : mat4;

    /**
     *
     */
    constructor(_model : Model, _desc : GameObjectDesc, _transBy? : vec3 | null, _localRotBy? : quat | null) {
        super(_model, _desc, _desc.texture);
        
        this.transBy = _transBy == null ? vec3.create() : vec3.clone(_transBy);
        this.rotQuatLocallyBy = _localRotBy == null ? quat.create() : quat.clone(_localRotBy);

        this.loaclTransform = mat4.create();
    }
    
    update(): void {
        mat4.fromRotationTranslation(this.loaclTransform, this.rotQuatLocallyBy, this.transBy);
        
        //Apllying Local tranformation (M) as [(W*M*W_inv) * W] = W*M
        mat4.mul(this.world, this.world, this.loaclTransform);
    }

}

export { GameObjectMovable};