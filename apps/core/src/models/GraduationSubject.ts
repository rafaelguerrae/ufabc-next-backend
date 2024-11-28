import { type InferSchemaType, Schema, model } from 'mongoose';

const graduationSubjectSchema = new Schema(
  {
    /** One of: mandatory, limited, free */
    category: String,
    /** How much confidence we have this is the right category */
    confidence: String,
    /** One of: firstLevelMandatory, secondLevelMandatory, thirdLevelMandatory */
    subcategory: String,

    creditos: Number,
    codigo: String,

    year: Number,
    quad: Number,

    /** Array of codes for equivalents */
    equivalents: [String],

    subject: {
      type: Schema.Types.ObjectId,
      ref: 'subjects',
    },

    graduation: {
      type: Schema.Types.ObjectId,
      ref: 'graduations',
    },
  },
  { timestamps: true },
);

graduationSubjectSchema.index({ graduation: 'asc' });

export type GraduationSubject = InferSchemaType<typeof graduationSubjectSchema>;
export const GraduationSubjectModel = model(
  'subjectgraduations',
  graduationSubjectSchema,
);
