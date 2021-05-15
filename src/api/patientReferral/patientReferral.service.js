import {httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class PatientReferralService{
    async getPatientReferral(){
        try{
                    
            const result = await httpGet({
                url: apiPath.referral.referral,
            });
            //console.log("Get procedure:",result.payload[0]);
            if(result.success)
            {
                return {
                    success:true,
                    data:result.payload
                }
            }
            else
            {
                return {
                    success: false,
                    data:null,
                };  
            }            
        }
        catch(error){
            //console.log("Failed to fetch procedure:",error);
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
                url: apiPath.referral.referral,
                body:data
            });
            //console.log("insert procedure:",result);
            if(result.success)
            {
                return {
                    success: true,
                    data:result.payload
                };
            }
            else
            {
                return {
                    success: false,
                };
            }      
        }
        catch(error){
            //console.log("Failed to insert procedure:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.referral.referral}/${id}`,
                query:{
                    get_patient:true,
                    get_source:true,
                    get_ref_patient:true,
                    get_staff:true,
                }
            });
            //console.log("search procedure:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            //console.log("Failed to fetch procedure:",error);
            return {
                success: false,
                data:null,
            };
        }
    }
    async searchByPatient(patientID)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.referral.referral}${apiPath.patient.patient}/${patientID}`,
                query:{
                    get_patient:true,
                    get_source:true,
                    get_ref_patient:true,
                    get_staff:true,
                }
            });
            //console.log("search procedure:",result);
            return {
                success: true,
                data:result.payload,
            };            
        }
        catch(error){
            //console.log("Failed to fetch procedure:",error);
            return {
                success: false,
                data:null,
            };
        }
    }
    
    async update(id,data)
    {
        //console.log("Data for update:",data);
        try{
            
            const result = await httpPatch({
                url: `${apiPath.referral.referral}/${id}`,
                body:data
            });
            //console.log("update procedure:",result);
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
            //console.log("Failed to update procedure:",error);
            return {
                success: false,
                data:null
            };
        }
    }
    async delete(id)
    {
        try{
            
            const result = await httpDelete({
                url: `${apiPath.referral.referral}/${id}`,
            });
            //console.log("delete referral source:",result);
            if(result.success)
            {
                return {
                    success: true,
                    message:result.message
                };   
            }
            else
            {
                return {
                    success: false,
                    message:result.message,
                };   
            }
                     
        }
        catch(error){
            //console.log("Failed to delete referralSource:",error);
            return {
                success: false,
                message:error,
            };
        }
    }
}

export default new PatientReferralService();