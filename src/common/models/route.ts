// import mongoose from 'mongoose';
//
// export const routeSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     origin: {
//         type: String,
//         required: true
//     },
//     destination: {
//         type: String,
//         required: true
//     },
//     distance: {
//         type: Number
//     },
//     duration: {
//         type: Number
//     },
//     likes: {
//         type: Number,
//         default: 0 },
//     comments: [
//         { user:
//             mongoose.Schema.Types.ObjectId,
//             text: String,
//             date: Date
//         }
//         ],
//     date: {
//         type: Date,
//         default: Date.now
//     },
// });
//
// export const Route = mongoose.model('Route', routeSchema);
