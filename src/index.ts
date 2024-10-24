import { Camera } from './Camera/camera';
import {Shader} from './Shaders/shader'
import { SimpleShader } from './Shaders/simpleShader';
import { Model } from './Models/model';
import { TriangleModel } from './Models/triangleModel';
import { SquareModel } from './Models/squareModel';
import { GameObjectStatic } from './GameObjects/gameObjectStatic';
import { GameObjectDesc } from './GameObjects/gameObjectDesc';
import { quat, vec3 } from 'gl-matrix';
import { GameObjectMovable } from './GameObjects/gameObjectMovable';
import { GLContextMan } from './WebGLContext/GLContextMan';
import { PyramidModel } from './Models/pyramidModel';
import { ColorByVertexShader } from './Shaders/colorByVertexShader';
import { Texture } from './Texture/texture';
import { TextureShader } from './Shaders/textureShader';
import { ShaderManager } from './Shaders/ShadersManager';
import { GameObjMan } from './GameObjects/gameObjMan';

var camera : Camera;
var gameObjMan : GameObjMan;

function main(){

    GLContextMan.registerCanvas("#gLCanvas");

    //gameObject Manager
    gameObjMan = new GameObjMan();

    //camera
    camera = new Camera(((45 * Math.PI) / 180), 1, 0.1, 100.0);

    //create shaders
    var simpleShader = new SimpleShader() as Shader;
    ShaderManager.GetInstance().AddShader(simpleShader);

    var colbyVertShader = new ColorByVertexShader() as Shader;
    ShaderManager.GetInstance().AddShader(colbyVertShader);

    var textureShader = new TextureShader() as Shader;
    ShaderManager.GetInstance().AddShader(textureShader);

    //create models
    var triangleModel = new TriangleModel() as Model;
    var squareModel = new SquareModel() as Model;
    var pyramidModel = new PyramidModel() as Model;

    //create textures
    var greenGrass_RGB_Tex = new Texture("GreenGrass_RGB.png", false);

    //create gameObjects
    var desc = new GameObjectDesc();
    
     desc.trans = vec3.clone([-1.5, 1.0, -7.0]);
    var gameObj = GameObjectStatic.create(squareModel, desc);
    simpleShader.addGameObject(gameObj);
    gameObjMan.Add(gameObj);

    desc.trans = vec3.clone([0.5, -0.4, -3.0]);
    desc.texture = greenGrass_RGB_Tex;
    
    var gameObj2 = new GameObjectMovable(pyramidModel, desc, null, quat.clone([0.001, 0.0, 0.0, 1.0]));
    textureShader.addGameObject(gameObj2);
    gameObjMan.Add(gameObj2);
}

function run() : void
{
    //update
    gameObjMan.Update();

    //draw
    var gl = GLContextMan.CurrContext();
    if(gl != null)
    {
        // Clear the canvas before we start drawing on it.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        ShaderManager.GetInstance().Execute(camera);
    }

    window.requestAnimationFrame(run);
}

window.onload = main;
window.requestAnimationFrame(run);