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
}

export default new MouthTemplateService();
