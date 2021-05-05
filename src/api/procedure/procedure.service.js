import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpPut} from '../base-api';
import apiPath from '../path';
import strings from '../../configs/strings';

class ProcedureService{
    async getProcedure(){
        try{
                    
            const result = await httpGet({
                url: apiPath.procedure.procedure,
            });
            console.log("Get procedure:",result.payload[0]);
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
            console.log("Failed to fetch procedure:",error);
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
            console.log("insert procedure:",result);
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
            console.log("Failed to insert procedure:",error);
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
            console.log("search procedure:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            console.log("Failed to fetch procedure:",error);
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
            console.log("search procedure category:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            console.log("Failed to fetch procedure:",error);
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
            console.log("Get procedure category:",result.payload[0]);
            return {
                success: true,
                data:result.payload,
            };            
        }
        catch(error){
            console.log("Failed to fetch procedure category:",error);
            return {
                success: false,
                data: null
            };
        }
    }
    
    async update(id,data)
    {
        console.log("Data for update:",data);
        try{
            
            const result = await httpPatch({
                url: `${apiPath.procedure.procedure}/${id}`,
                body:data
            });
            console.log("update procedure:",result);
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
            console.log("Failed to update procedure:",error);
            return {
                success: false,
                data:null
            };
        }
    }
}

export default new ProcedureService();