import mongoose,{Schema,models} from "mongoose";

const questionnaireModel = new Schema(
    {
        Q1: {
            type: String,
            required: true,
        },
        Q2: {
            type: String,
            required: true,
        },
        Q3: {
            type: String,
            required: true,
        },
        Q4: {
            type: String,
            required: true,
        },
        Q5: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
);

export const Questionnaire = models.questionnaire || mongoose.model("questionnaire", questionnaireModel);