import PushNotification from 'react-native-push-notification';

export function LocalNotification({message, title,bigText}:{message:string,title:string,bigText?:string}) {

  PushNotification.localNotification({
    channelId: "channel-id",     
    autoCancel: true,
    bigText:
    bigText?bigText:'',
    subText: 'Planetsurf Info',
    title: title,
    message: message,
    // vibrate: true,
    // vibration: 300,
    // playSound: true,
    // soundName: 'default',
    // actions: ['Yes', 'No'],
  });
}

export function CurrencyFormat(num: number) {
  return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function LimitText(text: string, limit: number) {
  let _text = text;
  if (text.length > limit) {
    _text = `${text.substring(0, limit - 2)}...`;
  }

  return _text;
}
export function getMonth(date: Date) {
  const month = date.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}
export function getDate(date: Date) {
  const d = date.getDate();
  return d > 10 ? '0' + d : '' + d; // ('' + month) for string result
}
export function getYear(date: Date) {
  const yx = date.getFullYear();
  return yx;
}
export function getDockDate(date?: Date) {
  const dateNow = date ? date : new Date();
  const d = dateNow.getDate();
  const m = dateNow.getMonth() + 1;
  const y = dateNow.getFullYear();
  const newD = d > 10 ? '' + d : '0' + d;
  const newM = m > 10 ? '' + m : '0' + m;
  const xx = String(y).substr(2, 2) + newM + newD;
  return xx;
}
