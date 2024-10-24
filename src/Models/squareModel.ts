import { Model } from "./model";
class SquareModel extends Model
{
    private static indices = new Uint16Array([0, 1, 2,
                                              0, 2, 3]);
    
    constructor() {
        super(SquareModel.indices);

        this.posData = new Float32Array([-0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0]);
    }

}

export {SquareModel}