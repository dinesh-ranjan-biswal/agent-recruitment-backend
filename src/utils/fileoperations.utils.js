import { supabase } from "../config/supabaseclient.config.js";
import ApiError from "./apierror.utils.js";
import { Constants } from "./constant.utils.js";
import logger from "./logger.utils.js";

export const uploadAttachment=async(file)=>{
    try {
        const filePath = `attachments/${Date.now()}_${file.originalname}`;
        const {data,error}=await supabase.storage.from('attachments').upload(filePath, file.buffer,{
            contentType:file.mimetype
        });
        if(error) throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,error.message);
        const [,fileName]=filePath.split('/');
        return {
            fileName: fileName,
            size: file.size,
            type: file.mimetype,
          };
    } catch (error) {
        logger.error(`error ${error.message}`);
        throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,'Failed to upload attachment');
    }
}

export const downloadAttachment=async(fileName)=>{
    try {
        const filePath=`attachments/${fileName}`;
        const {data:fileStream,error}=await supabase.storage.from('attachments').download(filePath);
        if(error || !fileStream){
            console.log(error);
            return null;
        } 

        //convert fileStream to base64
        const buffer =await fileStream.arrayBuffer();
        const fileContent=Buffer.from(buffer).toString('base64');
        return fileContent;
    } catch (error) {
        logger.error(`error ${error.message}`);
        return null;
    }
}

export const deleteAttachment=async(fileName)=>{
    try {
        const filePath=`attachments/${fileName}`;
        const {data,error}=await supabase.storage.from('attachments').remove([filePath]);
        if(error){
            console.log(error);
            return false;
        }
        return true
    } catch (error) {
        logger.error(`error ${error.message}`);
        throw new ApiError(Constants.HTTPINTERNALSERVERERROR,Constants.FAILED_STATUS,"Failed to delete attachment");
    }
}