import { httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class ReferralSourceService{
    async getReferralSource(){
        const res = await httpGet({
            url: apiPath.referralSource.referralSource,
        });
        //console.log("Get referral Source:",res);

        try{
            const result = await httpGet({
                url: apiPath.referralSource.referralSource,
            });
            //console.log("Get referral Source:",result);
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
            //console.log("Failed to fetch referral Source:",error);
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
            //console.log("insert referral Source:",result);
            if(result.success)
            {
                return {
                    success: true,
                };
            }
            else
            {
                return {
                    success:false,
                }
            }
                        
        }
        catch(error){
            //console.log("Failed to fetch referral Source:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.referralSource.referralSource}/${id}`,
            });
            //console.log("search referral Source:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            //console.log("Failed to fetch referral Source:",error);
            return {
                success: false,
                data:null,
            };
        }
    }
    async update(id,data)
    {
        //console.log("Data for update:",data);
        try{
            
            const result = await httpPatch({
                url: `${apiPath.referralSource.referralSource}/${id}`,
                body:data
            });
            //console.log("update referral Source:",result);
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
            //console.log("Failed to update referral Source:",error);
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
            //console.log("delete referral source:",result);
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
            //console.log("Failed to delete referralSource:",error);
            return {
                success: false,
                message:error,
            };
        }
    }
}

export default new ReferralSourceService();