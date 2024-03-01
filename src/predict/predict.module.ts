import { Module } from '@nestjs/common';
import { PredictService } from './predict.service';
import { PredictController } from './predict.controller';
import { ModelService } from 'src/model/model.service';

@Module({
    imports:[],
    providers:[PredictService,ModelService],
    controllers:[PredictController],
})
export class PredictModule {}
