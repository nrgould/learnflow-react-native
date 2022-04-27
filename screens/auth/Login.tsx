import { Formik } from 'formik';
import React from 'react';
import Box from '../../components/atoms/Box';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import * as Yup from 'yup';
import LoginForm from '../../components/organisms/auth/LoginForm';
import { signInWithEmail } from '../../firestore/authService';
import { useNavigation } from '@react-navigation/native';

interface FormValues {
	email: string;
	password: string;
}

export default function Login() {
	const navigation = useNavigation<any>();

	const initialValues: FormValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().required('Required').email('Invalid Email'),
		password: Yup.string().required('Required'),
	});
	return (
		<Box
			flex={1}
			alignItems='center'
			justifyContent='center'
			backgroundColor='background'>
			<Text variant='header'>Login</Text>
			<Formik
				validationSchema={validationSchema}
				initialValues={initialValues}
				onSubmit={async (
					values,
					{ setSubmitting, setErrors, resetForm }
				) => {
					try {
						await signInWithEmail(values);
						setSubmitting(false);
						resetForm();
						navigation.navigate('Main');
					} catch (error) {
						setErrors(error as FormValues);
						setSubmitting(false);
						console.log(error);
					}
				}}>
				{({
					handleChange,
					isValid,
					dirty,
					errors,
					values,
					touched,
					handleSubmit,
					isSubmitting,
					setFieldTouched,
				}) => (
					<LoginForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						isValid={isValid}
						dirty={dirty}
						errors={errors}
						values={values}
						touched={touched}
						isSubmitting={isSubmitting}
						setFieldTouched={setFieldTouched}
					/>
				)}
			</Formik>
			<Text marginTop='xl' color='secondaryText' variant='body'>
				Don't have an account?
			</Text>
			<Button
				label='Sign Up'
				variant='link'
				margin='s'
				onPress={() => navigation.navigate('Signup')}
			/>
		</Box>
	);
}
