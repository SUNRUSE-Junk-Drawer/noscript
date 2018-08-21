import archiver from "archiver"
import bl from "bl"

export default {
  archiver(buffersByFilename, onSuccess, onError) {
    const archive = archiver(`zip`)
    for (const filename in buffersByFilename) {
      archive.append(buffersByFilename[filename], { name: filename })
    }
    archive.pipe(bl((error, data) => {
      if (error) {
        onError(error)
      } else {
        onSuccess(data)
      }
    }))
    archive.finalize()
  }
}
