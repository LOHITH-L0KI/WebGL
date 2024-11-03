import { mat4, vec3 } from 'gl-matrix';
import { GLContextMan } from '../WebGLContext/GLContextMan';

class Camera
{
    projectionMatrix : mat4;
    viewMatrix : mat4;

    constructor()
    {
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
    }

    public updateViewMatrix(up_Vec: vec3, lookAt_pt: vec3, eye_pt: vec3): void{

        /**
         * Math under the hood
         * dirVec = -(lookAt_pt - eye_pt).norm;
         * rightVec = (upVec.cross(dirVec)).norm;
         */
        mat4.lookAt(this.viewMatrix, eye_pt, lookAt_pt, up_Vec);
    }

    public updateProjMatrix(fov: number, aspectRatio: number, zNear: number, zFar: number) : void{

        mat4.perspective(this.projectionMatrix, fov, aspectRatio, zNear, zFar);
    }

    public setToContext(perspIdx: WebGLUniformLocation, viewIdx: WebGLUniformLocation) : void{
        let glContext = GLContextMan.CurrContext();
        glContext.uniformMatrix4fv(perspIdx, false, this.projectionMatrix);
        glContext.uniformMatrix4fv(viewIdx, false, this.viewMatrix);
    }
}

export {Camera};