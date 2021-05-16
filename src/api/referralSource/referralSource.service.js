import { httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class ReferralSourceService{
    async getReferralSource(){
        const res = await httpGet({
            url: apiPath.referralSource.referralSource,
        });

        try{
            const result = await httpGet({
                url: apiPath.referralSource.referralSource,
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
                url: apiPath.referralSource.referralSource,
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

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.referralSource.referralSource}/${id}`,
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
                url: `${apiPath.referralSource.referralSource}/${id}`,
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
                url: `${apiPath.referralSource.referralSource}/${id}`,
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

export default new ReferralSourceService();