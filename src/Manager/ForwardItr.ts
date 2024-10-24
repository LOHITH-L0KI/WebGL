import { DLink } from "./DLink";
import { Iterator } from "./Iterator";

export class ForwardItr<T extends DLink> extends Iterator<T>{
    
    private root : T | null;
    private curr : T | null;
    /**
     *
    */
    constructor(root : T | null) {
        super();
        this.privReset(root);
    }

    First(): void {
        this.curr = this.root;
    }

    Next(): void {
        if(this.curr != null)
            this.curr = this.curr.next as T;
    }

    IsDone(): boolean {
        return this.curr == null;
    }

    Current(): T {
        return this.curr;
    }

    Reset(node : T){
        this.privReset(node);
    }

    private privReset(node : T){
        this.root = node;
        this.curr = null;
    } 
}