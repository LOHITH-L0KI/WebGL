import { Camera } from '../Camera/camera';
import {GameObject} from '../GameObjects/gameObject';
import { GLContextMan } from '../WebGLContext/GLContextMan';

abstract class Shader{

    protected glProgram : WebGLProgram;
    protected glVAO : WebGLVertexArrayObject;
    private gameObjectsList : Array<GameObject>;
    
    constructor()
    {
        
        this.glProgram = GLContextMan.CurrContext().createProgram() as WebGLProgram;
        
        if(this.glProgram == null){
            console.log("Error in creating GLProgram Object.");
            throw new Error("Error in creating GLProgram Object.");
        }
            
        this.glVAO = GLContextMan.CurrContext().createVertexArray() as WebGLVertexArrayObject;
        
        if(this.glVAO == null)
        {
            console.log("Error in creating WebGLVertexArrayObject.");
            throw new Error("Error in creating WebGLVertexArrayObject.");
        }
            
        this.gameObjectsList = new Array<GameObject>();
    }

    addGameObject(gameObj : GameObject) : void
    {
        this.gameObjectsList.push(gameObj);
    }

    draw(camera : Camera) : void
    {
        //set this to context
        this.setToContext(camera);

        //now render each game object from the list
        this.gameObjectsList.forEach(obj => {
            this.updateBuffersFromGameObject(obj);
            obj.draw();
        });
    }

    abstract createAndLinkShaders() : void;
    abstract createVAO() : void;
    abstract setToContext(camera : Camera) : void;
    abstract updateBuffersFromGameObject(gameObj : GameObject) : void;
    /*
        Creates a shader object from the source code and type of shader
    */
    protected createShader(source : string,  type : GLenum) : WebGLShader
    {
        var glContext = GLContextMan.CurrContext();
        //create shader object
        var shaderObj = glContext.createShader(type) as WebGLShader;

        //add source to shader object
        glContext.shaderSource(shaderObj, source);

        //compile the shader
        glContext.compileShader(shaderObj);

        //check if compilation is successful
        if(!glContext.getShaderParameter(shaderObj, glContext.COMPILE_STATUS))
        {
            console.log("Error in creating Shader Object.");
            throw new Error("Error in creating Shader Object.");
        }

        return shaderObj;
    }

    /**
        Link Shaders of to the respective program.
    */
    protected linkShaders() : void
    {
        var glContext = GLContextMan.CurrContext();
        glContext.linkProgram(this.glProgram);
        
        //check if creating shader program is successful
        if(!glContext.getProgramParameter(this.glProgram, glContext.LINK_STATUS)){

           console.log("Error in Linking Shaders");
           throw new Error("Error in Linking Shaders");
        }
    }

}

export {Shader};