import { Camera } from "../Camera/camera";
import { GameObject } from "../GameObjects/gameObject";
import { GLContextMan } from "../WebGLContext/GLContextMan";
import { Shader } from "./shader";

class ConstColorShader extends Shader
{
   
    vsSource =  `
    attribute vec4 aVertexPosition;
    uniform mat4 uWorldMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
    gl_Position = uProjectionMatrix * uViewMatrix * uWorldMatrix * aVertexPosition;
    }
    `;

    psSource = `
    
    uniform vec4 uColor;
    
    void main() {
      gl_FragColor = vec4(uColor);
    }
  `;

    private posBuff : WebGLBuffer;

    /**
        Creats an object of simple shader.
     */
    constructor() {
        super();
        
        this.posBuff = GLContextMan.CurrContext().createBuffer() as WebGLBuffer;

        //calling these functions in base class leads to runtime errors as these are abstract methods.
        this.createAndLinkShaders();
        this.createVAO();


        if(this.posBuff == null)
        {
            console.log("Error in creating Vertex Buffer");
            throw new Error("Error in creating Vertex Buffer");
        }
    }

    createAndLinkShaders(): void {
        
        var glContext = GLContextMan.CurrContext();
        var vxShader = this.createShader(this.vsSource, glContext.VERTEX_SHADER);
        glContext.attachShader(this.glProgram, vxShader);

        var pxShader = this.createShader(this.psSource, glContext.FRAGMENT_SHADER);
        glContext.attachShader(this.glProgram, pxShader);

        this.linkShaders();
        this.getUniformLocations();
    }

    createVAO(): void {

        var glContext = GLContextMan.CurrContext();
        var posIdx = glContext.getAttribLocation(this.glProgram, "aVertexPosition");

        glContext.bindVertexArray(this.glVAO);
        glContext.bindBuffer(glContext.ARRAY_BUFFER, this.posBuff);
        glContext.bufferData(glContext.ARRAY_BUFFER, 30*4, glContext.DYNAMIC_DRAW);
        glContext.vertexAttribPointer(posIdx, 3, glContext.FLOAT, false, 0, 0);
        glContext.enableVertexAttribArray(posIdx);

        //unbind vertex array object.
        glContext.bindVertexArray(null);

    }

    getUniformLocations(): void {
        var glContext = GLContextMan.CurrContext();

        this.perspIdx  = glContext.getUniformLocation(this.glProgram, "uProjectionMatrix");
        this.viewIdx = glContext.getUniformLocation(this.glProgram, "uViewMatrix");
    }

    setToContext(): void {
        
        var glContext = GLContextMan.CurrContext();
        glContext.useProgram(this.glProgram);
        glContext.bindVertexArray(this.glVAO);

    }
    
    updateBuffersFromGameObject(gameObj: GameObject): void {
        
        var glContext = GLContextMan.CurrContext();
        //set vertex attribute buffer
        //pos
        if(gameObj.model.posData != null){
            
            glContext.bindBuffer(glContext.ARRAY_BUFFER, this.posBuff);
            glContext.bufferSubData(glContext.ARRAY_BUFFER, 0, gameObj.model.posData);
        }
        else{
            console.log("No Pos Data avaliable from game Object. This data is required in vertex Shader.");
        }

        //set uniform modelView buffer data
        var mvIdx = glContext.getUniformLocation(this.glProgram, "uWorldMatrix");
        glContext.uniformMatrix4fv(mvIdx, false, gameObj.world);
    }
}

export {ConstColorShader};