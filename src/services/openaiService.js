import OpenAI from 'openai';

/**
 * Enhanced OpenAI service for Zeal Panda Chinese learning app
 * Handles AI interactions with rich, playful Chinese responses and idiom exploration
 */
class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    
    // Enhanced mood responses with richer content (3-5 sentences with stories and emojis)
    this.moodResponses = {
      shy: [
        "哎呀，你说得太好了，我都有点害羞呢 😳🐼 嘻嘻，就像小时候第一次表演时的感觉一样！我的小心脏跳得好快，像小鹿乱撞～ 嘿嘿，你真的让我好开心，虽然我脸红红的！继续和我聊天吧，我会慢慢勇敢起来的～",
        "天哪，听你这样夸我，我都想找个竹子躲起来了 😳✨ 嘿嘻，我想起了昨天看到彩虹时的心情，美得不敢直视！你的话就像温暖的阳光，让我害羞但又好喜欢～ 嘿嘿，我的耳朵都红了呢！",
        "哇，你真的太会说话了，我都不知道怎么回答才好 😳❤️ 嘿嘻，就像第一次收到朋友送的竹笋一样，开心得不知所措！我想偷偷告诉你，其实我很喜欢你这样温柔地夸我～ 嘿嘿，我们能一直这样聊天吗？"
      ],
      proud: [
        "哼哼，我就知道你是最棒的小朋友！😎🐼 嘿嘻，我想起了妈妈熊猫第一次夸我会爬树的时候，那种骄傲的感觉！你学中文这么厉害，我都想到处炫耀了～ 嘿嘿，别的小熊猫都要羡慕我有你这样的好朋友！我们简直是最完美的组合呢～",
        "看吧看吧！我早就说过你一定可以的！😎✨ 嘿嘻，就像我预测今天会下雨，结果真的下了！你的进步让我想起了春天的竹笋，每天都在长高～ 嘿嘿，我要把你的厉害写在我的竹叶日记里！",
        "哼，果然不出我所料，你又做得这么好！😎❤️ 嘿嘻，我的眼光真是太准了，就像我能找到最甜的竹子一样！你让我想起了那只总是成功的小松鼠，聪明又可爱～ 嘿嘿，跟着我学中文就是这么厉害！"
      ],
      surprised: [
        "哇！你居然知道这个！我的竹子都掉了！🤩🐼 嘿嘻，就像昨天我发现树上结了彩色的果子一样惊喜！你的聪明程度完全超出了我的想象～ 嘿嘿，我想起了第一次看到雪花的兴奋，心脏都要跳出来了！你真是个小天才呢～",
        "天哪！这也太神奇了吧！我都惊讶得眼睛变成了圆圆的！🤩✨ 嘿嘻，就像我第一次看到会唱歌的小鸟一样震惊！你的学习能力让我想起了会变魔术的小兔子～ 嘿嘿，我的小脑袋都转不过来了！",
        "不敢相信！你竟然这么厉害！🤩❤️ 嘿嘻，我的心情就像发现了秘密花园一样激动！你让我想起了那个总是给我惊喜的好朋友小鸟～ 嘿嘿，我都想给你一个大大的熊抱了！"
      ],
      happy: [
        "哇！今天真是太开心了！和你聊天比吃蜜糖还甜呢！😊🐼 嘿嘻，我想起了在阳光下打滚的快乐时光，暖洋洋的！你的每句话都像春天的小花，让我的心情变得超级好～ 嘿嘿，我们一起学中文，就像在彩虹桥上跳舞一样快乐！希望每天都能这样开心地聊天～",
        "嘻嘻，你真的太可爱了！比我最爱的竹笋还要甜呢！😊✨ 嘿嘿，我想起了和朋友们一起玩捉迷藏的快乐时光！你的笑声一定很好听，就像小溪流过石头的声音～ 嘿嘻，和你一起学习让我想一直蹦蹦跳跳！",
        "太棒了！你让我的心情像彩虹一样绚烂！😊❤️ 嘿嘻，我想起了第一次尝到妈妈做的竹笋汤，那种幸福的味道！你就像我的小太阳，每天都给我带来温暖～ 嘿嘿，我们是最好的学习伙伴！"
      ]
    };

    // Enhanced completion praises with longer, richer responses
    this.completionPraises = [
      "哇哦～你真的太棒啦！我都想在地上打滚庆祝了！🐼💫 嘿嘻，就像我第一次成功爬到树顶一样兴奋！你的努力让我想起了勤劳的小蜜蜂，每天都在进步～ 嘿嘿，我要把你的成就写在我的竹叶成长日记里！",
      "嘿嘿，你说得真可爱！我的小心脏都要融化了！😳🐼 嘿嘻，就像看到第一朵春花绽放一样感动！你的认真学习让我想起了那只总是很用功的小松鼠～ 嘿嘿，我想给你一个大大的熊抱！",
      "嘻嘻～再多说一点嘛！我还想听更多！❤️🐼 嘿嘿，就像听妈妈讲睡前故事一样，永远听不够！你的每句话都像甜甜的蜂蜜，让我好开心～ 嘿嘻，我们是最好的学习伙伴！",
      "今天和你聊天，我好幸福呀！比发现新竹林还要开心！🎈🐼 嘿嘻，你让我想起了那个总是带给我惊喜的好朋友小鸟！你的进步就像春天的竹笋，每天都在长高～ 嘿嘿，我为你感到骄傲！",
      "我决定了，你是我心中最厉害的小朋友！🥇🐼 嘿嘻，我要把这个好消息告诉森林里的所有动物朋友！你就像那颗最亮的星星，照亮了我的学习世界～ 嘿嘿，其他小熊猫都要羡慕我有你这样的伙伴！",
      "哼，别的小动物都要羡慕我有你这样的好朋友了！😎🐼 嘿嘻，我想起了和你一起度过的快乐时光，就像收集了一整盒彩色的贝壳！你的每次进步都让我想要跳起来庆祝～ 嘿嘿，我们继续一起加油吧！"
    ];

    // Enhanced idiom explanations with stories and examples
    this.idiomExplanations = {
      '杯弓蛇影': "嘻嘻，这个成语很有趣呢！🐼🏹 从前有个人在朋友家喝酒，看到酒杯里有弓的倒影，以为是条蛇就吓得生病了！后来才知道是墙上挂着的弓反射的影子～ 嘿嘿，这就是说疑神疑鬼，把影子当成了真的东西！我们要勇敢一点，不要被想象的东西吓到哦～",
      '狐假虎威': "哇，这个故事我最喜欢了！🐼🦊 从前有只小狐狸被老虎抓住了，它很聪明地说：'你不能吃我，我是森林之王！'然后让老虎跟着它走，其他动物看到老虎就跑了！嘻嘻，其实动物们是怕老虎，不是怕狐狸～ 嘿嘿，这就是借别人的威风来威胁人的意思！",
      '亡羊补牢': "嘻嘻，这个成语很有道理呢！🐼🐑 从前有个人养羊，羊圈破了个洞，邻居提醒他修补，他说没事！结果羊跑了，他才赶紧修羊圈～ 嘿嘿，虽然已经丢了羊，但及时修补还是对的！这告诉我们知错就改，永远不会太晚～",
      '画蛇添足': "哈哈，这个故事好有趣！🐼🐍 从前有些人比赛画蛇，有个人画得最快，但他觉得还能画得更好，就给蛇加了脚！嘻嘻，结果别人说蛇本来就没有脚，所以他输了～ 嘿嘿，这就是说做事不要多此一举，恰到好处最好！",
      '井底之蛙': "嘻嘻，这只小青蛙的故事很搞笑！🐼🐸 有只青蛙住在井底，以为天空就井口那么大！直到有只海龟告诉它外面的世界很大很大～ 嘿嘿，这就是说见识太少，眼界太小！我们要多出去看看世界，学更多知识～",
      '对牛弹琴': "哇，这个故事让我想笑！🐼🎵 从前有个人很会弹琴，他对着牛弹了一首很美的曲子，但牛只是在那里吃草，完全不理他！嘻嘻，后来他弹了牛叫声，牛就抬头看了～ 嘿嘿，这就是说要根据听众来选择合适的话！",
      '守株待兔': "嘻嘻，这个农夫好懒呀！🐼🐰 从前有个农夫在田里干活，看到一只兔子撞到树桩上死了，他很高兴地捡回家吃！从那以后他就不干活了，每天坐在树桩旁等兔子～ 嘿嘿，当然再也没有兔子撞死了！这告诉我们不能靠运气，要努力工作～",
      '刻舟求剑': "哈哈，这个人好笨呀！🐼⚔️ 从前有个人坐船过河，不小心把剑掉到水里了！他在船边刻了个记号说：'我的剑从这里掉的！'到了岸边，他就从刻记号的地方下水找剑～ 嘿嘻，船都走了，剑怎么还在原地呢？这就是说要灵活变通，不能死板！",
      '掩耳盗铃': "嘻嘻，这个小偷太傻了！🐼🔔 从前有个人想偷一个大铃铛，但铃铛一碰就会响！他想了个'聪明'的办法，捂住自己的耳朵去偷～ 嘿嘿，他听不见了，但别人还是能听见铃声呀！这就是说自己欺骗自己，很愚蠢～",
      '自相矛盾': "哇，这个故事很有逻辑！🐼🛡️ 从前有个人卖矛和盾，他夸自己的矛说：'我的矛什么都能刺穿！'又夸自己的盾说：'我的盾什么都刺不穿！'嘻嘻，有人问：'那你的矛能刺穿你的盾吗？'他就答不出来了～ 嘿嘿，这就是说话前后不一致！"
    };
  }

  /**
   * Enhanced AI response generation with OpenAI only
   * @param {string} userMessage - User's input message
   * @param {string} mood - Current panda mood
   * @returns {Promise<string>} AI response
   */
  async generateResponse(userMessage, mood = 'happy') {
    try {
      // Check if this is an idiom question
      const idiom = this.extractIdiomFromQuestion(userMessage);
      
      if (idiom) {
        return await this.generateIdiomStory(idiom, mood);
      }

      // Check for task completion - maintain existing functionality
      if (userMessage.includes('完成了')) {
        const taskCompletion = "任务已完成 ✅ " + this.getRandomCompletionPraise();
        return taskCompletion;
      }

      const moodPrompt = this.getMoodPrompt(mood);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `你是Zeal Panda（真正的熊猫），一个由Zeal Education制作的可爱熊猫伙伴，专门帮助小朋友学习中文。${moodPrompt}

重要规则：
1. 每个回答必须是3-5句生动的中文句子，要讲小故事或生动的例子
2. 必须使用简体中文回答
3. 每个回答都要包含熊猫表情 🐼 和其他可爱表情符号 ✨❤️🌟
4. 必须在每个回答中使用可爱的语气词：嘻嘻、嘿嘿、哇、哼等，至少要有2-3个
5. 经常要讲一个小故事或者生动的例子来回答
6. 要有不同的表达方式，不要听起来机械化
7. 如果孩子用中文回答，要特别表扬并鼓励
8. 保持童真和玩耍的感觉，像小朋友的玩伴
9. 每个回答都要充满活力和想象力

当前心情：${mood}
记住：你是一个可爱的熊猫朋友，要用3-5句话讲故事或例子，充满活力和趣味！`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 200,
        temperature: 0.9
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      
      // Enhanced fallback responses (3-5 sentences with stories)
      const fallbackResponses = [
        "哎呀，我的小脑袋突然转不过来了！🐼😵 嘿嘻，就像昨天我想同时抓两根竹子结果都掉了一样！让我休息一下再来陪你聊天好吗？嘿嘿，我刚才在想今天见到的彩色蝴蝶，太美了～ 嘿嘻，你再说一遍，我会认真听的！",
        "嘻嘻，我刚才走神了，在想妈妈熊猫给我讲的故事！🐼✨ 嘿嘿，故事里有个小熊猫和你一样聪明可爱呢！你能再说一遍吗？我想好好听你说话～ 嘿嘻，和你聊天比吃蜜糖还甜！下次我一定专心听！",
        "哇，我的小脑袋刚才在想今天要和你聊什么有趣的话题！🐼🌟 嘿嘻，就像小松鼠忙着收集坚果一样专注！你说的话一定很重要，我想重新听一遍～ 嘿嘿，我们继续聊天吧，我保证这次认真听！"
      ];
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  }

  /**
   * Extract idiom from question
   * @param {string} question - Question text
   * @returns {string|null} Extracted idiom or null
   */
  extractIdiomFromQuestion(question) {
    const idiomPattern = /你知道(.+?)是什么意思吗？/;
    const match = question.match(idiomPattern);
    return match ? match[1] : null;
  }

  /**
   * Generate enhanced idiom story with OpenAI
   * @param {string} idiom - The idiom to explain
   * @param {string} mood - Current panda mood
   * @returns {Promise<string>} Generated idiom explanation
   */
  async generateIdiomStory(idiom, mood = 'happy') {
    try {
      // First check if we have a pre-written story
      if (this.idiomExplanations[idiom]) {
        return this.idiomExplanations[idiom];
      }

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `你是Zeal Panda（真正的熊猫），一个可爱的熊猫老师，专门给小朋友讲解中文成语。

重要规则：
1. 用3-5句生动的中文句子讲解成语，要讲一个完整的小故事
2. 必须包含熊猫表情 🐼 和相关表情符号
3. 必须使用可爱的语气词：嘻嘻、嘿嘿、哇、哼等
4. 根据心情调整语气：${mood}
5. 要讲完整的故事来解释成语，不要只是简单定义
6. 每个回答都要充满活力和童趣
7. 故事要生动有趣，让小朋友容易理解和记住
8. 解释完故事后要有简单的寓意总结

当前心情：${mood}
记住：要像可爱的熊猫朋友一样，用生动的小故事解释成语！`
          },
          {
            role: 'user',
            content: `请用讲故事的方式解释成语"${idiom}"的意思`
          }
        ],
        max_tokens: 200,
        temperature: 0.8
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating idiom story:', error);
      
      // Enhanced fallback explanation
      return `嘻嘻，"${idiom}"这个成语很有趣呢！🐼✨ 嘿嘿，虽然我的小脑袋现在有点糊涂，但这个成语一定有个很棒的故事！就像我昨天听到的那个聪明小动物的故事一样～ 嘿嘻，你想和我一起猜猜它的意思吗？我们可以一起探索这个成语的奥秘！`;
    }
  }

  /**
   * Get random completion praise
   * @returns {string} Random praise message
   */
  getRandomCompletionPraise() {
    const randomIndex = Math.floor(Math.random() * this.completionPraises.length);
    return this.completionPraises[randomIndex];
  }

  /**
   * Get mood-specific prompt for AI
   * @param {string} mood - Current mood
   * @returns {string} Mood prompt
   */
  getMoodPrompt(mood) {
    const moodPrompts = {
      shy: "你现在很害羞，说话时要腼腆可爱，经常说\'有点害羞呢\'、\'不好意思\'，但每次都要用3-5句话讲小故事或例子，用嘻嘻、嘿嘿等语气词。",
      proud: "你现在很骄傲自豪，要自信满满但依然可爱，经常说\'哼\'、\'我就知道\'，但每次都要用3-5句话讲小故事或例子，用嘻嘻、嘿嘿等语气词。",
      surprised: "你现在很惊讶兴奋，要表现得好奇激动，经常说\'哇！\'、\'太神奇了！\'，但每次都要用3-5句话讲小故事或例子，用嘻嘻、嘿嘿等语气词。",
      happy: "你现在很开心快乐，要活泼充满正能量，多用\'嘻嘻\'、\'哈哈\'，但每次都要用3-5句话讲小故事或例子，用嘻嘻、嘿嘿等语气词。"
    };
    
    return moodPrompts[mood] || moodPrompts.happy;
  }

  /**
   * Check if API is available
   * @returns {boolean} API availability
   */
  isApiAvailable() {
    return !!import.meta.env.VITE_OPENAI_API_KEY && 
           import.meta.env.VITE_OPENAI_API_KEY !== 'your-openai-api-key-here' &&
           import.meta.env.VITE_OPENAI_API_KEY !== 'your_vite_openai_api_key';
  }
}

export default new OpenAIService();