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
    new SurveyCriteria("sensationalism","Sensationalism", "The headline makes rare events seem as though they happen all the time.","The headline is about things that are relevant in everyday life.", "Neither."), 
    new SurveyCriteria("undue_weight_bias","Undue Weight","The headline gives more importance to the topic than it should.", "The headline contains important news.", "I'm not sure."),
    new SurveyCriteria("speculative_content", "Speculation", "The headline is speculating about things that may have happened, might currently be happening, or might happen in the future.", "The headline is about events that have definitely happened, are happening, or will definitely happen.", "Neither."),
    new SurveyCriteria("tonality_bias","Tone", "The headline's tone seems slanted towards or against particular actors or issues.","The headline's tone does not seem to be slanted.", "Neither."),
    new SurveyCriteria("concision_bias","Concision", "The headline presents a simple subject from a simple viewpoint.", "The headline presents a simple subject but doesn't have a point of view.", "Neither."),
    new SurveyCriteria("coverage_bias","Coverage","The headline includes a negative portrayal of a political party or ideology.", "The headline includes a positive portrayal of a political party or ideology.", "Neither."),
    new SurveyCriteria("distortion_bias","Distortion","The headline distorts or manipulates facts to represent an opinion.", "The headline only presents facts.", "I'm not sure."),
    new SurveyCriteria("partisan_bias", "Partisan", "The headline supports either the conservative or liberal side of an issue.", "The headline does not support political views of an issue.", "Neither."),
    new SurveyCriteria("favors_or_attacks", "Favoring or Attacking", "The headline favors or attacks a particular race, religion, gender, age, sexual orientation, ethnic group, or person.", "The headline concerns a particular race, religion, gender, age, sexual orientation, ethnic group, or person but does not play favorites.", "Neither."),
    new SurveyCriteria("content_bias", "Content", "The headline concerns a conflict and presents one side of it, political or otherwise.", "The headline presents both sides of a conflict.", "Neither."),
    new SurveyCriteria("structural_bias", "Structural", 'The headline uses extreme words such as "slammed" or "radical", or the subject seems like it has been chosen only because it is likely to sell something, be shared, or get clicks.', "The headline uses normal language is newsworthy for other reasons than to generate revenue or get clicks and shares.", "Neither, or I'm not sure."),
    new SurveyCriteria("gatekeeping_bias","Gatekeeping","The headline concerns a known talking point of the Republican or Democratic party that is unlikely to be covered by both sides.","The headline is news that all readers would find relevant or be aware of.","Neither, or I'm not sure."),
    new SurveyCriteria("decision_making_bias","Decision-making","The headline clearly disapproves of something.","The writer of the headline does not seem to have made a decision on the subject.","I don't know."),
    new SurveyCriteria("mainstream_bias","Mainstream","The headline is inoffensive and refers to things or people that are universally popular or part of pop culture.","The headline refers to things that have nothing to do with pop culture or mainstream people and things.","Neither."),
    new SurveyCriteria("false_balance_bias","False Equivalency","The headline gives equal attention to two sides even though it is largely agreed that the facts on one side are much stronger.","The headline gives attention to each side that is proportionate to the facts.", "Neither, or I don't know.")
]