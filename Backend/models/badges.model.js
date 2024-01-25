module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        nome: { type: String, required: true },
        foto: { type: String, required: true },
      },
      { timestamps: false }
    );
    const Badges = mongoose.model("Badge", schema);
    return Badges;
  };
  