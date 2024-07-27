const shopSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  mobileNo: { type: Number },
  landmark: { type: String },
  city: { type: String },
  state: { type: String }
});