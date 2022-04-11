import { Module } from '../models/module';
import { Particle } from '../models/particle';
import { Question } from '../models/question';

const QUESTION = 'x^2 + 6x + 9 = (x + 3) times what?';

const OPTIONS = [
	{ id: '1', content: '(X - 3)', isAnswer: false },
	{ id: '2', content: '(X + 3)', isAnswer: true },
	{ id: '3', content: '(X - 6)', isAnswer: false },
	{ id: '4', content: '(X + 6)', isAnswer: false },
];

export const QUESTIONS = [
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
	new Question(QUESTION, OPTIONS),
];

export const PARTICLES = [
	new Particle(
		'Derivatives',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[0],
		'01',
		true
	),
	new Particle(
		'Chain Rule',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[1],
		'02',
		true
	),
	new Particle(
		'Anti-Derivatives',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[2],
		'03',
		true
	),
	new Particle(
		'Limits',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[3],
		'04',
		false
	),
	new Particle(
		'Integrals',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[4],
		'05',
		false
	),
	new Particle(
		'Min/Max',
		require('../assets/video/sampleTikTok.mov'),
		'1',
		QUESTIONS[5],
		'06',
		true
	),
];

const MODULES = [
	new Module(
		[...PARTICLES],
		'Calculus 1',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		40,
		107,
		'#8451d4',
		'calculus'
	),
	new Module(
		[...PARTICLES],
		'Calculus 2',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		97,
		135,
		'#8cc0e8',
		'calculus'
	),
	new Module(
		[...PARTICLES],
		'Calculus 3',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		67,
		112,
		'#782461',
		'calculus'
	),
	new Module(
		[...PARTICLES],
		'Linear Algebra',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		53,
		87,
		'#7dbc65',
		'algebra'
	),
	new Module(
		[...PARTICLES],
		'Differential Equations',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		23,
		94,
		'#7dbc65',
		'calculus'
	),
	new Module(
		[...PARTICLES],
		'Algebra 1',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		13,
		46,
		'#db9b3e',
		'algebra'
	),
	new Module(
		[...PARTICLES],
		'Algebra 2',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quibusdam molestias beatae fugiat aspernatur consequuntur possimus dolore, aperiam vel voluptas magni minima unde necessitatibus nesciunt alias nobis recusandae repudiandae excepturi aut. Molestiae laudantium quam dolorem quo nulla, magni commodi!',
		22,
		53,
		'#7a68aa',
		'algebra'
	),
];

export const serializedModules = JSON.parse(JSON.stringify(MODULES));
export const serializedParticles = JSON.parse(JSON.stringify(PARTICLES));
