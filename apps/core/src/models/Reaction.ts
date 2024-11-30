import {
  type InferSchemaType,
  Schema,
  isObjectIdOrHexString,
  model,
} from 'mongoose';
import { UserModel } from './User.js';
import { CommentModel } from './Comment.js';
import { EnrollmentModel } from './Enrollment.js';

const REACTIONS_KIND = ['like', 'recommendation', 'star'] as const;
const reactionSchema = new Schema(
  {
    kind: {
      type: String,
      required: true,
      enum: REACTIONS_KIND,
    },

    comment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'comments',
    },

    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },

    active: {
      type: Boolean,
      default: true,
    },

    slug: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true },
);

async function validateRules(reaction: ReactionDocument) {
  if (reaction.kind === 'recommendation') {
    const user = isObjectIdOrHexString(reaction.user)
      ? await UserModel.findById(reaction.user)
      : reaction.user;

    const comment = isObjectIdOrHexString(reaction.comment)
      ? await CommentModel.findById(reaction.comment)
      : reaction.comment;

    const isValid = await EnrollmentModel.findOne({
      // @ts-expect-error
      ra: user?.ra,
      // @ts-expect-error
      $or: [{ teoria: comment?.teacher }, { pratica: comment?.teacher }],
    });

    if (!isValid)
      throw new Error(
        'Você não pode recomendar este comentário, pois não fez nenhuma matéria com este professor',
      );
  }
}

async function computeReactions(reaction: ReactionDocument) {
  const commentId = reaction.comment._id || reaction.comment;
  const ReactionModel = reaction.constructor as any;

  const reactionCount = await ReactionModel.countDocuments({
    comment: commentId,
    kind: reaction.kind,
  });

  const updateReactionKind = {
    [`reactionsCount.${reaction.kind}`]: reactionCount,
  };
  await CommentModel.findOneAndUpdate(
    { _id: commentId },
    {
      $set: updateReactionKind,
    },
  );
}

reactionSchema.pre('save', async function () {
  const slug = `${this.kind}:${this.comment._id}:${this.user._id}`;
  if (this.isNew) {
    const equalReaction = await this.collection.findOne({ slug });
    if (equalReaction) {
      throw new Error(
        'Você não pode reagir duas vezes iguais ao mesmo comentário',
      );
    }
    this.slug = slug;
  }

  await validateRules(this);
});

reactionSchema.post('save', { query: false }, async function () {
  await computeReactions(this);
});

reactionSchema.post<ReactionDocument>(
  // @ts-ignore
  'deleteOne',
  { query: false },
  async function () {
    await computeReactions(this);
  },
);

reactionSchema.index({ comment: 'asc', kind: 'asc' });

export type Reaction = InferSchemaType<typeof reactionSchema>;
export type ReactionDocument = ReturnType<(typeof ReactionModel)['hydrate']>;
export const ReactionModel = model('reactions', reactionSchema);
