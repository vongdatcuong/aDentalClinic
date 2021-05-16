import {httpPost,httpGet,httpPatch} from '../base-api';
import apiPath from '../path';


class PatientService{
    async getPatient(){
        try{
                    
            const result = await httpGet({
                url: apiPath.patient.patient,
            });
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
                url: `${apiPath.patient.patient}/${id}`,
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
                url: `${apiPath.patient.patient}/${id}`,
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
            return {
                success: false,
                data: null,
            };
        }
    }
}

export default new PatientService();