import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';
import strings from '../../configs/strings';

class TemplateService{
    async getTemplate(){
        try{
                    
            const result = await httpGet({
                url: apiPath.noteMacro.noteMacro,
            });
            console.log("Get note Macro:",result.payload[0]);
            return {
                success: true,
                data:result.payload,
            };            
        }
        catch(error){
            console.log("Failed to fetch note Macro:",error);
            return {
                success: false,
                data: null
            };
        }
    }
    async getMedicalAlertTemplate(){
        try{   
            const result = await httpGet({
                url: apiPath.noteMacro.noteMacro + apiPath.noteMacro.medical_alert,
            });
            return result;            
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
                url: apiPath.noteMacro.noteMacro,
                body:data
            });
            console.log("insert note Macro:",result);
            return {
                success: true,
            };            
        }
        catch(error){
            console.log("Failed to fetch note Macro:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.noteMacro.noteMacro}/${id}`,
            });
            console.log("search note Macro:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            console.log("Failed to fetch note Macro:",error);
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
                url: `${apiPath.noteMacro.noteMacro}/${id}`,
                body:data
            });
            console.log("update note Macro:",result);
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
            console.log("Failed to update note Macro:",error);
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
                url: `${apiPath.noteMacro.noteMacro}/${id}`,
            });
            console.log("delete note Macro:",result);
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
            console.log("Failed to delete note Macro:",error);
            return {
                success: false,
                data:null
            };
        }
    }
}

export default new TemplateService();