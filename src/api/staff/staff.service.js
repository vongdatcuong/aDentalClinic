import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpPut} from '../base-api';
import apiPath from '../path';


class StaffService{
    async getStaff(){
        try{
                    
            const result = await httpGet({
                url: apiPath.staff.staff,
            });
            //console.log("Get staff:",result.payload[0]);
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
            //console.log("Failed to fetch staff:",error);
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
            //console.log("insert staff:",result);
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
            //console.log("Failed to fetch staff:",error);
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
            //console.log("search staff:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            //console.log("Failed to fetch staff:",error);
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
                url: `${apiPath.staff.staff}/${id}`,
                body:data
            });
            //console.log("update staff:",result);
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
            //console.log("Failed to update staff:",error);
            return {
                success: false,
                data:null
            };
        }
    }
}

export default new StaffService();