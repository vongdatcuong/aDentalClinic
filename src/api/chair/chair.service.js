import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpPut} from '../base-api';
import apiPath from '../path';
import strings from '../../configs/strings';

class ChairService{
    async getChair(){
        try{
                    
            const result = await httpGet({
                url: apiPath.appointment.appointment+apiPath.appointment.chair,
            });
            console.log("Get chair:",result.payload[0]);
            return {
                success: true,
                data:result.payload,
            };            
        }
        catch(error){
            console.log("Failed to fetch chair:",error);
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
                url: apiPath.appointment.appointment+apiPath.appointment.chair,
                body:data
            });
            console.log("insert chair:",result);
            return {
                success: true,
            };            
        }
        catch(error){
            console.log("Failed to insert chair:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.appointment.appointment}${apiPath.appointment.chair}/${id}`,
            });
            console.log("search chair:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            console.log("Failed to fetch chair:",error);
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
                url: `${apiPath.appointment.appointment}${apiPath.appointment.chair}/${id}`,
                body:data
            });
            console.log("update chair:",result);
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
            console.log("Failed to update chair:",error);
            return {
                success: false,
                data:null
            };
        }
    }
}

export default new ChairService();