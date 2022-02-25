import { Module } from '../models/module';
import { Particle } from '../models/particle';
import { Question } from '../models/question';

export const QUESTIONS = [
	new Question('this is a question', 'this is an answer'),
	new Question('this is a question 1', 'this is an answer 1'),
	new Question('this is a question 2', 'this is an answer 2'),
	new Question('this is a question 3', 'this is an answer 3'),
	new Question('this is a question 4', 'this is an answer 4'),
	new Question('this is a question 5', 'this is an answer 5'),
	new Question('this is a question 6', 'this is an answer 6'),
	new Question('this is a question 7', 'this is an answer 7'),
	new Question('this is a question 8', 'this is an answer 8'),
];

export const PARTICLES = [
	new Particle(
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[0]
	),
	new Particle(
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[1]
	),
	new Particle(
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[2]
	),
	new Particle(
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[3]
	),
	new Particle(
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[4]
	),
	new Particle(
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[5]
	),
];

const MODULES = [
	new Module(
		[PARTICLES[0], PARTICLES[1], PARTICLES[2], PARTICLES[3]],
		'Calculus',
		'lorem ipsum this is a description'
	),
];

export const serializedModules = JSON.parse(JSON.stringify(MODULES));
