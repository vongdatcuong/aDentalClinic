import {
    secretKey,
    initializeAPIService,
    httpPost,
    httpGet,
    httpPatch,
    httpPut,
    httpDelete,
  } from "../base-api";
  import apiPath from "../path";
  import strings from "../../configs/strings";
  
  class Tooth {
    async getSinglePatientTooth(patientID, toothNumber) {
      try {
        const result = await httpGet({
          url: `${apiPath.tooth.tooth+apiPath.tooth.patient}/${patientID}/${toothNumber}`,
        });
        return {
          success: true,
          data: result.payload,
        };
      } catch (error) {
        console.log("Failed to fetch patient tooth data:", error);
        return {
          success: false,
          data: null,
        };
      }
    }
  
    // async insert(data) {
    //   try {
    //     const result = await httpPost({
    //       url: apiPath.progressNote.progressNote,
    //       body: data,
    //     });
    //     return {
    //       success: true,
    //     };
    //   } catch (error) {
    //     console.log("Failed to insert note: ", error);
    //     return {
    //       success: false,
    //     };
    //   }
    // }
    async update(patientID, toothNumber, data) {
      try {
        const result = await httpPatch({
            url: `${apiPath.tooth.tooth+apiPath.tooth.patient}/${patientID}/${toothNumber}`,
          body: data,
        });
        return {
          success: true,
        };
      } catch (error) {
        console.log("Failed to update tooth: ", error);
        return {
          success: false,
        };
      }
    }
    // async delete(id,data) {
    //   try {
    //     const result = await httpDelete({
    //       url: `${apiPath.progressNote.progressNote}/${id}`
    //     });
    //     return {
    //       success: true,
    //     };
    //   } catch (error) {
    //     console.log("Failed to delete note: ", error);
    //     return {
    //       success: false,
    //     };
    //   }
    // }
  }
  
  export default new Tooth();
  