export const dynamic = 'force-dynamic';
import LoginForm from "./LoginForm";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Login = async () => {
  const currentUser = await getCurrentUser()
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser}/>
      </FormWrap>
    </Container>
  );
};

export default Login;
