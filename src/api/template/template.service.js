import { httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class TemplateService{
    async getTemplate(){
        try{
                    
            const result = await httpGet({
                url: apiPath.noteMacro.noteMacro,
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
    async getProgressNoteTemplate(){
        try{   
            const result = await httpGet({
                url: apiPath.noteMacro.noteMacro + apiPath.noteMacro.progress_note,
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
    async getTreatmentNoteTemplate(){
        try{   
            const result = await httpGet({
                url: apiPath.noteMacro.noteMacro + apiPath.noteMacro.treatment,
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
                url: `${apiPath.noteMacro.noteMacro}/${id}`,
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
                url: `${apiPath.noteMacro.noteMacro}/${id}`,
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
                url: `${apiPath.noteMacro.noteMacro}/${id}`,
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

export default new TemplateService();