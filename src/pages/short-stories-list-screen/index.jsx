import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import themeManager from '../../utils/themeManager';
import StoryCard from './components/StoryCard';
import PandaMotivation from '../daily-tasks-panel/components/PandaMotivation';

const ShortStoriesListScreen = () => {
  const navigate = useNavigate();
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());
  const [currentUser, setCurrentUser] = useState(null);

  // Sample Chinese short stories data
  const [stories] = useState([
    {
      id: 1,
      title: '小猫钓鱼',
      snippet: '小猫和妈妈一起去钓鱼，小猫总是三心二意...',
      content: '小猫和妈妈一起去钓鱼。小猫拿着鱼竿坐在河边，可是他一会儿捉蜻蜓，一会儿捉蝴蝶，总是三心二意。妈妈专心致志地钓鱼，很快就钓到了一条大鱼。小猫看到了，决定要认真钓鱼。他放下鱼竿，专心致志地等待。过了一会儿，小猫也钓到了一条大鱼。妈妈夸奖小猫说："做什么事都要专心，不能三心二意。"小猫明白了这个道理，从此做事都很认真。',
      difficulty: '初级',
      readingTime: '2分钟'
    },
    {
      id: 2,
      title: '乌鸦喝水',
      snippet: '乌鸦口渴了，找到一个瓶子，但水太少喝不到...',
      content: '有一只乌鸦口渴了，到处找水喝。它看见一个瓶子，里面有一点水，但是瓶口很小，乌鸦的嘴巴伸不进去。乌鸦想了想，开始一颗一颗地把小石子放进瓶子里。石子越来越多，瓶子里的水位慢慢升高。最后，水升到了瓶口，乌鸦高兴地喝到了水。这个故事告诉我们，遇到困难时，要动脑筋想办法，而不是放弃。',
      difficulty: '初级',
      readingTime: '2分钟'
    },
    {
      id: 3,
      title: '守株待兔',
      snippet: '从前有个农夫，看到兔子撞树死了，从此不再耕种...',
      content: '从前有个农夫在田里干活，忽然看见一只兔子跑过来，一头撞在田边的树桩上，死了。农夫高兴地捡起兔子，美美地吃了一顿。从此，他再也不想干活了，每天坐在树桩旁边等兔子。日子一天天过去，再也没有兔子撞死在树桩上，农夫的田地也荒芜了。这个故事告诉我们，不能靠运气和偶然，要通过自己的努力去获得成功。',
      difficulty: '中级',
      readingTime: '3分钟'
    },
    {
      id: 4,
      title: '狐狸和葡萄',
      snippet: '狐狸看见高高的葡萄架上挂着紫红的葡萄...',
      content: '狐狸看见高高的葡萄架上挂着一串串紫红的葡萄，馋得直流口水。它想尽办法要摘葡萄，跳了一次又一次，但葡萄架太高，怎么也摘不到。狐狸累得气喘吁吁，最后决定放弃。离开时，它自言自语地说："这葡萄肯定是酸的，不好吃。"这个故事告诉我们，当我们得不到某样东西时，不要为了安慰自己而贬低它。',
      difficulty: '中级',
      readingTime: '2分钟'
    },
    {
      id: 5,
      title: '龟兔赛跑',
      snippet: '兔子和乌龟比赛跑步，兔子跑得很快但中途睡觉了...',
      content: '兔子和乌龟比赛跑步。兔子跑得很快，一下子就跑到了前面。它看乌龟爬得这么慢，决定先睡一觉。乌龟虽然爬得慢，但一直坚持不懈地向前爬。当兔子醒来时，发现乌龟已经到达了终点。兔子后悔不已，但已经输了比赛。这个故事告诉我们，只要坚持不懈，慢慢也能取得成功，而骄傲自满会导致失败。',
      difficulty: '初级',
      readingTime: '3分钟'
    },
    {
      id: 6,
      title: '小马过河',
      snippet: '小马要过河，但不知道水深不深，问了不同的动物...',
      content: '小马要过河，但不知道水深不深。它问牛伯伯，牛伯伯说水很浅，刚到膝盖。它又问松鼠，松鼠说水很深，昨天它的伙伴就淹死了。小马不知道该相信谁，回家问妈妈。妈妈说："你自己试试就知道了。"小马小心地试了试，发现水不深也不浅，正好可以过河。这个故事告诉我们，不要只听别人的话，要自己亲身实践才能知道真相。',
      difficulty: '中级',
      readingTime: '4分钟'
    }
  ]);

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login-screen');
      return;
    }
    setCurrentUser(JSON.parse(userData));

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, [navigate]);

  const handleStoryClick = (story) => {
    navigate('/story-detail-screen', { state: { story } });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeConfig.background }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🐼</div>
          <p className="text-lg" style={{ color: themeConfig.textSecondary }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeConfig.background }}>
      <AppHeader />
      
      {/* Page Title Section */}
      <div className="px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2" style={{ color: themeConfig.textPrimary }}>
            <span>中文小故事</span>
            <span className="text-3xl">📚</span>
          </h1>
          <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
            和熊猫一起读有趣的中文故事
          </p>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="px-4 py-3">
        <PandaMotivation 
          message="嘻嘻！准备好和我一起探索精彩的中文故事了吗？🐼📖 每个故事都有深刻的道理哦！"
          mood="happy"
        />
      </div>

      {/* Stories Grid */}
      <div className="px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => handleStoryClick(story)}
              themeConfig={themeConfig}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => navigate('/main-chat-interface')}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform duration-200 hover:scale-110"
          style={{ backgroundColor: themeConfig.primary }}
        >
          <span className="text-2xl">🐼</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="py-3 px-4 text-center border-t mt-8" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
        <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
          Powered by Zeal Education
        </p>
      </footer>
    </div>
  );
};

export default ShortStoriesListScreen;