import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';
import strings from '../../configs/strings';

class DrugService{
    async getDrug(){
        try{
                    
            const result = await httpGet({
                url: apiPath.drug.drug,
            });
            console.log("Get drug:",result.payload[0]);
            return {
                success: true,
                data:result.payload,
            };            
        }
        catch(error){
            console.log("Failed to fetch drug:",error);
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
            console.log("insert drug:",result);
            return {
                success: true,
            };            
        }
        catch(error){
            console.log("Failed to insert drug:",error);
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
            console.log("search drug:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            console.log("Failed to fetch drug:",error);
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
                url: `${apiPath.drug.drug}/${id}`,
                body:data
            });
            console.log("update drug:",result);
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
            console.log("Failed to update drug:",error);
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
            console.log("delete drug:",result);
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
            console.log("Failed to delete drug:",error);
            return {
                success: false,
                message:error,
            };
        }
    }
}

export default new DrugService();