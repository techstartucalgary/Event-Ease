import { Model, Schema } from "mongoose";
import { ParticipantsSchemaType } from "@/lib/types/participants";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";
import { Participants } from ".";

const ParticipantsSchema = new Schema<ParticipantsSchemaType>({
  event : {
    type: String,
    required : true
  },

  name : {
    type: String,
    required : true
  },

  checkInTime : {
    type: String,
    required : true
  },
}, { collection: "Participants", timestamps: true, versionKey: false})


