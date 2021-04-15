import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpPut} from '../base-api';
import apiPath from '../path';
import strings from '../../configs/strings';

class PatientService{
    async getPatient(){
        try{
                    
            const result = await httpGet({
                url: apiPath.patient.patient,
            });
            console.log("Get patient:",result.payload[0]);
            return {
                success: true,
                data:result.payload,
            };            
        }
        catch(error){
            console.log("Failed to fetch patient:",error);
            return {
                success: false,
                data: null
            };
        }
    }

    async insert(data)
    {
        try{
                    
            const result = await httpPost({
                url: apiPath.patient.patient,
                body:data
            });
            console.log("insert patient:",result);
            return {
                success: true,
            };            
        }
        catch(error){
            console.log("Failed to fetch patient:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.patient.patient}/${id}`,
            });
            console.log("search patient:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            console.log("Failed to fetch patient:",error);
            return {
                success: false,
                data:null,
            };
        }
    }
    async update(id,data)
    {
        console.log("Data for update:",data);
        try{
            
            const result = await httpPatch({
                url: `${apiPath.patient.patient}/${id}`,
                body:data
            });
            console.log("update patient:",result);
            if(result.success)
            {
                return {
                    success: true,
                    data:result
                };   
            }
            else
            {
                return {
                    success: false,
                    data:null,
                    message:result.message,
                };   
            }
                     
        }
        catch(error){
            console.log("Failed to update staff:",error);
            return {
                success: false,
                data:null
            };
        }
    }

    async getPatientProfile(id)
    {
        try{
            const result = await httpGet({
                url: `${apiPath.patient.patient}/${id}`,
            });
            return {
                success: true,
                data: result,
            };
        }
        catch(error){
            console.log("Failed to fetch patient profile: ",error);
            return {
                success: false,
                data: null,
            };
        }
    }
}

export default new PatientService();