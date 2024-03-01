import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import { join } from 'path';

@Injectable()
export class ModelService {
    async loadModel (): Promise<tf.LayersModel> {
        try {
            // const model = await tf.loadLayersModel('https://drive.google.com/file/d/1-1WvvVBO3xdSCYAaU1dflHPVR_8mP-Df/view?usp=sharing');
            // const path=join(__dirname, '..','model.json')
            const path="src/public/model.json";
            const model = await tf.loadLayersModel(`file://${path}`);
            return model;
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }
}
