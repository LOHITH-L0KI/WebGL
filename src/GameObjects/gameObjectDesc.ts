import { quat, vec3 } from "gl-matrix";
import { Texture } from "../Texture/texture";

class GameObjectDesc{
    
    trans : vec3;
    rotQuat : quat;
    scale : vec3;
    texture : Texture;
    
    constructor() {
        this.trans = vec3.create();
        this.rotQuat = quat.create();
        this.scale = vec3.clone([1.0, 1.0, 1.0]);
    }
}

export {GameObjectDesc};