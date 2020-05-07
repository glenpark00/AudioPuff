export const timeElapsed = time => {
  const datetime = new Date(time);
  const now = new Date().getTime();
  if (isNaN(datetime)) {
    return ' on ' + datetime;
  }

  if (datetime < now) {
    var milisec_diff = now - datetime;
  } else {
    var milisec_diff = datetime - now;
  }

  const days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
  const hours = Math.floor(milisec_diff / (1000 * 60 * 60) - days * 24);
  const minutes = Math.floor(milisec_diff / (1000 * 60) - days * 24 * 60 - hours * (60));
  if (days === 1) {
    return '1 day ago'
  }
  if (days > 1) {
    return (days + ' days ago');
  }
  if (hours === 1) {
    return (hours + ' hour ago');
  }
  if (hours > 1) {
    return (hours + ' hours ago')
  }
  if (minutes === 1) {
    return (minutes + ' minute ago');
  }
  if (minutes >= 0) {
    return (minutes + ' minutes ago')
  }
  return 'no date'
}