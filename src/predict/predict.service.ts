import { Injectable } from '@nestjs/common';
import { predictDto } from './dto';
import { ModelService } from 'src/model/model.service';
import * as tf from '@tensorflow/tfjs';
import * as tfnode from '@tensorflow/tfjs-node';
import { loadImage } from 'canvas';
import * as sharp from 'sharp';
import { json } from 'express';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class PredictService {
    constructor(
        private model:ModelService,
        private patient:PatientService
    ){}

    public async predict(body:predictDto,image:Express.Multer.File) :Promise<any> {
        try {
            const model=await this.model.loadModel();
            // const imagePath = 'https://drive.google.com/file/d/1tLKW7TAfTy6k0hfMfOehslNEe2GkCILh/view?usp=sharing';
            // const img = await loadImage(imagePath);
            // img.src = imagePath;
            let test_normal='src/img_946797649386887230.jpg';
            let test_unknown="src/img_9218954439959078387.jpg";
            let test="src/img_1005556732793955351.jpg";
            const a=await this.loadImageAndPreprocess(test,image)
            // console.log(model)
            const predictions = model.predict(a);
            if (Array.isArray(predictions)) {
                // .arraySync()
                predictions.map(tensor => tensor.print());
                // console.log('Probabilities:', probabilities);
            } else {
                // If predictions is a single tensor
                predictions.print();
                const predictionsArray = Array.from(predictions.dataSync());
                const maxIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
                console.log('Predicted Class Index:', maxIndex);
                // console.log('Probabilities:', probabilities);
                return await this.patient.createPatient(image,body,maxIndex)
            }
        } catch (error) {
            console.log(error);
        }
        // img.onload = async function () {
        //     const tensor = tf.browser.fromPixels()
        //     .resizeNearestNeighbor([224, 224])
        //     .toFloat()
        //     .div(tf.scalar(255))
        //     .expandDims()
        //     const predictions = await model.predict(tensor);
        //     console.log('Predictions:', predictions);
        // }
        // const imgToPredict = tf.browser.fromPixels(img)
        // .resizeNearestNeighbor([224, 224])
        // .toFloat()
        // .div(tf.scalar(255))
        // .expandDims();

        // const predictions = model.predict(imgToPredict);
        // console.log('Predictions:', predictions);

        // const predictedClassIndex = Math.max( Array.from(predictions))
        // .indexOf(Math.max(...predictions));
        // console.log('Predicted Class Index:', predictedClassIndex);
        // const prediction= model.predict(tf.image(),{batchSize: 0})
    }
    public async  loadImageAndPreprocess(path?: string,image?:Express.Multer.File): Promise<tf.Tensor3D> {
        // Load image using sharp
        // const imageBuffer = await sharp(path).toBuffer();
        const imageBuffer = image.buffer;
        // Decode image using TensorFlow.js Node.js bindings
        const pixels = tfnode.node.decodeImage(imageBuffer,3);

        // Resize the image to match the expected input shape [224, 224]
        const resizedImage = tf.image.resizeBilinear(pixels, [224, 224]);

        // Normalize the pixel values to the range [0, 1]        [[0.0000745, 0.7231252, 0.2768003],]
        // const normalizedPixels = resizedImage.toFloat().div(tf.scalar(255));
      
        // Expand dimensions to make it a batch of one
        const preprocessedImage = resizedImage.expandDims(0);
      
        return preprocessedImage as tf.Tensor3D;
      }
}
