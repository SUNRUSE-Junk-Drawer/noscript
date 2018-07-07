import imageminPngcrush from "imagemin-pngcrush"

export default imageminPngcrush({ reduce: true })

// export default buffer => {
//   const dummyPromise = {
//     then(callback) {
//       callback(buffer)
//       return dummyPromise
//     },
//     catch() {
//       return dummyPromise
//     }
//   }
//   return dummyPromise
// }
