import { Model } from "./model";

class PyramidModel extends Model{


      private static indices = new Uint16Array([ 0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 1,
            1, 4, 3,
            1, 3, 2
        ]);
    
    constructor() {
        super(PyramidModel.indices);

        this.posData = new Float32Array([0.0, 0.5, 0.0,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5
        ]);

        this.colData = new Float32Array([1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ]);

        this.uvData = new Float32Array([0.5, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            0.0, 1.0,
            1.0, 1.0
        ]);
    }

}

export {PyramidModel};