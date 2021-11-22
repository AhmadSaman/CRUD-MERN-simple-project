module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        description: String,
        workStatus: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Developer = mongoose.model("developer", schema);
    return Developer;
  };
