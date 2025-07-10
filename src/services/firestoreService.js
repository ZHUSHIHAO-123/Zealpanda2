/**
 * Firestore service for idiom storage and retrieval
 * Provides fallback data when Firestore is not available
 */
class FirestoreService {
  constructor() {
    // Mock Firestore data for idioms - replace with actual Firestore implementation
    this.idiomsCollection = {
      '杯弓蛇影': {
        story: "嘻嘻，这个成语很有趣呢！🐼🏹 有个人喝酒时看到杯子里弓的影子，以为是蛇就吓病了～ 嘿嘿，其实是疑神疑鬼的意思呀！",
        mood: "surprised"
      },
      '狐假虎威': {
        story: "哇，这个成语很聪明呢！🐼🦊 小狐狸借着老虎的威风吓唬别人，就像借别人的权势呢～ 嘿嘻，要靠自己的实力哦！",
        mood: "proud"
      },
      '亡羊补牢': {
        story: "嘿嘿，这个成语很有道理呢！🐼🐑 丢了羊再修羊圈，虽然晚了但还不算太迟～ 嘿嘿，知错能改很重要！",
        mood: "happy"
      },
      '画蛇添足': {
        story: "嘻嘻，这个成语是说做事情多余了呢！🐼✨ 就像画蛇的时候还要给它加脚，明明蛇没有脚嘛～ 嘿嘿，做事情要适度哦！",
        mood: "shy"
      },
      '井底之蛙': {
        story: "嘿嘿，这个成语说的是井底的小青蛙啦！🐼🐸 它看到的天空很小，就像见识不广的人呢～ 嘿嘻，我们要多学习开阔眼界！",
        mood: "surprised"
      },
      '对牛弹琴': {
        story: "哈哈，这个成语太有趣了！🐼🎵 给牛弹琴它也听不懂，就是说对不懂的人说深奥的话呢～ 嘿嘿，说话要看对象哦！",
        mood: "proud"
      },
      '守株待兔': {
        story: "嘻嘻，这个成语说的是一个很懒的人呢！🐼🐰 他等着兔子撞树，不知道要主动努力～ 嘿嘿，我们要勤奋才能成功！",
        mood: "happy"
      },
      '刻舟求剑': {
        story: "哈哈，这个成语说的是一个糊涂人呢！🐼⚔️ 在船上刻记号找掉水里的剑，不知道船在动呢～ 嘿嘿，要灵活变通哦！",
        mood: "shy"
      },
      '掩耳盗铃': {
        story: "嘻嘻，这个成语太可爱了！🐼🔔 自己捂住耳朵偷铃铛，以为别人听不到呢～ 嘿嘿，真是自欺欺人呀！",
        mood: "surprised"
      },
      '自相矛盾': {
        story: "哇，这个成语很有趣呢！🐼⚔️ 说自己的矛能刺穿任何盾，盾能挡住任何矛，前后矛盾啦～ 嘿嘻，说话要一致哦！",
        mood: "proud"
      }
    };
  }

  /**
   * Get idiom story from Firestore or local data
   * @param {string} idiom - The idiom to search for
   * @returns {Promise<object|null>} Idiom story object or null if not found
   */
  async getIdiomStory(idiom) {
    try {
      // TODO: Replace with actual Firestore query
      // const doc = await firestore.collection('idioms').doc(idiom).get();
      // if (doc.exists) {
      //   return doc.data();
      // }
      
      // For now, use local data
      const localData = this.idiomsCollection[idiom];
      if (localData) {
        return {
          story: localData.story,
          mood: localData.mood,
          source: 'firestore'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching idiom from Firestore:', error);
      return null;
    }
  }

  /**
   * Save idiom story to Firestore
   * @param {string} idiom - The idiom
   * @param {object} storyData - Story data to save
   * @returns {Promise<boolean>} Success status
   */
  async saveIdiomStory(idiom, storyData) {
    try {
      // TODO: Replace with actual Firestore save
      // await firestore.collection('idioms').doc(idiom).set(storyData);
      
      // For now, save to local storage as fallback
      const existingData = localStorage.getItem('idiomStories') || '{}';
      const stories = JSON.parse(existingData);
      stories[idiom] = storyData;
      localStorage.setItem('idiomStories', JSON.stringify(stories));
      
      return true;
    } catch (error) {
      console.error('Error saving idiom to Firestore:', error);
      return false;
    }
  }

  /**
   * Extract idiom from question text
   * @param {string} question - The question text
   * @returns {string|null} Extracted idiom or null
   */
  extractIdiomFromQuestion(question) {
    // Common patterns for idiom questions
    const patterns = [
      /你知道(.+?)是什么意思吗？/,
      /(.+?)是什么意思/,
      /什么是(.+?)\?/,
      /解释(.+?)的意思/
    ];

    for (const pattern of patterns) {
      const match = question.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return null;
  }
}

export default new FirestoreService();