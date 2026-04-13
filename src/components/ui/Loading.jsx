import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Loading = ({ size }) => {
  if (typeof size === "string") {
    return <Spin indicator={<LoadingOutlined spin />} size={size} />;
  }
  return (
    <div className="min-w-screen  min-h-screen flex justify-center items-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};
export default Loading;
