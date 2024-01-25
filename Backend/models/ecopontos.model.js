module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            morada: { type: String, required: true },
            coordenadas: {
                lat: { type: Number, required: true},
                lon: { type: Number,  required: true}
              }, 
            utilizacoes: { type: Number, default: 0 },
            vezesRegistado: { type: Number, default: 0 },
            dataCriacao: { type: Date },
            foto: { type: String, required: false },
            vistoAdmin: { type: Boolean, default: false },
            ecopontoAprovado: { type: Boolean, default: false }
        },
        { timestamps: false }
    );
    const Ecoponto = mongoose.model("Ecoponto", schema);
    return Ecoponto;
};


