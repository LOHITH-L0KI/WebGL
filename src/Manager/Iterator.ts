
export abstract class Iterator<T>{

    /**
     * Resets the Iterator to the begning of list
     */
    abstract First() : void;

    /**
     * Updates the current element of list to its next.
     */
    abstract Next() : void;

    /**
     * Check if any element left in the list to iterate
     */
    abstract IsDone() : boolean;

    /**
     * Get current element the iterator is pointing at.
     */
    abstract Current() : T;

    /**
     * Sets the iterator to start from this node.
     * @param node First node of the iterator
     */
    abstract  Reset(node : T) : void;
}