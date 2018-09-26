import { Message } from 'element-ui';

export function info(msg) {
  const message = {
    showClose: true,
    duration: 5 * 1000,
    message: msg,
    type: 'info'
  };
  Message(message);
}
export function error(msg) {
  const message = {
    showClose: true,
    duration: 5 * 1000,
    message: msg,
    type: 'error'
  };
  Message(message);
}
export function warn(msg) {
  const message = {
    showClose: true,
    duration: 5 * 1000,
    message: msg,
    type: 'warning'
  };
  Message(message);
}
export function success(msg) {
  const message = {
    showClose: true,
    duration: 5 * 1000,
    message: msg,
    type: 'success'
  };
  Message(message);
}
