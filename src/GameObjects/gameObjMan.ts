import { DLinkMan } from "../Manager/DLinkMan";
import { ForwardItr } from "../Manager/ForwardItr";
import { GameObject } from "./gameObject";

export class GameObjMan{

    private dlinkMan : DLinkMan<GameObject>;

    /**
     *
     */
    constructor() {
        this.dlinkMan = new DLinkMan<GameObject>();   
    }

    public Add(obj: GameObject){
        
        this.dlinkMan.AddElement(obj);
    }

    public Remove(obj: GameObject){
        this.dlinkMan.RemoveElement(obj);
    }

    public Update() : void{

        var itr = this.dlinkMan.GetForwardItr() as ForwardItr<GameObject>;
        for(itr.First(); !itr.IsDone(); itr.Next()){
            itr.Current().update();
        }
    }
}