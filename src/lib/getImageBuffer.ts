export async function getImageBuffer(file: File) {
	try {
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		return buffer
	} catch(err) {
		console.log(err)
	}

}
