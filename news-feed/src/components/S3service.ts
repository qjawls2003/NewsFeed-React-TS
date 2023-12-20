// S3Service.ts
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

interface S3Config {
  bucketName: string;
  key: string;
}


export async function fetchJsonFromS3({ bucketName, key }: S3Config): Promise<any> {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    const jsonContent = JSON.parse(data.Body?.toString() || '');
    return jsonContent;
  } catch (error) {
    console.error('Error fetching JSON from S3:', error);
    throw error;
  }
}
