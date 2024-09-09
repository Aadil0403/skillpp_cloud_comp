const{
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    GetObjectCommand,
  } = require ("@aws-sdk/client-s3");
const { getSignedUrl }= require ("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region: "ap-south-1", 
    credentials:{
        accessKeyId: "AKIAQXPZDL4EQKKQHF47",
        secretAccessKey: "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",
    }
});

async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket: "devtest-pvt",
        Key: key,
    });
    const url = await getSignedUrl(s3Client,command);
    return url; 
}

async function putObject(filename, contentType) {
    const command= new PutObjectCommand({
        Bucket: "devtest-pvt",
        Key:`uploads/${filename}`,
        ContentType : contentType,
    });
    const url = await getSignedUrl(s3Client,command);
    return url;
}
async function init(){   
    console.log(await getObjectURL("FlowChart.jpg"))//Retrieving
    const url= (await putObject(`image1.jpg`, " image/png"))//Uploading
    console.log(url);
    console.log(url ? await getObjectURL("uploads/image1.jpg") : null); // Retrieving after Uploading
} 
init();