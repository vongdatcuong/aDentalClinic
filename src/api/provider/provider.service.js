import { httpPost,httpGet,httpPatch} from '../base-api';
import apiPath from '../path';


class ProviderService{
    async getProvider(){
        try{
                    
            const result = await httpGet({
                url: apiPath.staff.staff+apiPath.staff.provider,
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
                url: apiPath.staff.staff,
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
                url: `${apiPath.staff.staff}/${id}`,
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
                url: `${apiPath.staff.staff}/${id}`,
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

export default new ProviderService();