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

class MouthService {
  async getsByPatientAndTemplate(patient_id, template_id) {
    try {
      const url =
        apiPath.image.mouth + apiPath.image.patient + "/" + patient_id;
      let query = undefined;
      if (template_id) {
        query = { template: template_id };
      }
      const result = await httpGet({
        url: url,
        query: query,
      });
      return result;
    } catch (error) {
      console.log("Failed to fetch mouth of patient:", error);
      return {
        success: false,
        data: null,
      };
    }
  }
  async getsMouthById(mouth_id) {
    try {
      const url = apiPath.image.mouth + "/" + mouth_id;
      let query = { get_frames: true };
      const result = await httpGet({
        url: url,
        query: query,
      });
      return await result;
    } catch (error) {
      console.log("Failed to fetch mouth", error);
      return {
        success: false,
        data: null,
      };
    }
  }
  async insert(data) {
    try {
      const result = await httpPost({
        url: apiPath.image.mouth,
        body: data,
      });
      return result;
    } catch (error) {
      console.log("Failed to insert mouth:", error);
      return {
        success: false,
      };
    }
  }
  async update(id, data) {
    try {
      const result = await httpPatch({
        url: `${apiPath.image.mouth}/${id}`,
        body: data,
      });
      if (result.success) {
        return result;
      } else {
        return {
          success: false,
          data: null,
          message: result.message,
        };
      }
    } catch (error) {
      console.log("Failed to update mouth:", error);
      return {
        success: false,
        data: null,
      };
    }
  }
}

export default new MouthService();
