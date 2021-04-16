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

class ImageService {
  async getImageOfPatient(patient_id) {
    try {
      const url =
        apiPath.image.image + apiPath.image.patient + "/" + patient_id;
      const result = await httpGet({
        url: url,
      });
      return result;
    } catch (error) {
      console.log("Failed to fetch image:", error);
      return {
        success: false,
        data: null,
      };
    }
  }

  async insert(data) {
    try {
      const result = await httpPost({
        url: apiPath.image.image,
        body: data,
      });
      return result;
    } catch (error) {
      console.log("Failed to fetch image:", error);
      return {
        success: false,
      };
    }
  }

  async update(id, name) {
    try {
      const result = await httpPatch({
        url: `${apiPath.image.image}/${id}`,
        body: {
          image_name: name,
        },
      });
      return result;
    } catch (error) {
      console.log("Failed to update image:", error);
      return {
        success: false,
        data: null,
      };
    }
  }

  async delete(id) {
    try {
      const result = await httpDelete({
        url: `${apiPath.image.image}/${id}`,
      });
      return result;
    } catch (error) {
      console.log("Failed to Delete image:", error);
      return {
        success: false
      };
    }
  }
}

export default new ImageService();
