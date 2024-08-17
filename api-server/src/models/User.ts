import { model, Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface IUserDoc extends IUser, Schema {
  mathPassword: (pass: string) => Promise<boolean>
}

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.mathPassword = async function (enteredPassword: string) {
  return Bun.password.verifySync(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // use bcrypt
  this.password = await Bun.password.hash(this.password, {
    algorithm: "bcrypt",
    cost: 4, // number between 4-31
  });
});

const User = model("users", userSchema);
export default User;
