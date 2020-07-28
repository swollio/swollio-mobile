import { CreateSingleStringForm } from '../components/Components';

export const TeamNameForm = CreateSingleStringForm({
    title: 'What is your team name?',
    subtitle: 'Enter your team name.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'name'
});

export const TeamSportForm = CreateSingleStringForm({
    title: 'What sport does your team play?',
    subtitle: 'Enter the sport (optional).',
    keyboardType: 'default',
    validator: (value) => true,
    field: 'sport'
});
