import { helper } from '@ember/component/helper';

export function truncateText(params) {
  let [message, length] = params;
  message = message.substring(0, length);
  message +="...";

  return message;
}

export default helper(truncateText);
