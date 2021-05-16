import {httpPost,httpGet,httpPatch} from '../base-api';
import apiPath from '../path';


class PatientRecallService{
    async getPatientRecall(){
        try{
                    
            const result = await httpGet({
                url: apiPath.patientRecall.recall,
                query:{
                    get_patient:true,
                    get_treatment:true,
                    get_appointment:true,
                    get_procedure:true
                }
            });
            if(result.success)
            {
                return {
                    success:true,
                    data:result.payload,
                }
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
                url: apiPath.patientRecall.recall,
                body:data
            });
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
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.patientRecall.recall}/${id}`,
                
            });
            if(result.success)
            {
                return {
                    success: true,
                    data:result,
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
            return {
                success: false,
                data:null,
            };
        }
    }
    async update(id,data)
    {
        try{
            
            const result = await httpPatch({
                url: `${apiPath.patientRecall.recall}/${id}`,
                body:data
            });
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
            return {
                success: false,
                data:null
            };
        }
    }
    async getPatientRecallByID(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.patientRecall.recall}${apiPath.patient.patient}/${id}`,
                query:{
                    get_patient:true,
                    get_treatment:true,
                    get_appointment:true,
                    get_procedure:true
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
            return {
                success: false,
                data:null,
            };
        }
    }
}

export default new PatientRecallService();