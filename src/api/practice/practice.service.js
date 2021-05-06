import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class PracticeService{
    async getPractice(){
        try{
                    
            const result = await httpGet({
                url: apiPath.practice.practice,
            });
            //console.log("Get practice:",result.payload[0]);
            if(result.success)
            {
                return {
                    success: true,
                    data:result.payload,
                };   
            }
            else
            {
                return {
                    success:false,
                    data:null,
                }
            }
                     
        }
        catch(error){
            //console.log("Failed to fetch practice:",error);
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
                url: apiPath.practice.practice,
                body:data
            });
            //console.log("insert procedure:",result);
            if(result.success)
            {
                return {
                    success:true,
                }
            }
            else
            {
                return {
                    success: false,
                }; 
            }             
        }
        catch(error){
            //console.log("Failed to insert procedure:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.practice.practice}/${id}`,
            });
            //console.log("search practice:",result);
            if(result.success)
            {
                return {
                    success: true,
                    data:result,
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
            //console.log("Failed to fetch practice:",error);
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
                url: `${apiPath.practice.practice}/${id}`,
                body:data
            });
            //console.log("update practice:",result);
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
            //console.log("Failed to update practice:",error);
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
                url: `${apiPath.practice.practice}/${id}`,
            });
            //console.log("delete practice:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            //console.log("Failed to fetch practice:",error);
            return {
                success: false,
                data:null,
            };
        }
    }
}

export default new PracticeService();