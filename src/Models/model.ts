import { GLContextMan } from "../WebGLContext/GLContextMan";

abstract class Model{

    //pos
    public posData : Float32Array | null;
    //color
    public colData : Float32Array | null;
    //normal
    //UV
    public uvData : Float32Array | null;

    //indices
    private indexBuff : WebGLBuffer;
    private indicesCount : number;
    
    constructor(readonly _indexData: Uint16Array) {
        this.posData = null;
        this.colData = null;
        
        this.indicesCount = _indexData.length;
        this.createIndexBuffer(_indexData);
    }

    draw() : void
    {
        GLContextMan.CurrContext().bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, this.indexBuff);
        GLContextMan.CurrContext().drawElements(WebGL2RenderingContext.TRIANGLE_STRIP, this.indicesCount, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
    }

    private createIndexBuffer(_indexData: Uint16Array)
    {
        var glContext = GLContextMan.CurrContext();
        this.indexBuff = glContext.createBuffer() as WebGLBuffer;
        glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuff);
        glContext.bufferData(glContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(_indexData), glContext.STATIC_DRAW);
    }

}

export {Model} 