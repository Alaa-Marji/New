import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  animation: slideIn 0.5s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PasswordForm = () => {
  return (
    <Form>
      <Input type="password" placeholder="Current Password" />
      <Input type="password" placeholder="New Password" />
      <Input type="password" placeholder="Confirm New Password" />
      <Button type="submit">Change Password</Button>
    </Form>
  );
};

export default PasswordForm;
