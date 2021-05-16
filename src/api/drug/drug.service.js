import {httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class DrugService{
    async getDrug(){
        try{
                    
            const result = await httpGet({
                url: apiPath.drug.drug,
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
                url: apiPath.drug.drug,
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
                url: `${apiPath.drug.drug}/${id}`,
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
                url: `${apiPath.drug.drug}/${id}`,
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
                url: `${apiPath.drug.drug}/${id}`,
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

export default new DrugService();