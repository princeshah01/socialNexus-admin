import { Input } from 'antd';
import { LockOutlined , MailOutlined } from '@ant-design/icons';
import Logo from "../assets/Logo.png"
const Login = () => {
  return (
 <div className=" w-full h-screen flex flex-col items-center justify-center bg-background text-text dark:text-dark-text dark:bg-dark-background ">
  <div className="w-[22rem] h-[26rem]  flex flex-col items-center justify-around  dark:bg-dark-border rounded-xl">
    <div className='border-2 justify-center items-center flex border-primary rounded-full w-20 h-20'>
      <img src={Logo} width={50} />
    </div>
<div className='flex flex-col gap-7'>
    <Input placeholder='Admin@example.com' className='custom-placeholder placeholder-dark-border dark:placeholder-border w-[20rem] text-lg h-[3rem] text-text dark:text-dark-text dark:bg-dark-background shadow-lg border-none' prefix={<MailOutlined />}/>
    <Input className='w-[20rem] text-lg h-[3rem] text-text dark:text-dark-text dark:bg-dark-background shadow-lg border-none' prefix={<LockOutlined/>}/>
</div>
   
</div>
</div>
  );
};
export default Login;