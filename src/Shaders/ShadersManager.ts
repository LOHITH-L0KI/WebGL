import { Camera } from "../Camera/camera";
import { Shader } from "./shader";

export class ShaderManager {

    private static instance : ShaderManager = null;
    shaderList : Array<Shader>;

    private constructor(){
        this.shaderList = new Array<Shader>(10);
    }

    static GetInstance() : ShaderManager{
        
        if(ShaderManager.instance == null)
            ShaderManager.instance = new ShaderManager();

        return ShaderManager.instance;
    }

    public AddShader(_shader : Shader): void{

        this.shaderList.push(_shader);
    }

    public Execute(camera : Camera): void{

        this.shaderList.forEach((shader, idx, list) => {
            shader.draw(camera);
        })
    }
}