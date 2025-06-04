import Account from "@/database/account.model";
import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: Request) {
  const connection = await dbConnect();

  const { provider, providerAccountId, user } = await request.json();

  //const session = await mongoose.startSession();
  const session = await connection.startSession();
  session.startTransaction();

  try {
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validatedData.success) {
      console.log("Error de validacion");
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, username, email, image } = user;
    const sligifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await User.findOne({ email }).session(session);
    console.log("existingUser => ", existingUser);
    if (!existingUser) {
      [existingUser] = await User.create(
        [{ name, username: sligifiedUsername, email, image }],
        { session }
      );
    } else {
      const updatedData: { name?: string; image?: string } = {};
      if (existingUser.name !== name) {
        updatedData.name = name;
      }
      if (existingUser.image !== image) {
        updatedData.image = image;
      }

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updatedData }
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    console.log("existingAccount => ", existingAccount);

    if (!existingAccount) {
      const account = await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    await session.abortTransaction();
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    await session.endSession();
  }
}
