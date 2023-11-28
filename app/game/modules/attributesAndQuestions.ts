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
    new SurveyCriteria("portrays_negatively","Coverage","The headline includes a negative portrayal of a political party or ideology.", "The headline includes a positive portrayal of a political party or ideology.", "Neither."),
    new SurveyCriteria("distorts","Distortion","The headline distorts or manipulates facts to represent an opinion.", "The headline only presents facts.", "I'm not sure."),
    new SurveyCriteria("partisan", "Partisan", "The headline supports either the conservative or liberal side of an issue.", "The headline does not support political views of an issue.", "Neither."),
    new SurveyCriteria("bigoted", "Favoring or Attacking", "The headline favors or attacks a particular race, religion, gender, age, sexual orientation, ethnic group, or person.", "The headline concerns a particular race, religion, gender, age, sexual orientation, ethnic group, or person but does not play favorites.", "Neither."),
    new SurveyCriteria("one_sided_content", "Content", "The headline presents one side of a conflict, political or otherwise.", "The headline presents both sides of a conflict.", "Neither."),
    new SurveyCriteria("clickbait", "Structural", "The headline subject seems like it has been chosen only because it is likely to sell something, be shared, or get clicks.", "The headline is newsworthy for other reasons than to generate revenue or get clicks and shares.", "I'm not sure."),
    new SurveyCriteria("has_agenda","Gatekeeping","The headline concerns a known talking point of the Republican or Democratic party.","The headline is news that all readers would find relevant or be aware of.","I'm not sure."),
    new SurveyCriteria("makes_decision","Decision-making","The headline clearly disapproves of something.","The writer of the headline does not seem to have made a decision on the subject.","I don't know."),
    new SurveyCriteria("","Mainstream","","",""),
    new SurveyCriteria("","False Equivalency","","","")
]