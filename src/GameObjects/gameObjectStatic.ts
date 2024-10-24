import { vec3, quat, mat4 } from "gl-matrix";
import { Model } from "../Models/model";
import { GameObject } from "./gameObject";
import { GameObjectDesc } from "./gameObjectDesc";


class GameObjectStatic extends GameObject{

    private constructor(model: Model, desc : GameObjectDesc)
    {
        super(model, desc);
    }

    static create(_model: Model, desc: GameObjectDesc): GameObject {
        var obj = new GameObjectStatic(_model, desc);

        return obj as GameObject;
    }

    static createDefault(_model : Model) : GameObject{
        var desc = new GameObjectDesc();
        var obj = new GameObjectStatic(_model, desc);
        
        return obj as GameObject;
    }

    update() : void
    {
        //no need to update as the objects are static
    }
}

export {GameObjectStatic}