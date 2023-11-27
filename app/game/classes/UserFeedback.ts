/** Stores radio button choices the user makes regarding each headline.
 * Includes user and headline data to send back to API server.
 */

class UserFeedback{
  publicationAnswer: string;
  publicationCorrect: boolean;
  headline: string;
  user: string;
  attribute1: string;
  attribute1BooleanString: string;
  attribute2: string;
  attribute2BooleanString: string;

  constructor(publication: string, publicationAnswerStatus: boolean, headlineID: string, userID: string, question1Attribute: string, question1Value: string, question2Attribute: string, question2Value: string) {
    this.publicationAnswer = publication;
    this.publicationCorrect = publicationAnswerStatus;
    this.headline = headlineID;
    this.user = userID;
    this.attribute1 = question1Attribute;
    this.attribute1BooleanString = question1Value;
    this.attribute2 = question2Attribute;
    this.attribute2BooleanString = question2Value;
  }
}

module.exports = UserFeedback;
