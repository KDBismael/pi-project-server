import { Injectable } from '@nestjs/common';
import { predictDto } from './dto';
import { ModelService } from 'src/model/model.service';
import * as tf from '@tensorflow/tfjs';
import * as tfnode from '@tensorflow/tfjs-node';
import { loadImage } from 'canvas';
import * as sharp from 'sharp';

@Injectable()
export class PredictService {
    constructor(private model:ModelService){}

    public async predict(body:predictDto) :Promise<string> {
        try {
            console.log("eee")
            const model=await this.model.loadModel();
            console.log("eeezzzz")
            const imagePath = 'https://drive.google.com/file/d/1tLKW7TAfTy6k0hfMfOehslNEe2GkCILh/view?usp=sharing';
            // const img = await loadImage(imagePath);
            // img.src = imagePath;
            let test_normal='src/img_946797649386887230.jpg';
            let test_unknown="src/img_9218954439959078387.jpg";
            let test="src/img_1005556732793955351.jpg";
            const a=await this.loadImageAndPreprocess(test)
            // console.log(model)
            const predictions = model.predict(a);
            if (Array.isArray(predictions)) {
                // .arraySync()
                const probabilities = predictions.map(tensor => tensor.print());
                console.log('Probabilities:', probabilities);
              } else {
                // If predictions is a single tensor
                const probabilities = predictions.print();
                console.log('Probabilities:', probabilities);
            }
        } catch (error) {
            console.log("--------");
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
        return  body.imageUrl.toString();
    }
    public async  loadImageAndPreprocess(path: string): Promise<tf.Tensor3D> {
        // Load image using sharp
        const imageBuffer = await sharp(path).toBuffer();
        // Decode image using TensorFlow.js Node.js bindings
        const pixels = tfnode.node.decodeImage(imageBuffer);

        // Resize the image to match the expected input shape [224, 224]
        const resizedImage = tf.image.resizeBilinear(pixels, [224, 224]);

        // Normalize the pixel values to the range [0, 1]        [[0.0000745, 0.7231252, 0.2768003],]
        // const normalizedPixels = resizedImage.toFloat().div(tf.scalar(255));
      
        // Expand dimensions to make it a batch of one
        const preprocessedImage = resizedImage.expandDims(0);
      
        return preprocessedImage as tf.Tensor3D;
      }
}
