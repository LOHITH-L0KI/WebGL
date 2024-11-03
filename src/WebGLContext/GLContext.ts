
class GLContext{

    contextId : string;
    context : WebGL2RenderingContext;

    constructor(canvasId : string){
        var canvas = document.querySelector(canvasId) as HTMLCanvasElement;

        this.context = canvas.getContext("webgl2") as WebGL2RenderingContext;

        // Only continue if WebGL is available and working
        if (this.context == null) {
            console.error("Error in intializing WebGLRenderContext for canvas element with id: ", canvasId);
            
            alert("Unable to initialize WebGL2. Your browser or machine may not support it.");
            return;
        }

        // Set clear color to white, fully opaque
        this.context.clearColor(0.0, 0.0, 0.0, 0.8);
        this.context.clearDepth(1.0); // Clear everything
        this.context.enable(this.context.DEPTH_TEST); // Enable depth testing
        this.context.depthFunc(this.context.LEQUAL); // Near things obscure far things
    }
}

export {GLContext};