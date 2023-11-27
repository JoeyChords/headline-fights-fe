/* For use in the survey about each headline */

export class SurveyCriteria {
    attribute: string;
    biasType: string;
    question: string;
    questionFoil: string;
    noneOfTheAbove: string;

    constructor(attribute: string, biasType: string, question: string, questionFoil: string, noneOfTheAbove: string){
        this.attribute = attribute;
        this.biasType = biasType;
        this.question = question;
        this.questionFoil = questionFoil;
        this.noneOfTheAbove = noneOfTheAbove;
    }
}

export const surveyCriteria = [ 
    new SurveyCriteria("sensationalist","Sensationalism", "The headline makes rare events seem as though they happen all the time.","The headline is about things that are relevant in everyday life.", "Neither."), 
    new SurveyCriteria("undue_weight","Undue Weight","The headline gives more importance to the topic than it should.", "The headline contains important news.", "I'm not sure."),
    new SurveyCriteria("speculative", "Speculation", "The headline is speculating about things that may have happened or might happen in the future as though they are known.", "The headline is about events that have definitely happened or will definitely happen.", "Neither."),
    new SurveyCriteria("biased_tone","Tone", "The headline's tone seems slanted towards or against particular actors or issues.","The headline seems unopinionated.", "Neither."),
    new SurveyCriteria("no_nuance","Concision", "The headline presents a simple subject with a simple viewpoint.", "The headline presents a complex subject without a simple viewpoint.", "Neither."),
    new SurveyCriteria("portrays_negatively","Coverage","The headline is a negative portrayal of a political party or ideology.", "The headline is a positive portrayal of a political party or ideology.", "Neither."),
    new SurveyCriteria("distorts","Distortion","The headline distorts or manipulates facts to represent an opinion.", "The headline only presents facts.", "I'm not sure."),
    new SurveyCriteria("partisan", "Partisan", "The headline supports either the conservative or liberal side of an issue.", "The headline does not support political views of an issue.", "Neither.")
]