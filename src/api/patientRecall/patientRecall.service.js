import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpPut} from '../base-api';
import apiPath from '../path';


class PatientRecallService{
    async getPatientRecall(){
        try{
                    
            const result = await httpGet({
                url: apiPath.patientRecall.recall,
                query:{
                    get_patient:true,
                    get_treatment:true,
                    get_appointment:true,
                    get_procedure:true
                }
            });
            //console.log("Get patient recall:",result.payload[0]);
            if(result.success)
            {
                return {
                    success:true,
                    data:result.payload,
                }
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
            //console.log("Failed to fetch recall:",error);
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
                url: apiPath.patientRecall.recall,
                body:data
            });
            //console.log("insert recall:",result);
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
            //console.log("Failed to insert recall:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.patientRecall.recall}/${id}`,
            });
            //console.log("search recall:",result);
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
            //console.log("Failed to fetch recall:",error);
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
                url: `${apiPath.patientRecall.recall}/${id}`,
                body:data
            });
            //console.log("update recall:",result);
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
            //console.log("Failed to update recall:",error);
            return {
                success: false,
                data:null
            };
        }
    }
    async getPatientRecallByID(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.patientRecall.recall}${apiPath.patient.patient}/${id}`,
            });
            //console.log("search recall of patient:",result);
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
                    data:null
                }
            }             
        }
        catch(error){
            //console.log("Failed to fetch recall:",error);
            return {
                success: false,
                data:null,
            };
        }
    }
}

export default new PatientRecallService();