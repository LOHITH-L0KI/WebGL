import { GLContext } from "./GLContext";

class GLContextMan{
    
    private static intanceById : Map<string, GLContext> = new Map<string, GLContext>;
    private static currContext : WebGL2RenderingContext | null = null;

    static registerCanvas(canvasId : string) : void
    {
        //check if the context is already present in the map with same id
        if(this.intanceById.get(canvasId) == undefined)
        {
            //create a new GLContext for this canvas
            var glContext = new GLContext(canvasId);
            this.intanceById.set(canvasId, glContext);

            if(this.currContext == null)
                this.currContext = glContext.context;
        }
        else
        {
            console.log("Trying to create dupilcate GLContext for canvas element with id: ", canvasId);
        }
    }

    static CurrContext() : WebGL2RenderingContext{
        return GLContextMan.currContext;
    }

    static SetCurrContext(canvasId : string){
        var glContext = GLContextMan.intanceById.get(canvasId);

        if(glContext == undefined){
            console.log("No GLContext is present in for the canvas element with id: ", canvasId);
        }

        GLContextMan.currContext = glContext.context;
    }
}

export {GLContextMan};