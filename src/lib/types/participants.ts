import { BaseModel } from "."

export type newParticipant = {
  event : string;
  name : string;
}

export type ParticipantsSchemaType = BaseModel & newParticipant;