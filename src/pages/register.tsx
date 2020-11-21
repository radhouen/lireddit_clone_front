import React from 'react';
import { Form, Formik } from 'formik';

import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import { useMutation } from 'urql';

interface registerProps {}
const REGISTER_MUT = `
mutation Register($username: String!, $password: String!) {
  register(options: { username:$username, password:$password }) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`;
const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => register(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='username'
              label='username'
            />
            <Box mt={3}>
              <InputField
                type='password'
                name='password'
                placeholder='Password'
                label='password'
              />
            </Box>
            <Button type='submit' variantColor='teal' isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
