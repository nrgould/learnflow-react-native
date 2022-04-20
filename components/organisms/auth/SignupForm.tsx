import { FormikFormProps } from 'formik';
import React from 'react';
import Button from '../../atoms/Button';
import Card from '../../atoms/Card';
import FormTextInput from '../../atoms/FormTextInput';

interface Props extends FormikFormProps {
	handleChange: any;
	isValid: boolean;
	values: any;
	dirty: boolean;
	handleSubmit: any;
	touched: any;
	isSubmitting: boolean;
	errors: any;
	setFieldTouched: any;
}

export default function SignupForm({
	handleChange,
	setFieldTouched,
	isValid,
	values,
	handleSubmit,
	touched,
	errors,
	dirty,
	isSubmitting,
}: Props) {
	return (
		<Card paddingTop='s' padding='l' variant='primary' width='90%'>
			<FormTextInput
				label='Name'
				textContentType='givenName'
				onChangeText={handleChange('name')}
				onBlur={() => setFieldTouched('name')}
				variant='underline'
				placeholder='Enter Full Name'
				marginBottom='xs'
				value={values.name}
				error={errors.name && touched.name ? errors.name : null}
			/>
			<FormTextInput
				label='Email'
				textContentType='emailAddress'
				onChangeText={handleChange('email')}
				onBlur={() => setFieldTouched('email')}
				variant='underline'
				placeholder='john@school.edu'
				marginBottom='xs'
				value={values.email}
				autoCapitalize='none'
				error={errors.email && touched.email ? errors.email : null}
				spellCheck={false}
			/>
			<FormTextInput
				textContentType='password'
				label='Password'
				onChangeText={handleChange('password')}
				onBlur={() => setFieldTouched('password')}
				variant='underline'
				placeholder='Enter Password'
				marginBottom='xs'
				value={values.password}
				secureTextEntry={true}
				error={
					errors.password && touched.password ? errors.password : null
				}
			/>
			<Button
				disabled={isSubmitting || !dirty || !isValid}
				label='Create Account'
				onPress={handleSubmit}
				variant='primary'
				loading={isSubmitting}
			/>
		</Card>
	);
}
