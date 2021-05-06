import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpDelete} from '../base-api';
import apiPath from '../path';


class PrescriptionService{
    async getPrescription(){
        try{
                    
            const result = await httpGet({
                url: apiPath.prescription.prescription,
            });
            //console.log("Get prescription:",result.payload);
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
            //console.log("Failed to fetch prescription:",error);
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
                url: apiPath.prescription.prescription,
                body:data
            });
            //console.log("insert prescription:",result);
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
                    success: false,
                    data:null
                }; 
            }                      
        }
        catch(error){
            //console.log("Failed to insert prescription:",error);
            return {
                success: false,
            };
        }
    }
    // async insertDetail(id,data)
    // {
    //     try{
                    
    //         const result = await httpPost({
    //             url: `${apiPath.prescription.prescription}/${id}${apiPath.prescription.detail}`,
    //             body:data
    //         });
    //         //console.log("insert detail prescription:",result);
    //         return {
    //             success: true,
    //         };            
    //     }
    //     catch(error){
    //         //console.log("Failed to insert prescription:",error);
    //         return {
    //             success: false,
    //         };
    //     }
    // }
    async detail(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.prescription.prescription}/${id}`,
                query:{
                    get_details:true,
                    get_provider:true
                }
            });
            //console.log("detail prescription:",result);
           
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            //console.log("Failed to fetch prescription:",error);
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
                url: `${apiPath.prescription.prescription}/${id}`,
            });
            //console.log("search prescription:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            //console.log("Failed to fetch prescription:",error);
            return {
                success: false,
                data:null,
            };
        }
    }
    async searchByPatient(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.prescription.prescription}${apiPath.prescription.patient}/${id}`,
                query:{
                    // get_provider:true,
                    get_details:true,
                }
            });
            //console.log("search prescription:",result);
            return {
                success: true,
                data:result,
            };            
        }
        catch(error){
            //console.log("Failed to fetch prescription:",error);
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
                url: `${apiPath.prescription.prescription}/${id}`,
                body:data
            });
            //console.log("update prescription:",result);
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
            //console.log("Failed to update prescription:",error);
            return {
                success: false,
                data:null
            };
        }
    }
    async updateDetail(id,data)
    {
        //console.log("Data for update:",data);
        try{
            
            const result = await httpPatch({
                url: `${apiPath.prescription.prescription}${apiPath.prescription.detail}/${id}`,
                body:data
            });
            //console.log("update prescription detail:",result);
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
            //console.log("Failed to update prescription detail:",error);
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
                url: `${apiPath.prescription.prescription}/${id}`,
            });
            //console.log("delete prescription:",result);
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
            //console.log("Failed to delete prescription:",error);
            return {
                success: false,
                message:error,
            };
        }
    }
}

export default new PrescriptionService();