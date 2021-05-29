import {httpPost,httpGet,httpPatch} from '../base-api';
import apiPath from '../path';


class TreatmentService {

    async addTreatment(data)
    {
        try{
            const result = await httpPost({
                url: apiPath.treatment.treatment,
                body:data
            });
            console.log("Add treatment: ",result);
            if(result.success)
            {
                return {
                    success:true,
                }
            }
            else
            {
                return {
                    success: false,
                }; 
            }                
        }
        catch(error){
            console.log("Failed to add treatment: ",error);
            return {
                success: false,
            };
        }
    }

    
    async getAllTreatmentsByPatient(patientID)
    {
        try{
            const result = await httpGet({
                url: `${apiPath.treatment.treatment}${apiPath.treatment.patient}/${patientID}`,
                query:{
                    get_patient:true,
                    get_staff:true,
                    get_procedure:true,
                }
            });
            if(result.success)
            {
                return {
                    success: true,
                    data:result.payload,
                };  
            }
            else
            {
                return {
                    success:false,
                    data:null
                }
            }              
        }
        catch(error){
            console.log("Failed to fetch treatments: ", error);
            return {
                success: false,
            };
        }
    }

    
    async getTreatmentByID(treatmentID)
    {
        try{
            const result = await httpGet({
                url: `${apiPath.treatment.treatment}/${treatmentID}`,
                query:{
                    get_patient:true,
                    get_staff:true,
                    get_procedure:true,
                }
            });
            if(result.success)
            {
                return {
                    success: true,
                    data:result.payload,
                };  
            }
            else
            {
                return {
                    success:false,
                    data:null
                }
            }              
        }
        catch(error){
            console.log("Failed to get treatment: ", error);
            return {
                success: false,
            };
        }
    }
    async updateTreatment(treatmentID, data)
    {
        try{
            const result = await httpPatch({
                url: `${apiPath.treatment.treatment}/${treatmentID}`,
                body:data
            });
            console.log("Update treatment: ", result);
            if(result.success)
            {
                return {
                    success:true,
                }
            }
            else
            {
                return {
                    success: false,
                }; 
            }                
        }
        catch(error){
            console.log("Failed to update treatment: ",error);
            return {
                success: false,
            };
        }
    }
}

export default new TreatmentService();