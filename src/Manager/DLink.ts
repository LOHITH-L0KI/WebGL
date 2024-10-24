
export class DLink{

    public next: DLink | null;
    public prev: DLink | null;

    public constructor(_prev? : DLink, _next? : DLink) {
        
        if(_next != undefined)
            this.next = _next;
        else
            this.next = null;

        if(_prev != undefined)
            this.prev = _prev;
        else
            this.prev = null;
    }
}