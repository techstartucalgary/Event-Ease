import { parseToJSON, prefixWithCloudUrl, processError, getSearchRegex, logError } from "@/lib/helpers";
import { BulkUserDataToUpdate, IdAndOptionalPicture, NewUser, UserSchemaType } from "@/lib/types/user";
import { User } from "@/lib/server/models";
import { validatedNewUserData, validateUserUpdates } from "@/lib/server/models/user";
import { SortOrder, UpdateQuery } from "mongoose";