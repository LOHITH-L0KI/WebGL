import { mat4, quat, vec3, vec4 } from "gl-matrix";
import { Model } from "../Models/model";
import { GameObjectDesc } from "./gameObjectDesc";
import { Texture } from "../Texture/texture";
import { DLink } from "../Manager/DLink";

abstract class GameObject extends DLink
{
    readonly model : Model;     //model
    readonly texture : Texture; //texture
    protected trans : vec3;     //trans
    protected rotQuat : quat;   //rot
    protected scale : vec3;     //scale
    public world : mat4;        //world

    abstract update() : void;

    protected constructor(_model: Model, desc: GameObjectDesc, _texture? : Texture | null)
    {
        super();
        this.model = _model;
        this.texture = _texture;

        this.trans = vec3.clone(desc.trans);
        this.rotQuat = quat.clone(desc.rotQuat);
        this.scale = vec3.clone(desc.scale);

        this.world = mat4.create();
        mat4.fromRotationTranslationScale(this.world, this.rotQuat, this.trans, this.scale);

    }

    draw() : void
    {
        if(this.texture != null)
            this.texture.SetToContext();

        this.model.draw();
    }
}

export {GameObject};