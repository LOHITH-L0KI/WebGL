import { GLContextMan } from "../WebGLContext/GLContextMan";

class Texture{

    texObj : WebGLTexture;
    private static readonly textureRelPath : string = "../../textures/";

    constructor(readonly fileName : string,hasAlpha : boolean){

        //extract image data and create a texture object
        this.texObj = GLContextMan.CurrContext().createTexture();

        //intialize texture object with defult image data
        this.initializeTextureObject();

        if(fileName.length == 0){
            console.error("Invalid image file provided in texture object creation.");
        }
        else{
            //load image source file and bind it to the texture object.
            this.LoadImage(fileName, hasAlpha);
        }
    }

    private async LoadImage(fileName : string, hasAlpha : boolean){

        //extract image data ascyncronosuly
        const image = await this.getImageData(fileName);

        GLContextMan.CurrContext().bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.texObj);
        
        var mipLevel : GLint  = 0;
        var internalFormat : GLenum;
        if(hasAlpha)
            internalFormat = WebGL2RenderingContext.RGBA;
        else
            internalFormat = WebGL2RenderingContext.RGB;
        
        var format : GLenum = internalFormat;
        var pixelType : GLenum = WebGL2RenderingContext.UNSIGNED_BYTE;

        //load image data to glTexture object
        GLContextMan.CurrContext().texImage2D(WebGL2RenderingContext.TEXTURE_2D,
            mipLevel,
            internalFormat,
            format,
            pixelType,
            image
        );
    }

    getImageData = (fileName : string) => new Promise<TexImageSource>(resolve => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.src = Texture.textureRelPath + fileName;
        return image;
    });

    private initializeTextureObject() : any
    {
        //bind texture
        GLContextMan.CurrContext().bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.texObj);
        
        //default image data
        GLContextMan.CurrContext().texImage2D(WebGL2RenderingContext.TEXTURE_2D,
            0,
            WebGL2RenderingContext.RGBA,
            1,
            1,
            0,
            WebGL2RenderingContext.RGBA,
            WebGL2RenderingContext.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255])    // blue
        );

        //set wrap params
        GLContextMan.CurrContext().texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_WRAP_S, WebGL2RenderingContext.CLAMP_TO_EDGE);
        GLContextMan.CurrContext().texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_WRAP_T, WebGL2RenderingContext.CLAMP_TO_EDGE);

        //set minfication and magnification params
        GLContextMan.CurrContext().texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_MIN_FILTER, WebGL2RenderingContext.NEAREST);
        GLContextMan.CurrContext().texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_MAG_FILTER, WebGL2RenderingContext.LINEAR);

    }

    public SetToContext(){
        GLContextMan.CurrContext().bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.texObj);
    }
}

export {Texture};