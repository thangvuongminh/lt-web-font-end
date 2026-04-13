import { notification } from "antd";
notification.config({
  duration: 6,
});
const notificationAntd = (type, title, desc) => {
  notification[type]({
    title: title,
    description: desc,
  });
};
export default notificationAntd;
