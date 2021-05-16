import { httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class PrescriptionService{
    async getPrescription(){
        try{
                    
            const result = await httpGet({
                url: apiPath.prescription.prescription,
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
                url: apiPath.prescription.prescription,
                body:data
            });
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
                    data:null
                }; 
            }                      
        }
        catch(error){
            return {
                success: false,
            };
        }
    }
  
    async detail(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.prescription.prescription}/${id}`,
                query:{
                    get_details:true,
                    get_provider:true
                }
            });
           
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            return {
                success: false,
                data:null,
            };
        }
    }
    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.prescription.prescription}/${id}`,
            });
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            return {
                success: false,
                data:null,
            };
        }
    }
    async searchByPatient(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.prescription.prescription}${apiPath.prescription.patient}/${id}`,
                query:{
                    get_details:true,
                }
            });
            return {
                success: true,
                data:result,
            };            
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
                url: `${apiPath.prescription.prescription}/${id}`,
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
    async updateDetail(id,data)
    {
        try{
            
            const result = await httpPatch({
                url: `${apiPath.prescription.prescription}${apiPath.prescription.detail}/${id}`,
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
    async delete(id)
    {
        try{
            
            const result = await httpDelete({
                url: `${apiPath.prescription.prescription}/${id}`,
            });
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
            return {
                success: false,
                message:error,
            };
        }
    }
}

export default new PrescriptionService();