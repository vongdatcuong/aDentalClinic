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
    async addPatientPayment(body){
        body = body || {};
        const result = await httpPost({
            url: apiPath.transaction.transaction,
            body: body
        });
        return result;
    }
    async updatePatientPayment(transactionID, body){
        body = body || {};
        const result = await httpPatch({
            url: apiPath.transaction.transaction + "/" + transactionID,
            body: body
        });
        return result;
    }
}

export default new TransactionService();