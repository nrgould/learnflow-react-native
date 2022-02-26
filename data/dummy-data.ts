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
		'Derivatives',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[0]
	),
	new Particle(
		'Chain Rule',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[1]
	),
	new Particle(
		'Anti-Derivatives',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[2]
	),
	new Particle(
		'Limits',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[3]
	),
	new Particle(
		'Integrals',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[4]
	),
	new Particle(
		'Min/Max',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[5]
	),
];

const MODULES = [
	new Module(
		[...PARTICLES],
		'Calculus 1',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		40,
		107
	),
	new Module(
		[...PARTICLES],
		'Calculus 2',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		97,
		135
	),
	new Module(
		[...PARTICLES],
		'Calculus 3',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		67,
		112
	),
	new Module(
		[...PARTICLES],
		'Linear Algebra',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		53,
		87
	),
	new Module(
		[...PARTICLES],
		'Linear Algebra',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		53,
		87
	),
	new Module(
		[...PARTICLES],
		'Linear Algebra',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		53,
		87
	),
	new Module(
		[...PARTICLES],
		'Linear Algebra',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		53,
		87
	),
	new Module(
		[...PARTICLES],
		'Linear Algebra',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		53,
		87
	),
];

export const serializedModules = JSON.parse(JSON.stringify(MODULES));
