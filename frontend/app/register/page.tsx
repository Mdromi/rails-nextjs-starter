export const dynamic = 'force-dynamic';
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import RegisterForm from "./RegisterForm";
import VerificationForm from "./VerificationForm";
import { SessionProvider } from "next-auth/react";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
    <Container>
      <FormWrap>
        {currentUser && !currentUser?.verified ? (
          <VerificationForm currentUser={currentUser} />
        ) : (
          <RegisterForm currentUser={currentUser} />
        )}
      </FormWrap>
    </Container>
    </>
  );
};

export default Register;
