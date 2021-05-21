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
                url: `${apiPath.treatment.treatment}${apiPath.treatment.patient}/${patientID}`
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
            console.log("Failed to add treatment: ", error);
            return {
                success: false,
            };
        }
    }

}

export default new TreatmentService();