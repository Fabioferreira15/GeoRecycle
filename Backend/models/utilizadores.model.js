module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      tipo: { type: String, default: "user" },
      nome: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      foto: { type: String, default: "" },
      password: { type: String, required: true },
      pontos: { type: Number, default: 0 },
      nivel: { type: Number, default: 0 },
      moedas: { type: Number, default: 0 },
      numUsoEcopontos: { type: Number, default: 0 },
      ecopontosRegistados: { type: Number, default: 0 },
      biografia: {type: String,default: ""},
      badges: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Badge",
        },  
      ],
      referral:{type: String, default: ""},
      referredBy: {type: String, default: ""}
    },
    { timestamps: false }
  );
  const User = mongoose.model("User", schema);
  return User;
};


