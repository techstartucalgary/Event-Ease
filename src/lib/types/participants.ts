import { BaseEntity, BaseModel } from "."

export type newParticipant = {
  event : string;
  name : string;
  checkInTime: string;
}

export type ParticipantsSchemaType = BaseModel & newParticipant;