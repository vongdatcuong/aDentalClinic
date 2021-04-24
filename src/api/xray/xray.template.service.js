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

class MouthTemplateService {
  async gets() {
    try {
      const url = apiPath.image.mouth_template;
      const result = await httpGet({
        url: url,
      });
      return result;
    } catch (error) {
      console.log("Failed to fetch mouth template:", error);
      return {
        success: false,
        data: null,
      };
    }
  }
  async getsMouthById(mouth_id) {
    try {
      const url = apiPath.image.mouth_template + "/" + mouth_id;
      let query = { get_frames: true };
      const result = await httpGet({
        url: url,
        query: query,
      });
      return await result;
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}

export default new MouthTemplateService();
