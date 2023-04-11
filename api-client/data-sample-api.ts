import { I_DataSample } from '@/models';
import { I_filterData } from './../models/filterDataInput';
import axiosClient from './axiosClient';
export const dataSampleApi = {
    async getListData(payload?:I_filterData){
        let url:string = "/data-sample/data"
        if(payload){
            url = `/data-sample/data?search=${payload.search}&sort=${payload.sort}`
        }
        try {
            const response = await axiosClient.get(url);
            const data: I_DataSample[] = response.data;
            return data;
          } catch (error) {
            console.error(error);
            return null;
          }
    }
}