import { Model } from "./model";
class TriangleModel extends Model
{
    private static indices = new Uint16Array([0, 1, 2]);
    
    constructor() {
        super(TriangleModel.indices);

        this.posData = new Float32Array([0.0, 1.0, 0.0,
            -1.0, 0.0, 0.0,
            1.0, 0.0, 0.0]);
    }

}

export {TriangleModel}