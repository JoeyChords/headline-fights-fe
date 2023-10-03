/** Stores radio button choices the user makes regarding each headline.
 * Includes user and headline data to send back to API server.
 */

class UserFeedback {
  constructor(publication, publicationAnswerStatus, headlineID, userID) {
    this.publicationAnswer = publication;
    this.publicationCorrect = publicationAnswerStatus;
    this.headline = headlineID;
    this.user = userID;
  }
}

module.exports = UserFeedback;
