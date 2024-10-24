import { DLink } from "./DLink";
import { ForwardItr } from "./ForwardItr";

/**
 * Generic Double Link List Manager.
 */
export class DLinkMan<T extends DLink>{

    private root : T | null;
    private count : number;
    private forwardItr : ForwardItr<T>;

    public constructor() {
        this.count = 0;
        this.root = null;
        this.forwardItr = new ForwardItr<T>(null);
    }

    /**
     *  Adds Object to the front of List
     * @param object Element added to the List
     */
    public AddElement(object : T) : T{

        if(object != null){
            //update prev and next of new object
            if(this.root != null){
                object.next = this.root;
                this.root.prev = object;
            }

            //now set the new object as root element
            this.root = object;
            this.count++;
        }
        return object;
    }

    /**
     * Removes element from List
     * @param object Element of Type T removed from List.
     */
    public RemoveElement(object : T) : void{

        if(object == null || object == undefined)
            return null;

        // try to remove object from the list.
        else{
            if(object.prev != null)
                object.prev.next = object.next;
            else
                this.root = object.next as T;

            if(object.next != null)
                object.next.prev = object.prev;
            
            this.count--;
        }
    }

    public GetForwardItr(node? : T) : ForwardItr<T>{
        if(node == null){
            this.forwardItr.Reset(this.root);
        }
        else{
            this.forwardItr.Reset(node);
        }

        return this.forwardItr;
    }
}