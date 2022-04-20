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

export default function LoginForm({
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
				label='Email'
				textContentType='emailAddress'
				onChangeText={handleChange('email')}
				onBlur={() => setFieldTouched('email')}
				variant='underline'
				placeholder='john@school.edu'
				marginBottom='m'
				autoCapitalize='none'
				spellCheck={false}
				value={values.email}
				error={errors.email && touched.email ? errors.email : null}
			/>
			<FormTextInput
				textContentType='password'
				label='Password'
				onChangeText={handleChange('password')}
				onBlur={() => setFieldTouched('password')}
				variant='underline'
				placeholder='Enter Password...'
				marginBottom='m'
				value={values.password}
				error={
					errors.password && touched.password ? errors.password : null
				}
				secureTextEntry={true}
			/>
			<Button
				disabled={isSubmitting || !dirty || !isValid}
				label='Sign In'
				onPress={handleSubmit}
				variant='primary'
				loading={isSubmitting}
			/>
		</Card>
	);
}
