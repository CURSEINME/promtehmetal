import { S3Client } from '@aws-sdk/client-s3'

const REGION = process.env.REGION
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY
const ENDPOINT = process.env.ENDPOINT

if (!REGION) {
	throw new Error('REGION environment variable is not set.')
}

if (!ACCESS_KEY) {
	throw new Error('ACCESS_KEY environment variable is not set.')
}

if (!SECRET_ACCESS_KEY) {
	throw new Error('SECRET_ACCESS_KEY environment variable is not set.')
}

if (!ENDPOINT) {
	throw new Error('ENDPOINT environment variable is not set.')
}

export const aws = new S3Client({
	credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY },
	region: REGION,
	endpoint: ENDPOINT
})
