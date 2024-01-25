module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        idEcoponto: { type: mongoose.Schema.Types.ObjectId, ref: 'Ecoponto', required: true },
        foto: { type: String, required: true },
        data: { type: Date, required: true },
        vistoAdmin: { type: Boolean, default: false },
        utilizacaoAprovada: { type: Boolean, default: false }
      },
      { timestamps: false }
    );
    const Utilizacao = mongoose.model("Utilizacao", schema);
    return Utilizacao;
  };