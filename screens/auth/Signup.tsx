import { Formik } from 'formik';
import React from 'react';
import Box from '../../components/atoms/Box';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import * as Yup from 'yup';
import SignupForm from '../../components/organisms/SignupForm';
import { registerInFirebase } from '../../firestore/authService';

interface Props {
	navigation: any;
}

interface FormValues {
	name: string;
	email: string;
	password: string;
}

export default function Signup({ navigation }: Props) {
	const initialValues: FormValues = {
		name: '',
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().required('Required').email('Invalid Email'),
		password: Yup.string().required('Required').min(6, 'Too short!'),
		name: Yup.string().required('Required').max(25, 'Too Long!'),
	});
	return (
		<Box
			flex={1}
			alignItems='center'
			justifyContent='center'
			backgroundColor='background'>
			<Text variant='header'>Create Account</Text>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (
					values,
					{ setSubmitting, setErrors, resetForm }
				) => {
					try {
						await registerInFirebase(values);
						console.log(values);
						resetForm();
						navigation.navigate('Feed');
					} catch (error) {
						setErrors(error as FormValues);
					} finally {
						setSubmitting(false);
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
					<SignupForm
						handleChange={handleChange}
						isValid={isValid}
						values={values}
						dirty={dirty}
						errors={errors}
						touched={touched}
						handleSubmit={handleSubmit}
						isSubmitting={isSubmitting}
						setFieldTouched={setFieldTouched}
					/>
				)}
			</Formik>
			<Text marginTop='l' color='secondaryText' variant='body'>
				Already have an account?
			</Text>
			<Button
				label='Sign In'
				variant='link'
				margin='none'
				onPress={() => console.log('signin')}
			/>
		</Box>
	);
}
