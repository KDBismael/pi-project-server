import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/schema/patient.schema';

@Injectable()
export class PatientService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    ){}

    async createPatient(image: any,body:any): Promise<any> {   
        const newUser = new this.patientModel({
            ...body,
            image:image.buffer,
        });
        return newUser.save();
    }

    async findAll(query: any): Promise<any> {
        return await this.patientModel.find();
    }

    async findOneAndUpdate(query: any, payload: any): Promise<Patient> {
        return this.patientModel.findOneAndUpdate(query, payload, {
            new: true,
            upsert: true,
        });
    }
    
    async findOneAndRemove(query: any): Promise<any> {
        return this.patientModel.findByIdAndDelete(query);
    }  
}
