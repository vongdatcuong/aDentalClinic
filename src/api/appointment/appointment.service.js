import {secretKey, initializeAPIService, httpPost,httpGet,httpPatch,httpPut} from '../base-api';
import apiPath from '../path';
import strings from '../../configs/strings';

class AppointmentService{
    async getAppointment(){
        try{
                    
            const result = await httpGet({
                url: apiPath.appointment.appointment,
            });
            console.log("Get appointment:",result);
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
            console.log("Failed to fetch appointment:",error);
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
                url: apiPath.appointment.appointment,
                body:data
            });
            console.log("insert appointment:",result);
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
            console.log("Failed to insert appointment:",error);
            return {
                success: false,
            };
        }
    }

    async search(id)
    {
        try{
                    
            const result = await httpGet({
                url: `${apiPath.appointment.appointment}/${id}`,
            });
            console.log("search appointment:",result);
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
            console.log("Failed to fetch appointment:",error);
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
                url: `${apiPath.appointment.appointment}/${id}`,
                body:data
            });
            console.log("update appointment:",result);
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
            console.log("Failed to update appointment:",error);
            return {
                success: false,
                data:null
            };
        }
    }
}

export default new AppointmentService();