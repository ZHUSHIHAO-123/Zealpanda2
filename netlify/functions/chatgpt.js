/**
 * Netlify Function: chatgpt.js
 * 安全代理 OpenAI Chat Completion API，避免前端暴露 Key。
 * 接收 POST 请求，body: { message: "用户输入内容" }
 * 返回: { reply: openai生成的文本 } 或 { error: "出错信息" }
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  // 设置 CORS 头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // 处理 OPTIONS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // 只允许 POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // 解析请求体
    const { message } = JSON.parse(event.body || '{}');
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing message in request body' })
      };
    }

    // 获取 OpenAI API Key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'OpenAI API key not configured' })
      };
    }

    // 调用 OpenAI Chat Completion API
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '你是一只可爱的中文学习熊猫助手叫Zeal Panda。用有趣、生动的中文回复，包含emoji表情，帮助用户学习中文。保持友好、耐心和鼓励的语调，经常使用"嘻嘻"、"嘿嘿"等可爱的语气词。'
          },
          { 
            role: 'user', 
            content: message 
          }
        ],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      console.error('OpenAI API error:', errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: `OpenAI API error: ${errorText}` })
      };
    }

    const openaiData = await openaiRes.json();
    // 提取 AI 回复内容
    const reply = openaiData.choices?.[0]?.message?.content || '';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Unknown error' })
    };
  }
};