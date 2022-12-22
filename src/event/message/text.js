import { hasKey } from '../../haskey.js';
import { messageMap } from './text-map.js';
import { contextManage } from './context-manage.js';

// テキストメッセージの処理をする関数
export const textEvent = async (event, appContext) => {
  const contextManageResult = await contextManage(event, appContext);
  if (contextManageResult) {
    return contextManageResult;
  }
  // ユーザーから送られてきたメッセージ
  const receivedMessage = event.message.text;

  // 送られてきたメッセージに応じて返信するメッセージを取得してreturn
  if (hasKey(messageMap, receivedMessage)) {
    return messageMap[receivedMessage](event, appContext);
  }

  // 返信するメッセージが存在しない場合
  return {
    type: 'text',
    text: `受け取ったメッセージ: ${receivedMessage}\nそのメッセージの返信には対応してません...`,
  };
};
