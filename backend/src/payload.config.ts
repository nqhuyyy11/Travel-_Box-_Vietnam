import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

import { Users } from "./collections/Users";
import { Provinces } from "./collections/Provinces";
import { Boxes } from "./collections/Boxes";
import { ActivationCodes } from "./collections/ActivationCodes";
import { Quests } from "./collections/Quests";
import { AudioStories } from "./collections/AudioStories";
import { Orders } from "./collections/Orders";
import { Badges } from "./collections/Badges";
import { Vouchers } from "./collections/Vouchers";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001",
  admin: {
    user: Users.slug,
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Provinces,
    Boxes,
    ActivationCodes,
    Quests,
    AudioStories,
    Orders,
    Badges,
    Vouchers,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/travelbox-vietnam",
  }),
  cors: [process.env.CORS_ORIGINS || "http://localhost:3000"],
  csrf: [process.env.CORS_ORIGINS || "http://localhost:3000"],
});
