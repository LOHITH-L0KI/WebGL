import { mat4, vec3 } from 'gl-matrix';

class Camera
{
    fov ;//= (45 * Math.PI) / 180;
    aspectRatio; // = 1;
    zNear;// = 0.1;
    zFar; // = 100.0;
    projectionMatrix : mat4;
    viewMatrix : mat4;

    constructor(_fov : any, _aspectRatio : any, _zNear : any, _zFar : any)
    {
        this.fov = _fov;
        this.aspectRatio = _aspectRatio;
        this.zNear = _zNear;
        this.zFar = _zFar;
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();

        mat4.perspective(this.projectionMatrix, this.fov, this.aspectRatio, this.zNear, this.zFar);
        mat4.lookAt(this.viewMatrix
            , [0.0, 0.0, 1.0]
            , [0.0, 0.0, -1.5]
            , [0.0, 1.0, 0.0]);
    }
}

export {Camera};