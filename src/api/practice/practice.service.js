import { httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class PracticeService{
    async getPractice(){
        try{
                    
            const result = await httpGet({
                url: apiPath.practice.practice,
            });
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
                url: `${apiPath.practice.practice}/${id}`,
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
                url: `${apiPath.practice.practice}/${id}`,
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
}

export default new PracticeService();