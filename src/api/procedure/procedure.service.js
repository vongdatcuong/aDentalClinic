import {httpPost,httpGet,httpPatch} from '../base-api';
import apiPath from '../path';


class ProcedureService{
    async getProcedure(){
        try{
                    
            const result = await httpGet({
                url: apiPath.procedure.procedure,
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
                url: apiPath.procedure.procedure,
                body:data
            });
            if(result.success)
            {
                return {
                    success: true,
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
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.procedure.procedure}/${id}`,
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
    async searchCategory(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.procedure.procedure}${apiPath.procedure.category}/${id}`,
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
    async getProcedureCategory()
    {
        try{
                    
            const result = await httpGet({
                url: apiPath.procedure.procedure+apiPath.procedure.category,
            });
            return {
                success: true,
                data:result.payload,
            };            
        }
        catch(error){
            return {
                success: false,
                data: null
            };
        }
    }
    
    async update(id,data)
    {
        try{
            
            const result = await httpPatch({
                url: `${apiPath.procedure.procedure}/${id}`,
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
}

export default new ProcedureService();