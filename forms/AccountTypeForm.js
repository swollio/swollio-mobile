import { CreateTwoOptionForm } from '../components/Components';

export const SelectRoleForm = CreateTwoOptionForm({
    title: 'What role best describes you?',
    field: 'role',
    storeValue1: 'coach',
    storeValue2: 'athlete',
    showValue1: 'Coach',
    showValue2: 'Athlete'
});