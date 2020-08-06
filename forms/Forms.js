import React from 'react';
import * as CreateUserForms from './CreateUserForms'
import * as CreateAthleteForms from './SetupAthleteForm'
import * as CreateTeamForms from './CreateTeamForms'
import * as AccountTypeForms from './AccountTypeForm'

import FormContainer from '../containers/FormContainer'

export {default as LoginForm} from './LoginForm'

export function CreateUserForm(props) {
    return (
    <FormContainer
        onCancel={() => props.onCancel()}
        onCompleted={(form) => props.onCompleted(form)} 
        forms={[
            CreateUserForms.FirstNameForm,
            CreateUserForms.LastNameForm,
            CreateUserForms.EmailForm,
            CreateUserForms.PasswordForm,
        ]}
    />
    );
}

export function CreateAthleteForm(props) {
    return (
        <FormContainer
            onCancel={() => props.onCancel()}
            onCompleted={(form) => props.onCompleted(form)} 
            forms={[
                CreateAthleteForms.AgeForm,
                CreateAthleteForms.HeightForm,
                CreateAthleteForms.WeightForm,
                CreateAthleteForms.GenderForm,
        ]}/>
    )
};

export function SelectAccountForm(props) {
    return (
        <FormContainer
            onCancel={() => props.onCancel()}
            onCompleted={(form) => props.onCompleted(form)} 
            forms={[
                CreateUserForms.AccountCreatedForm,
                AccountTypeForms.SelectRoleForm,
            ]}
        />
    )
};

export function CreateTeamForm(props) {
    return (
        <FormContainer
            onCancel={() => props.onCancel()}
            onCompleted={(form) => props.onCompleted(form)} 
            forms={[
                CreateTeamForms.TeamNameForm,
                CreateTeamForms.TeamSportForm,
            ]}
        />
    )
};