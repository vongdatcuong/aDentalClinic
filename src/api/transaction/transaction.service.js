import {httpPost,httpGet,httpPatch} from '../base-api';
import apiPath from '../path';


class TransactionService {
    async getPatientTransaction(patientID, query)
    {
        query = query || {};
        const result = await httpGet({
            url: apiPath.transaction.transaction + apiPath.transaction.patient + '/' + patientID,
            query: query
        });
        return result;
    }
    async getPatientPaymentInfo(patientID, query)
    {
        query = query || {};
        const result = await httpGet({
            url: apiPath.transaction.transaction + apiPath.transaction.new + '/' + patientID,
            query: query
        });
        return result;
    }
}

export default new TransactionService();